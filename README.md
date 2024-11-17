# Create Ankhorage App

Creates a Android, iOS & web app and setups AWS infrastructure using Terraform IaC

## Quickstart

The installer will ask you for AWS SDK credentials.

```sh
npx create-ankhorage-app
```

## Commands

### AWS

#### Amplify

```bash
# List all amplify apps
aws amplify list-apps

# Delete amplify app by id
aws amplify delete-app --app-id {id}
```

#### Cognito

```bash
# List user pool by name:
aws cognito-idp list-user-pools --max-results 10 --query "UserPools[?Name=='{name}'].Id" --output text
 
# Delete Cognito user pool by id
aws cognito-idp delete-user-pool --user-pool-id {id}
```

#### E2

```bash
# List all e2 instances
aws ec2 describe-instances

# Delete e2 instance by id
aws ec2 terminate-instances --instance-ids {id}
```

#### S3

```bash
# List all s3 buckets
aws s3 ls

# Delete s3 bucket by id
# @todo
```
