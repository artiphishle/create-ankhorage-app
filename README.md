# Create Ankhorage App

Creates a Android, iOS & web app and setups AWS Amplify.

Will allow to generate a app (CMS for Android, iOS & Web all-in-one)

## Prerequisites

Make sure the 'amplify' command is available globally:

```sh
npm install -g @aws-amplify/cli
```

## Quickstart

```sh

# 1 Create the app (assuming app name: myApp)
npx create-ankhorage-app

# 2 Change to app directory
cd myApp

# 3 Start local sandbox
npx ampx sandbox

# 4 Open a new terminal tab & start local 'web' app
npm run web

# Yes! App is running at: http://localhost:8081
```

## Commands

### AWS

General AWS CLI commands that might be useful if you decide to contribute to this repository:

| Resource | Action | Command |
|----------|--------|---------|
| Amplify | list | `aws amplify list-apps` |
| Amplify | delete | `aws amplify delete-app --app-id {id}` |
| Cognito | list | `aws cognito-idp list-user-pools --max-results 10 --query "UserPools[?Name=='{name}'].Id" --output text` |
| Cognito | delete | `aws cognito-idp delete-user-pool --user-pool-id {id}` |
| EC2 | list | `aws ec2 describe-instances` |
| EC2 | delete | `aws ec2 terminate-instances --instance-ids {id}` |
| S3 | list | `aws s3 ls` |
