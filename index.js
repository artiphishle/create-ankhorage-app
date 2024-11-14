#!/usr/bin/env node

const prompts = require("@inquirer/prompts");
const shell = require("shelljs");
const fs = require("fs");
const path = require("path");

async function setup() {
  // Step 1: Prompt for app name
  const appName = await prompts.input({ message: "Enter your app name:" });

  // Step 2: Define directory paths
  const appDir = path.join(process.cwd(), appName);
  const terraformDir = path.join(appDir, "terraform");

  // Step 3: Create app folder and terraform folder
  shell.mkdir("-p", terraformDir);
  console.log(`Created app directory: ${appDir}`);
  console.log(`Created Terraform directory: ${terraformDir}`);

  // Step 4: Prompt for AWS and Terraform details
  const awsAccessKey = await prompts.input({ message: "Enter your AWS Access Key:" });
  const awsSecretKey = await prompts.input({ message: "Enter your AWS Secret Key:" });
  const terraformWorkspace = await prompts.input({ message: "Enter your Terraform workspace name:" });

  // Step 5: Configure AWS credentials in the environment
  shell.env["AWS_ACCESS_KEY_ID"] = awsAccessKey;
  shell.env["AWS_SECRET_ACCESS_KEY"] = awsSecretKey;

  // Step 6: Create Terraform configuration files in the terraform directory
  const terraformConfig = `
  provider "aws" {
    region     = "us-east-1"
    access_key = "${awsAccessKey}"
    secret_key = "${awsSecretKey}"
  }

  terraform {
    required_providers {
      aws = {
        source  = "hashicorp/aws"
        version = "~> 4.0"
      }
    }
  }

  resource "aws_s3_bucket" "example" {
    bucket = "${appName}-bucket"
    acl    = "private"
  }
  `;

  fs.writeFileSync(path.join(terraformDir, "main.tf"), terraformConfig);
  console.log("Terraform configuration file created in the terraform folder.");

  // Step 7: Run Terraform commands inside the terraform directory
  shell.cd(terraformDir);
  console.log("Initializing Terraform...");
  if (shell.exec("terraform init").code !== 0) {
    console.error("Error: Terraform initialization failed.");
    process.exit(1);
  }

  console.log(`Setting Terraform workspace to ${terraformWorkspace}...`);
  if (
    shell.exec(
      `terraform workspace select ${terraformWorkspace} || terraform workspace new ${terraformWorkspace}`
    ).code !== 0
  ) {
    console.error("Error: Failed to set up Terraform workspace.");
    process.exit(1);
  }

  console.log("Applying Terraform configuration...");
  if (shell.exec("terraform apply -auto-approve").code !== 0) {
    console.error("Error: Terraform apply failed.");
    process.exit(1);
  }

  generateReactNativeApp(appDir);
}

function generateReactNativeApp(appDir) {
  console.log("Generating React Native app...");

  const defaultConfig = {
    components: [
      {
        name: "HomePage",
        text: "Welcome to Ankhorage!",
      },
    ],
  };

  // Step 8: Write default config.json in the app directory
  fs.writeFileSync(path.join(appDir, "config.json"), JSON.stringify(defaultConfig, null, 2));
  console.log("Default config.json created.");

  shell.cd(appDir);
  if (shell.exec("npx react-native init " + path.basename(appDir)).code !== 0) {
    console.error("Error: Failed to initialize React Native app.");
    process.exit(1);
  }

  console.log("React Native app created successfully.");
}

setup();
