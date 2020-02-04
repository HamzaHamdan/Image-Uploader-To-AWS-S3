# Image-Uploader-To-AWS-S3

## About

This procedure describes how to set up Amazon Web Service S3 bucket and use it in your nodejs app.

## Setup (prerequisite: login to your Amazon Web Service account)

![service-s3](images/service-s3.jpg?raw=true)

![bucket](images/bucket.jpg?raw=true)

![create-bucket-1](images/create-bucket-1.JPG?raw=true)

![create-bucket-2](images/create-bucket-2.JPG?raw=true)

![create-bucket-3](images/create-bucket-3.JPG?raw=true)

![create-bucket-4](images/create-bucket-4.JPG?raw=true)

![iam](images/iam.JPG?raw=true)

![iam-add-user-1](images/iam-add-user-1.JPG?raw=true)

![iam-add-user-2](images/iam-add-user-2.JPG?raw=true)

![iam-add-user-3](images/iam-add-user-3.JPG?raw=true)

![iam-add-user-4](images/iam-add-user-4.JPG?raw=true)

![iam-add-user-5](images/iam-add-user-5.JPG?raw=true)

![iam-add-user-6](images/iam-add-user-6.JPG?raw=true)

![add-policy-1](images/add-policy-1.jpg?raw=true)

![add-policy2](images/add-policy-2.jpg?raw=true)

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": "s3:*",
            "Resource": "*"
        }
    ]
}
```

![add-policy3](images/add-policy-3.jpg?raw=true)

![bucket-policy](images/bucket-policy.JPG?raw=true)

```
{
    "Version": "2012-10-17",
    "Id": "Policy1488494182833",
    "Statement": [
        {
            "Sid": "Stmt1488493308547",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam:::user/deals-on-wheels-bucket-user"
            },
            "Action": [
                "s3:ListBucket",
                "s3:ListBucketVersions",
                "s3:GetBucketLocation",
                "s3:Get*",
                "s3:Put*"
            ],
            "Resource": "arn:aws:s3:::deals-on-wheels-images-bucket"
        }
    ]
}
```

![cors-config](images/cors-config.JPG?raw=true)

```
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
<CORSRule>
    <AllowedOrigin>*</AllowedOrigin>
    <AllowedMethod>GET</AllowedMethod>
    <AllowedMethod>POST</AllowedMethod>
    <AllowedMethod>PUT</AllowedMethod>
    <MaxAgeSeconds>3000</MaxAgeSeconds>
    <AllowedHeader>Authorization</AllowedHeader>
</CORSRule>
</CORSConfiguration>
```

Finally, add new environment variables to your heroku app to accomodate the access_id and access_key values collected from screenshot iam-add-user-6.JPG:
```
1. AWS_ACCESS_ID
2. AWS_ACCESS_KEY
```

![heroku-app-env-var.JPG](images/heroku-app-env-var.JPG.jpg?raw=true)
