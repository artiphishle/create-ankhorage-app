#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const prompts = require('@inquirer/prompts');

// Define a function to create files and directories
async function createApp() {
  // Ask for the app name
  const appName = await prompts.input({ message: 'Enter your app name:' });

  // Define paths
  const appDir = path.join(process.cwd(), appName);
  const terraformDir = path.join(appDir, 'terraform');

  // Check if the directory already exists
  if (fs.existsSync(appDir)) {
    console.log(`Directory ${appName} already exists.`);
    return;
  }

  // Create app and terraform directories
  fs.mkdirSync(appDir);
  fs.mkdirSync(terraformDir);

  // Create a basic JSON config file
  const configJson = {
    pages: [
      {
        name: "Home",
        component: "HomePage",
        content: "Welcome to your new app!"
      }
    ]
  };
  fs.writeFileSync(path.join(appDir, 'config.json'), JSON.stringify(configJson, null, 2));

  // Write main Terraform file to set up AWS S3 and Amplify resources
  const mainTfContent = `
provider "aws" {
  region = "us-east-1"  // Adjust as needed
}

resource "aws_s3_bucket" "example" {
  bucket = "${appName}-bucket"
  acl    = "private"
}

resource "aws_amplify_app" "example" {
  name = "${appName}"
  repository = "https://github.com/your/repository.git"  // Replace with actual repo if needed
}

output "bucket_name" {
  value = aws_s3_bucket.example.bucket
}
`;

  fs.writeFileSync(path.join(terraformDir, 'main.tf'), mainTfContent);

  // Run Terraform init and apply
  try {
    console.log('Initializing Terraform...');
    execSync(`terraform -chdir=${terraformDir} init`, { stdio: 'inherit' });

    console.log('Applying Terraform...');
    execSync(`terraform -chdir=${terraformDir} apply -auto-approve`, { stdio: 'inherit' });

    console.log('App and infrastructure setup complete.');
  } catch (error) {
    console.error('Terraform apply failed:', error);
  }
}

createApp();
