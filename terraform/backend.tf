terraform {
  backend "s3" {
    bucket         = "-state" # add account id to the bucket name
    key            = "frontend/terraform.tfstate"
    region         = "eu-west-1"
    dynamodb_table = "-state" # add account id to the table name
  }
}
