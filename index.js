#!/usr/bin/env node

const prompts = require("@inquirer/prompts");
const shell = require("shelljs");
const fs = require("fs");
const path = require("path");

async function setup() {
  const awsAccessKey = await prompts.input({ message: "Enter your AWS Access Key:" });
  const awsSecretKey = await prompts.input({ message: "Enter your AWS Secret Key:" });
  // const terraformOrganization = await prompts.input({ message: "Enter your Terraform organization name:" });
  const terraformWorkspace = await prompts.input({ message: "Enter your Terraform workspace name:" });

  // Configure AWS credentials in the environment
  shell.env["AWS_ACCESS_KEY_ID"] = awsAccessKey;
  shell.env["AWS_SECRET_ACCESS_KEY"] = awsSecretKey;

  // Run Terraform commands using shelljs
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
