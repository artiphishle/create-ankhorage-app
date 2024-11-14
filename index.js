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
  const terraformDir = path.join(process.cwd(), appName, "terraform");
  fs.mkdirSync(terraformDir, { recursive: true });

  const terraformConfig = `provider "aws" {
    region = "us-east-1"
  }

  # Create Cognito User Pool for Authentication
  resource "aws_cognito_user_pool" "user_pool" {
    name = "${appName}-user-pool"
  }

  resource "aws_cognito_user_pool_client" "user_pool_client" {
    name         = "${appName}-user-pool-client"
    user_pool_id = aws_cognito_user_pool.user_pool.id
    generate_secret = false
  }

  # Create IAM Role for Amplify
  resource "aws_iam_role" "amplify_service_role" {
    name = "${appName}-amplify-service-role"

    assume_role_policy = jsonencode({
      Version = "2012-10-17"
      Statement = [
        {
          Action    = "sts:AssumeRole"
          Effect    = "Allow"
          Principal = {
            Service = "amplify.amazonaws.com"
          }
        }
      ]
    })
  }

  # Create Amplify App for React Native Deployment
  resource "aws_amplify_app" "amplify_app" {
    name        = "${appName}-app"
    platform    = "WEB"

    repository  = "https://github.com/artiphishle/ankh-native-app"

    build_spec = <<BUILD_SPEC
version: 1
frontend:
  phases:
    build:
      commands:
        - npm install
        - npm run build:web
  artifacts:
    baseDirectory: web-build
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
BUILD_SPEC
  }

  # Outputs
  output "user_pool_id" {
    value = aws_cognito_user_pool.user_pool.id
  }

  output "amplify_app_url" {
    value = aws_amplify_app.amplify_app.default_domain
  }
  `;

  fs.writeFileSync(path.join(terraformDir, "main.tf"), terraformConfig);

  // Step 3: Run Terraform to deploy infrastructure
  console.log("Running Terraform to deploy infrastructure...");
  execSync("terraform init", { cwd: terraformDir });
  execSync("terraform apply -auto-approve", { cwd: terraformDir });

  console.log("Infrastructure deployed.");
};

createApp();
