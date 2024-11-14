import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import prompts from '@inquirer/prompts';

// Define a function to create files and directories
async function createApp() {
  // Ask for the app name
  const appName = await prompts.input({ message: 'Enter your app name:' });

  // Create a directory with the app name
  const appDir = path.join(process.cwd(), appName);
  const terraformDir = path.join(appDir, 'terraform');

  // Check if the directory already exists
  if (fs.existsSync(appDir)) {
    console.log(`Directory ${appName} already exists.`);
    return;
  }

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

  // Terraform configuration for S3 bucket
  const terraformConfig = `
provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "example" {
  bucket = "${appName}-bucket"
  acl    = "private"
}

output "bucket_name" {
  value = aws_s3_bucket.example.bucket
}
`;

  fs.writeFileSync(path.join(terraformDir, 'main.tf'), terraformConfig);

  // Run Terraform init and apply
  try {
    execSync('terraform init', { cwd: terraformDir, stdio: 'inherit' });
    execSync('terraform apply -auto-approve', { cwd: terraformDir, stdio: 'inherit' });
    console.log('Terraform resources created successfully.');
  } catch (error) {
    console.error('Terraform apply failed:', error);
  }
}

// Run the setup process
createApp();
