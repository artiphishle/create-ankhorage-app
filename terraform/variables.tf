
variable "oauth_token" {
  description = "Github Auth Token to read repo: artiphishle/ankh-native-app"
  type        = string
  default     = ""
}

variable "AMPLIFY_ACCESS_KEY_ID" {
  description = "AWS Amplify Access key id"
  type        = string
  default     = ""
}

variable "AMPLIFY_SECRET_ACCESS_KEY" {
  description = "AWS Amplify Secret Acces key"
  type        = string
  default     = ""
}
