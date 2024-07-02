# data "aws_vpc" "main" {
#   tags = {
#     Name = "main-vpc"
#   }
# }
# resource "aws_s3_bucket" "beanstalk_bucket" {
#   bucket        = "${local.account-id}-deploy-bucket"
#   force_destroy = true
# }


# data "aws_subnet" "public_subnet_eu_west_1a" {
#   vpc_id = data.aws_vpc.main.id
#   filter {
#     name   = "tag:Name"
#     values = ["main-vpc-public-eu-west-1a"]
#   }
# }
# data "aws_subnet" "public_subnet_eu_west_1b" {
#   vpc_id = data.aws_vpc.main.id
#   filter {
#     name   = "tag:Name"
#     values = ["main-vpc-public-eu-west-1b"]
#   }
# }

# resource "aws_iam_role" "beanstalk_ec2" {
#   assume_role_policy    = "{\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"ec2.amazonaws.com\"}}],\"Version\":\"2012-10-17\"}"
#   description           = "Allows EC2 instances to call AWS services on your behalf."
#   force_detach_policies = false
#   managed_policy_arns   = ["arn:aws:iam::aws:policy/AWSElasticBeanstalkMulticontainerDocker", "arn:aws:iam::aws:policy/AWSElasticBeanstalkWebTier", "arn:aws:iam::aws:policy/AWSElasticBeanstalkWorkerTier"]
#   max_session_duration  = 3600
#   name                  = "aws-elasticbeanstalk-ec2"
#   path                  = "/"
# }

# resource "aws_iam_instance_profile" "beanstalk_ec2" {
#   name = "aws-elasticbeanstalk-ec2-profile"
#   role = aws_iam_role.beanstalk_ec2.name
# }

# resource "aws_elastic_beanstalk_application" "nodejs_app" {
#   name        = "nodejs-app"
#   description = "App for NodeJS API"
# }

# data "aws_acm_certificate" "issued" {
#   domain   = "electronics.projects.bbdgrad.com"
#   statuses = ["ISSUED"]
# }

# resource "aws_elastic_beanstalk_environment" "nodejs_env" {
#   name                = "nodejs-env"
#   application         = aws_elastic_beanstalk_application.nodejs_app.name
#   solution_stack_name = "64bit Amazon Linux 2023 v6.1.5 running Node.js 20"
#   tier                = "WebServer"
#   setting {
#     namespace = "aws:ec2:vpc"
#     name      = "VPCId"
#     value     = data.aws_vpc.main.id
#   }
#   setting {
#     namespace = "aws:autoscaling:launchconfiguration"
#     name      = "IamInstanceProfile"
#     value     = aws_iam_instance_profile.beanstalk_ec2.name
#   }
#   setting {
#     namespace = "aws:ec2:vpc"
#     name      = "Subnets"
#     value     = "${data.aws_subnet.public_subnet_eu_west_1a.id},${data.aws_subnet.public_subnet_eu_west_1b.id}"
#   }
#   setting {
#     namespace = "aws:ec2:instances"
#     name      = "InstanceTypes"
#     value     = "t3.micro"
#   }
#   setting {
#     namespace = "aws:elasticbeanstalk:healthreporting:system"
#     name      = "SystemType"
#     value     = "basic"
#   }
#   setting {
#     namespace = "aws:elasticbeanstalk:application"
#     name      = "Application Healthcheck URL"
#     value     = "/"
#   }
#   setting {
#     namespace = "aws:elasticbeanstalk:command"
#     name      = "Timeout"
#     value     = "60"
#   }
#   setting {
#     namespace = "aws:elasticbeanstalk:command"
#     name      = "IgnoreHealthCheck"
#     value     = "true"
#   }
#   setting {
#     namespace = "aws:ec2:vpc"
#     name      = "AssociatePublicIpAddress"
#     value     = "true"
#     resource  = ""
#   }
#   setting {
#     namespace = "aws:elb:healthcheck"
#     name      = "Interval"
#     value     = 60
#     resource  = ""
#   }
#   setting {
#     namespace = "aws:elb:healthcheck"
#     name      = "Timeout"
#     value     = 20
#     resource  = ""
#   }
#   setting {
#     namespace = "aws:autoscaling:asg"
#     name      = "MinSize"
#     value     = 1
#     resource  = ""
#   }
#   setting {
#     namespace = "aws:autoscaling:asg"
#     name      = "MaxSize"
#     value     = 1
#     resource  = ""
#   }
#   setting {
#     namespace = "aws:elasticbeanstalk:environment"
#     name      = "EnvironmentType"
#     value     = "LoadBalanced"
#     resource  = ""
#   }
#   setting {
#     namespace = "aws:elasticbeanstalk:environment"
#     name      = "LoadBalancerType"
#     value     = "application"
#     resource  = ""
#   }
#   setting {
#     namespace = "aws:elbv2:listener:443"
#     name      = "ListenerEnabled"
#     value     = "true"
#     resource  = ""
#   }
#   setting {
#     namespace = "aws:elbv2:listener:443"
#     name      = "Protocol"
#     value     = "HTTPS"
#     resource  = ""
#   }
#   setting {
#     namespace = "aws:elbv2:listener:443"
#     name      = "SSLCertificateArns"
#     value     = data.aws_acm_certificate.issued.arn
#     resource  = ""
#   }
#   setting {
#     namespace = "aws:elasticbeanstalk:managedactions"
#     name      = "ManagedActionsEnabled"
#     value     = "false"
#   }
# }
