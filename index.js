#!/usr/bin/env node

const inquirer = require("inquirer");
const shell = require("shelljs");
const fs = require("fs");
const path = require("path");

async function setup() {
  const responses = await inquirer.prompt([
    {
      type: "input",
      name: "aws_access_key",
      message: "Enter your AWS Access Key:",
    },
    {
      type: "input",
      name: "aws_secret_key",
      message: "Enter your AWS Secret Key:",
    },
    {
      type: "input",
      name: "terraform_organization",
      message: "Enter your Terraform organization name:",
    },
    {
      type: "input",
      name: "terraform_workspace",
      message: "Enter your Terraform workspace name:",
    },
  ]);

  // Configure AWS credentials in the environment
  shell.env["AWS_ACCESS_KEY_ID"] = responses.aws_access_key;
  shell.env["AWS_SECRET_ACCESS_KEY"] = responses.aws_secret_key;

  // Run Terraform commands using shelljs
  console.log("Initializing Terraform...");
  if (shell.exec("terraform init").code !== 0) {
    console.error("Error: Terraform initialization failed.");
    process.exit(1);
  }

  console.log(`Setting Terraform workspace to ${responses.terraform_workspace}...`);
  if (
    shell.exec(
      `terraform workspace select ${responses.terraform_workspace} || terraform workspace new ${responses.terraform_workspace}`
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

  generateReactNativeApp();
}

function generateReactNativeApp() {
  console.log("Generating React Native app...");

  const defaultConfig = {
    components: [
      {
        name: "HomePage",
        text: "Welcome to Ankhorage!",
      },
    ],
  };

  const appDir = path.join(process.cwd(), "AnkhorageApp");
  shell.mkdir("-p", appDir);

  fs.writeFileSync(path.join(appDir, "config.json"), JSON.stringify(defaultConfig, null, 2));
  console.log("Default config.json created.");

  shell.cd(appDir);
  if (shell.exec("npx react-native init AnkhorageApp").code !== 0) {
    console.error("Error: Failed to initialize React Native app.");
    process.exit(1);
  }

  console.log("React Native app created successfully.");
}

setup();
