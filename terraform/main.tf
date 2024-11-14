provider "aws" {
  region = "us-east-1"
}

terraform {
  cloud {
    organization = "Ankhorage"

    workspaces {
      name = "create-ankhorage-app"
    }

  }
}
