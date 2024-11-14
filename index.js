#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const prompts = require("@inquirer/prompts");

const createApp = async () => {
  // Step 1: Ask for the app name
  const appName = await prompts.input({
    type: "text",
    name: "appName",
    message: "Enter the name of the app:",
    initial: "ankhorage-app"
  });

  // Step 2: Initialize Terraform files for Amplify and Cognito using the app name as a prefix
  const tfTplPath = path.join(__dirname, "terraform");
  const terraformDir = path.join(process.cwd(), appName, "terraform");
  fs.mkdirSync(terraformDir, { recursive: true });

  ["main.tf", "variables.tf"].forEach((tfFile) =>
    fs.copyFileSync(path.join(tfTplPath, tfFile), path.join(terraformDir, tfFile)));

  fs.writeFileSync(path.join(terraformDir, "terraform.tfvars"), `oauth_token=${process.env.GH_OAUTH_TOKEN}`)

  // Step 3: Run Terraform to deploy infrastructure
  console.log("Running Terraform to deploy infrastructure...");
  execSync("terraform init", { cwd: terraformDir });
  execSync("terraform apply -auto-approve", { cwd: terraformDir });

  console.log("Infrastructure deployed.");
};

createApp();
