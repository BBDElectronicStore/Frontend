terraform {
  backend "s3" {
    bucket         = "268644478934-state"
    key            = "frontend/terraform.tfstate"
    region         = "eu-west-1"
    dynamodb_table = "268644478934-state"
  }
}
