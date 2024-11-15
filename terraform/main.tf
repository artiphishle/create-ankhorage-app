provider "aws" {
  region     = "us-east-1"
  access_key = var.AMPLIFY_ACCESS_KEY_ID
  secret_key = var.AMPLIFY_SECRET_ACCESS_KEY
}

terraform {
  cloud {
    organization = "Ankhorage"

    workspaces {
      name = "ankhtest"
    }
  }
}

# Create Cognito User Pool for Authentication
resource "aws_cognito_user_pool" "user_pool" {
  name = "ankh-user-pool"
}

resource "aws_cognito_user_pool_client" "user_pool_client" {
  name            = "ankh-user-pool-client"
  user_pool_id    = aws_cognito_user_pool.user_pool.id
  generate_secret = false
}

# Create IAM Role for Amplify
resource "aws_iam_role" "amplify_service_role" {
  name = "ankh-amplify-service-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "amplify.amazonaws.com"
        }
      }
    ]
  })
}

# Create Amplify App for React Native Deployment
resource "aws_amplify_app" "amplify_app" {
  name     = "ankh-app"
  platform = "WEB"

  repository  = "https://github.com/artiphishle/ankh-native-app"
  oauth_token = var.oauth_token

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
