# Create Ankhorage App

Creates a Android, iOS & web app and setups AWS Amplify.

Will allow to generate a app (CMS for Android, iOS & Web all-in-one)

## Quickstart

```sh
# Make sure the 'amplify' command is available globally
npm install -g @aws-amplify/cli

# Sit back & enjoy!
npx create-ankhorage-app
```

## Next

This project is under active development:

- Auto-Mock dev environment: `amplify mock`
- Custom domain support

## Commands

### Ankhorage

Delete all resources from generated app:

```sh
# ⚠️ This will also delete user pool and users

cd {appDir} && amplify delete
```

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
