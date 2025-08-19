// Game Configuration and Data

// AWS CLI commands for autocomplete with descriptions and shortcuts
const awsCommands = [
    // Common AWS Utility Commands
    { cmd: 'aws --version', desc: 'Show AWS CLI version', shortcut: 'Tab' },
    { cmd: 'aws --help', desc: 'Show AWS CLI help', shortcut: 'Tab' },
    { cmd: 'aws configure list', desc: 'Show current configuration', shortcut: 'Tab' },
    { cmd: 'aws configure get region', desc: 'Get current region', shortcut: 'Tab' },
    { cmd: 'aws sts get-caller-identity', desc: 'Get current user identity', shortcut: 'Tab' },
    { cmd: 'aws sts get-session-token', desc: 'Get temporary credentials', shortcut: 'Tab' },
    
    // S3 Commands
    { cmd: 'aws s3 ls', desc: 'List S3 buckets', shortcut: 'Tab' },
    { cmd: 'aws s3 ls s3://', desc: 'List bucket contents', shortcut: 'Tab' },
    { cmd: 'aws s3 cp s3:// .', desc: 'Copy from S3', shortcut: 'Tab' },
    { cmd: 'aws s3 cp s3://clue-bucket-1/clue.txt .', desc: 'Download clue file', shortcut: 'Tab' },
    { cmd: 'aws s3api list-buckets', desc: 'List buckets (API)', shortcut: 'Tab' },
    { cmd: 'aws s3api list-buckets --query "Buckets[?contains(Name, `clue`)]"', desc: 'Query buckets', shortcut: 'Tab' },
    { cmd: 'aws s3api get-bucket-versioning --bucket ', desc: 'Get bucket versioning', shortcut: 'Tab' },
    { cmd: 'aws s3api get-bucket-encryption --bucket ', desc: 'Get bucket encryption', shortcut: 'Tab' },
    
    // SSM Commands
    { cmd: 'aws ssm get-parameter --name ', desc: 'Get SSM parameter', shortcut: 'Tab' },
    { cmd: 'aws ssm get-parameter --name /scavenger-hunt/clue-2', desc: 'Get hunt parameter', shortcut: 'Tab' },
    { cmd: 'aws ssm describe-parameters', desc: 'List parameters', shortcut: 'Tab' },
    { cmd: 'aws ssm get-parameters-by-path --path /', desc: 'Get parameters by path', shortcut: 'Tab' },
    { cmd: 'aws ssm get-parameter --name --with-decryption', desc: 'Get encrypted parameter', shortcut: 'Tab' },
    
    // IAM Commands
    { cmd: 'aws iam list-attached-user-policies --user-name ', desc: 'List user policies', shortcut: 'Tab' },
    { cmd: 'aws iam list-attached-user-policies --user-name the-hidden-user', desc: 'List hidden user policies', shortcut: 'Tab' },
    { cmd: 'aws iam get-policy-version --policy-arn ', desc: 'Get policy version', shortcut: 'Tab' },
    { cmd: 'aws iam get-policy-version --policy-arn arn:aws:iam::123456789012:policy/ScavengerHuntPolicy --version-id v1', desc: 'Get hunt policy', shortcut: 'Tab' },
    { cmd: 'aws iam list-users', desc: 'List IAM users', shortcut: 'Tab' },
    { cmd: 'aws iam list-roles', desc: 'List IAM roles', shortcut: 'Tab' },
    { cmd: 'aws iam get-role --role-name ', desc: 'Get IAM role', shortcut: 'Tab' },
    { cmd: 'aws iam list-attached-role-policies --role-name ', desc: 'List role policies', shortcut: 'Tab' },
    { cmd: 'aws iam get-user', desc: 'Get current user info', shortcut: 'Tab' },
    { cmd: 'aws iam get-account-summary', desc: 'Get account summary', shortcut: 'Tab' },
    
    // Lambda Commands
    { cmd: 'aws lambda list-functions', desc: 'List Lambda functions', shortcut: 'Tab' },
    { cmd: 'aws lambda get-function --function-name ', desc: 'Get Lambda function', shortcut: 'Tab' },
    { cmd: 'aws lambda get-function-configuration --function-name ', desc: 'Get function config', shortcut: 'Tab' },
    { cmd: 'aws lambda invoke --function-name --payload ', desc: 'Invoke Lambda function', shortcut: 'Tab' },
    
    // CloudWatch Commands
    { cmd: 'aws logs describe-log-groups', desc: 'List log groups', shortcut: 'Tab' },
    { cmd: 'aws logs describe-log-streams --log-group-name ', desc: 'List log streams', shortcut: 'Tab' },
    { cmd: 'aws logs get-log-events --log-group-name --log-stream-name ', desc: 'Get log events', shortcut: 'Tab' },
    { cmd: 'aws cloudwatch list-metrics', desc: 'List CloudWatch metrics', shortcut: 'Tab' },
    
    // DynamoDB Commands
    { cmd: 'aws dynamodb list-tables', desc: 'List DynamoDB tables', shortcut: 'Tab' },
    { cmd: 'aws dynamodb describe-table --table-name ', desc: 'Describe DynamoDB table', shortcut: 'Tab' },
    { cmd: 'aws dynamodb scan --table-name ', desc: 'Scan DynamoDB table', shortcut: 'Tab' },
    { cmd: 'aws dynamodb get-item --table-name --key ', desc: 'Get DynamoDB item', shortcut: 'Tab' },
    
    // EC2 Commands
    { cmd: 'aws ec2 describe-instances', desc: 'List EC2 instances', shortcut: 'Tab' },
    { cmd: 'aws ec2 describe-security-groups', desc: 'List security groups', shortcut: 'Tab' },
    { cmd: 'aws ec2 describe-vpcs', desc: 'List VPCs', shortcut: 'Tab' },
    { cmd: 'aws ec2 describe-subnets', desc: 'List subnets', shortcut: 'Tab' },
    { cmd: 'aws ec2 describe-regions', desc: 'List AWS regions', shortcut: 'Tab' },
    { cmd: 'aws ec2 describe-availability-zones', desc: 'List availability zones', shortcut: 'Tab' },
    
    // CloudFormation Commands
    { cmd: 'aws cloudformation list-stacks', desc: 'List CloudFormation stacks', shortcut: 'Tab' },
    { cmd: 'aws cloudformation describe-stacks --stack-name ', desc: 'Describe stack', shortcut: 'Tab' },
    { cmd: 'aws cloudformation list-stack-resources --stack-name ', desc: 'List stack resources', shortcut: 'Tab' },
    
    // Secrets Manager Commands
    { cmd: 'aws secretsmanager list-secrets', desc: 'List secrets', shortcut: 'Tab' },
    { cmd: 'aws secretsmanager get-secret-value --secret-id ', desc: 'Get secret value', shortcut: 'Tab' },
    
    // KMS Commands
    { cmd: 'aws kms list-keys', desc: 'List KMS keys', shortcut: 'Tab' },
    { cmd: 'aws kms describe-key --key-id ', desc: 'Describe KMS key', shortcut: 'Tab' },
    
    // System Commands
    { cmd: 'cat clue.txt', desc: 'Display file contents', shortcut: 'Tab' },
    { cmd: 'ls', desc: 'List directory contents', shortcut: 'Tab' },
    { cmd: 'pwd', desc: 'Print working directory', shortcut: 'Tab' },
    { cmd: 'history', desc: 'Show command history', shortcut: 'Tab' },
    { cmd: 'help', desc: 'Show help', shortcut: 'Tab' },
    { cmd: 'clear', desc: 'Clear screen', shortcut: 'Ctrl+L' }
];

// Command aliases for more realistic CLI experience
const commandAliases = {
    'll': 'ls -la',
    'la': 'ls -la', 
    'cls': 'clear',
    'exit': 'quit',
    'q': 'quit',
    'h': 'help',
    '?': 'help'
};

// Game stages for different difficulty levels
const gameStages = {
    beginner: [
        {
            expectedCommand: 'aws s3 ls',
            output: `2023-08-19 12:34:56 my-app-bucket
2023-08-19 12:35:12 clue-bucket-1
2023-08-19 12:35:28 backup-storage-bucket`,
            nextClue: `<span class="clue">Clue 2: The S3 File</span>
I see you found the clue-bucket-1! Now look inside it.
What secrets does this bucket contain?`,
            hint: "Try using 'aws s3 ls' to list all S3 buckets in your account."
        },
        {
            expectedCommand: 'aws s3 ls s3://clue-bucket-1',
            output: `2023-08-19 12:36:45        156 clue.txt`,
            nextClue: `<span class="clue">Clue 3: The Hidden Message</span>
A single file awaits! Download it to reveal the next step.
(Hint: You can use 'aws s3 cp' or 'cat' to read the contents)`,
            hint: "Use 'aws s3 ls s3://clue-bucket-1' to see what's inside the bucket."
        },
        {
            expectedCommand: ['aws s3 cp s3://clue-bucket-1/clue.txt .', 'cat clue.txt', 'aws s3 cp s3://clue-bucket-1/clue.txt'],
            output: `Found it! Your next clue is hidden in the SSM Parameter Store.
The parameter name is: /scavenger-hunt/clue-2

Look for the secret that holds the identity of a hidden user...`,
            nextClue: `<span class="clue">Clue 4: The SSM Secret</span>
The Systems Manager Parameter Store holds many secrets.
Retrieve the parameter to discover the next piece of the puzzle!`,
            hint: "Download the file with 'aws s3 cp s3://clue-bucket-1/clue.txt .' or read it with 'cat clue.txt'."
        },
        {
            expectedCommand: 'aws ssm get-parameter --name /scavenger-hunt/clue-2',
            output: `{
    "Parameter": {
        "Name": "/scavenger-hunt/clue-2",
        "Type": "String",
        "Value": "arn:aws:iam::123456789012:user/the-hidden-user",
        "Version": 1,
        "LastModifiedDate": "2023-08-19T12:40:00.000000+00:00",
        "ARN": "arn:aws:ssm:us-east-1:123456789012:parameter/scavenger-hunt/clue-2"
    }
}`,
            nextClue: `<span class="clue">Clue 5: The IAM Identity</span>
You've discovered the ARN of a hidden user: 'the-hidden-user'
What policies are attached to this mysterious identity?`,
            hint: "Use 'aws ssm get-parameter --name /scavenger-hunt/clue-2' to retrieve the parameter value."
        },
        {
            expectedCommand: 'aws iam list-attached-user-policies --user-name the-hidden-user',
            output: `{
    "AttachedPolicies": [
        {
            "PolicyName": "ScavengerHuntPolicy",
            "PolicyArn": "arn:aws:iam::123456789012:policy/ScavengerHuntPolicy"
        }
    ]
}`,
            nextClue: `<span class="clue">Final Clue: The Policy Document</span>
One last step! Examine the policy document to complete your quest.
Get the policy version to reveal the final secret!`,
            hint: "List attached policies with 'aws iam list-attached-user-policies --user-name the-hidden-user'."
        },
        {
            expectedCommand: 'aws iam get-policy-version --policy-arn arn:aws:iam::123456789012:policy/ScavengerHuntPolicy --version-id v1',
            output: `{
    "PolicyVersion": {
        "Document": {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Action": "s3:GetObject",
                    "Resource": "arn:aws:s3:::treasure-bucket/*",
                    "Condition": {
                        "StringEquals": {
                            "s3:ExistingObjectTag/SecretCode": "CONGRATULATIONS_HUNTER_2023"
                        }
                    }
                }
            ]
        },
        "VersionId": "v1",
        "IsDefaultVersion": true,
        "CreateDate": "2023-08-19T12:45:00.000000+00:00"
    }
}`,
            nextClue: null,
            isComplete: true,
            hint: "Get the policy version with 'aws iam get-policy-version --policy-arn arn:aws:iam::123456789012:policy/ScavengerHuntPolicy --version-id v1'."
        }
    ],

    intermediate: [
        {
            expectedCommand: ['aws s3 ls --recursive', 'aws s3 ls'],
            output: `2023-08-19 12:34:56 my-app-bucket
2023-08-19 12:35:12 clue-bucket-1
2023-08-19 12:35:28 backup-storage-bucket
2023-08-19 12:35:45 logs-bucket-encrypted
2023-08-19 12:36:02 data-analytics-bucket`,
            nextClue: `<span class="clue">Clue 2: The Encrypted Logs</span>
Multiple buckets exist, but encrypted logs hold the key. Find the logs bucket and examine its structure.`,
            hint: "Look for a bucket that might contain logs. Try listing all buckets first."
        },
        {
            expectedCommand: ['aws s3 ls s3://logs-bucket-encrypted', 'aws s3 ls s3://logs-bucket-encrypted/'],
            output: `                           PRE application-logs/
                           PRE cloudtrail-logs/
                           PRE access-logs/
2023-08-19 12:37:15        892 metadata.json`,
            nextClue: `<span class="clue">Clue 3: The CloudTrail Mystery</span>
CloudTrail logs often contain valuable information. Explore the cloudtrail-logs directory.`,
            hint: "Explore the logs-bucket-encrypted bucket. Look for different log types."
        },
        {
            expectedCommand: 'aws s3 ls s3://logs-bucket-encrypted/cloudtrail-logs/',
            output: `2023-08-19 12:38:22       1024 trail-events-2023-08-19.json
2023-08-19 12:38:45        756 user-activity.json
2023-08-19 12:39:12        445 secret-parameter.txt`,
            nextClue: `<span class="clue">Clue 4: The Secret Parameter</span>
A secret parameter file in CloudTrail logs? That's unusual. Download it to investigate.`,
            hint: "Look inside the cloudtrail-logs directory for interesting files."
        },
        {
            expectedCommand: ['aws s3 cp s3://logs-bucket-encrypted/cloudtrail-logs/secret-parameter.txt .', 'cat secret-parameter.txt'],
            output: `SSM Parameter Discovery:
The next clue is stored in: /advanced-hunt/encrypted-clue

This parameter is encrypted and requires proper IAM permissions.
The user 'security-auditor' has the necessary access.

Additional hint: Check the Lambda function 'log-processor' for more clues.`,
            nextClue: `<span class="clue">Clue 5: The Lambda Connection</span>
Before getting the encrypted parameter, investigate the log-processor Lambda function.`,
            hint: "Download the secret-parameter.txt file to see what it contains."
        },
        {
            expectedCommand: 'aws lambda get-function --function-name log-processor',
            output: `{
    "Configuration": {
        "FunctionName": "log-processor",
        "FunctionArn": "arn:aws:lambda:us-east-1:123456789012:function:log-processor",
        "Runtime": "python3.9",
        "Role": "arn:aws:iam::123456789012:role/lambda-log-role",
        "Environment": {
            "Variables": {
                "SSM_PARAMETER_PATH": "/advanced-hunt/encrypted-clue",
                "LOG_LEVEL": "INFO",
                "ENCRYPTION_KEY_ID": "alias/scavenger-hunt-key"
            }
        },
        "LastModified": "2023-08-19T12:42:00.000Z"
    }
}`,
            nextClue: `<span class="clue">Clue 6: The Encrypted Parameter</span>
Now retrieve the encrypted SSM parameter. Use the --with-decryption flag to decrypt it.`,
            hint: "Use 'aws lambda get-function --function-name log-processor' to see the function details."
        },
        {
            expectedCommand: 'aws ssm get-parameter --name /advanced-hunt/encrypted-clue --with-decryption',
            output: `{
    "Parameter": {
        "Name": "/advanced-hunt/encrypted-clue",
        "Type": "SecureString",
        "Value": "The final clue is in DynamoDB table 'hunt-secrets' with key 'final-challenge'",
        "Version": 2,
        "LastModifiedDate": "2023-08-19T12:42:00.000000+00:00",
        "ARN": "arn:aws:ssm:us-east-1:123456789012:parameter/advanced-hunt/encrypted-clue"
    }
}`,
            nextClue: `<span class="clue">Clue 7: The DynamoDB Challenge</span>
The final piece is stored in a DynamoDB table. Retrieve the item with key 'final-challenge'.`,
            hint: "Use 'aws ssm get-parameter --name /advanced-hunt/encrypted-clue --with-decryption' to decrypt the parameter."
        },
        {
            expectedCommand: 'aws dynamodb get-item --table-name hunt-secrets --key \'{"id":{"S":"final-challenge"}}\'',
            output: `{
    "Item": {
        "id": {
            "S": "final-challenge"
        },
        "secret_code": {
            "S": "INTERMEDIATE_MASTER_2023"
        },
        "message": {
            "S": "Congratulations! You've mastered intermediate AWS CLI navigation across multiple services."
        },
        "services_used": {
            "L": [
                {"S": "S3"},
                {"S": "Lambda"},
                {"S": "SSM"},
                {"S": "DynamoDB"}
            ]
        }
    }
}`,
            nextClue: null,
            isComplete: true,
            hint: "Use 'aws dynamodb get-item --table-name hunt-secrets --key' with the proper JSON key format."
        }
    ],

    advanced: [
        {
            expectedCommand: ['aws s3api list-buckets --query "Buckets[?contains(Name, `clue`)]"', 'aws s3 ls'],
            output: `[
    {
        "Name": "clue-bucket-1",
        "CreationDate": "2023-08-19T12:35:12.000Z"
    }
]`,
            nextClue: `<span class="clue">Advanced Challenge: Infrastructure Investigation</span>
Use advanced queries to find a CloudFormation stack that created this bucket.`,
            hint: "Use AWS CLI queries with --query parameter to filter results efficiently."
        },
        {
            expectedCommand: 'aws cloudformation list-stacks --query "StackSummaries[?contains(StackName, `infrastructure`)]"',
            output: `[
    {
        "StackName": "infrastructure-hunt-stack",
        "StackStatus": "CREATE_COMPLETE",
        "CreationTime": "2023-08-19T12:30:00.000Z",
        "TemplateDescription": "Scavenger hunt infrastructure stack"
    }
]`,
            nextClue: `<span class="clue">Stack Analysis: Resource Discovery</span>
Examine the stack resources to find a Secrets Manager secret.`,
            hint: "List CloudFormation stacks and look for infrastructure-related stacks."
        },
        {
            expectedCommand: 'aws cloudformation list-stack-resources --stack-name infrastructure-hunt-stack --query "StackResourceSummaries[?ResourceType==`AWS::SecretsManager::Secret`]"',
            output: `[
    {
        "LogicalResourceId": "HuntSecret",
        "PhysicalResourceId": "arn:aws:secretsmanager:us-east-1:123456789012:secret:hunt/master-key-AbCdEf",
        "ResourceType": "AWS::SecretsManager::Secret",
        "ResourceStatus": "CREATE_COMPLETE"
    }
]`,
            nextClue: `<span class="clue">Secrets Investigation: Multi-Version Challenge</span>
Retrieve the secret value. It contains coordinates to a specific log stream.`,
            hint: "Use CloudFormation queries to filter resources by type."
        },
        {
            expectedCommand: 'aws secretsmanager get-secret-value --secret-id hunt/master-key',
            output: `{
    "SecretString": "{\\"log_group\\": \\"/aws/lambda/data-processor\\", \\"log_stream\\": \\"2023/08/19/[$LATEST]abc123def456\\", \\"filter_pattern\\": \\"ERROR\\"}",
    "VersionId": "AWSCURRENT",
    "VersionStages": ["AWSCURRENT"],
    "CreatedDate": "2023-08-19T12:45:00.000Z"
}`,
            nextClue: `<span class="clue">Log Analysis: Error Investigation</span>
Parse the secret and use CloudWatch Logs to find ERROR events in the specified log stream.`,
            hint: "Get the secret value from Secrets Manager to find log coordinates."
        },
        {
            expectedCommand: 'aws logs get-log-events --log-group-name "/aws/lambda/data-processor" --log-stream-name "2023/08/19/[$LATEST]abc123def456" --filter-pattern "ERROR"',
            output: `{
    "events": [
        {
            "timestamp": 1692454800000,
            "message": "ERROR: Failed to process item. DynamoDB table: advanced-hunt-table, Key: master-clue",
            "ingestionTime": 1692454801000
        },
        {
            "timestamp": 1692454850000,
            "message": "ERROR: Encryption key not found. KMS Key ID: alias/hunt-master-key",
            "ingestionTime": 1692454851000
        }
    ],
    "nextForwardToken": "f/34567890123456789012345678901234567890123456789012345",
    "nextBackwardToken": "b/34567890123456789012345678901234567890123456789012345"
}`,
            nextClue: `<span class="clue">Multi-Service Integration: The Final Puzzle</span>
The logs reveal a DynamoDB table and KMS key. First, check if the KMS key exists and is accessible.`,
            hint: "Filter CloudWatch logs for ERROR patterns to find clues about other AWS resources."
        },
        {
            expectedCommand: 'aws kms describe-key --key-id alias/hunt-master-key',
            output: `{
    "KeyMetadata": {
        "KeyId": "12345678-1234-1234-1234-123456789012",
        "Arn": "arn:aws:kms:us-east-1:123456789012:key/12345678-1234-1234-1234-123456789012",
        "Description": "Master key for scavenger hunt encryption",
        "KeyUsage": "ENCRYPT_DECRYPT",
        "KeyState": "Enabled",
        "Alias": "alias/hunt-master-key"
    }
}`,
            nextClue: `<span class="clue">DynamoDB Deep Dive: Encrypted Data Retrieval</span>
Now retrieve the encrypted item from DynamoDB. The data might be encrypted with the KMS key.`,
            hint: "Verify the KMS key exists and is accessible before proceeding to DynamoDB."
        },
        {
            expectedCommand: 'aws dynamodb get-item --table-name advanced-hunt-table --key \'{"id":{"S":"master-clue"}}\'',
            output: `{
    "Item": {
        "id": {
            "S": "master-clue"
        },
        "encrypted_payload": {
            "S": "AQICAHhZ8+5K7fJ2mN9pL3qR4sT6uV8wX0yZ1aB2cD3eF4gH5iJkLmNoPqRsTuVwXyZ0123456789abcdef"
        },
        "encryption_context": {
            "M": {
                "purpose": {"S": "scavenger-hunt"},
                "level": {"S": "advanced"}
            }
        },
        "hint": {
            "S": "The final secret code is: CONGRATULATIONS_ADVANCED_MASTER_2023"
        }
    }
}`,
            nextClue: null,
            isComplete: true,
            hint: "Retrieve the DynamoDB item to get the final secret code."
        }
    ],

    expert: [
        {
            expectedCommand: 'aws ec2 describe-instances --query "Reservations[].Instances[?State.Name==`running`].Tags[?Key==`Environment`].Value" --output text',
            output: `production
staging
development`,
            nextClue: `<span class="clue">Expert Challenge: Multi-Environment Investigation</span>
You've found running instances across environments. Find the production VPC and its associated resources.`,
            hint: "Use complex EC2 queries to filter running instances by environment tags."
        },
        {
            expectedCommand: 'aws ec2 describe-vpcs --query "Vpcs[?Tags[?Key==`Environment` && Value==`production`]]"',
            output: `[
    {
        "VpcId": "vpc-12345678",
        "State": "available",
        "CidrBlock": "10.0.0.0/16",
        "Tags": [
            {"Key": "Environment", "Value": "production"},
            {"Key": "Name", "Value": "prod-vpc"},
            {"Key": "SecretLocation", "Value": "arn:aws:secretsmanager:us-east-1:123456789012:secret:prod/database-config"}
        ]
    }
]`,
            nextClue: `<span class="clue">Network Security Analysis</span>
The VPC tags reveal a secret location. But first, analyze the security groups in this VPC for suspicious configurations.`,
            hint: "Query VPCs by environment tags to find production infrastructure."
        },
        {
            expectedCommand: 'aws secretsmanager get-secret-value --secret-id prod/database-config',
            output: `{
    "SecretString": "{\\"host\\": \\"prod-db.cluster-xyz.us-east-1.rds.amazonaws.com\\", \\"username\\": \\"admin\\", \\"password\\": \\"SuperSecretPassword123!\\", \\"database\\": \\"production\\", \\"forensic_flag\\": \\"EXPERT_SECURITY_MASTER_2023\\"}",
    "VersionId": "AWSCURRENT",
    "CreatedDate": "2023-08-19T12:50:00.000Z"
}

🔒 EXPERT LEVEL COMPLETE! 🔒

You have successfully completed the most challenging AWS CLI scenarios involving:
• Advanced EC2 and VPC analysis
• Multi-service integration and investigation
• Complex query operations and filtering
• Real-world security and operations scenarios

Final Code: EXPERT_SECURITY_MASTER_2023`,
            nextClue: null,
            isComplete: true,
            hint: "Retrieve the database configuration secret to complete the expert investigation."
        }
    ]
};

// Achievement definitions
const achievements = {
    perfectNavigator: {
        name: "Perfect Navigator",
        description: "Complete with 90%+ efficiency",
        icon: "🏆",
        check: (stats) => stats.efficiency > 90
    },
    noHintsNeeded: {
        name: "No Hints Needed",
        description: "Complete without using any hints",
        icon: "🧠",
        check: (stats) => stats.hintsUsed === 0
    },
    speedDemon: {
        name: "Speed Demon",
        description: "Complete in under 2 minutes",
        icon: "⚡",
        check: (stats) => stats.completionTime < 120
    },
    commandMaster: {
        name: "Command Master",
        description: "Complete advanced level",
        icon: "👑",
        check: (stats) => stats.difficulty === 'advanced'
    },
    firstTry: {
        name: "First Try Hero",
        description: "Get every command right on first attempt",
        icon: "🎯",
        check: (stats) => stats.efficiency === 100
    }
};

// Help messages for different contexts
const helpMessages = {
    general: `<span class="status-indicator status-info"></span>Available commands:

<span class="success">AWS Commands:</span>
• aws s3 ls [bucket-name] - List S3 buckets or bucket contents
• aws s3 cp <source> <destination> - Copy files from S3
• aws s3api list-buckets - List buckets with API format
• aws ssm get-parameter --name <parameter-name> - Get SSM parameter
• aws iam list-attached-user-policies --user-name <username> - List IAM policies
• aws iam get-policy-version --policy-arn <arn> --version-id <version> - Get policy document
• aws lambda get-function --function-name <name> - Get Lambda function details

<span class="success">System Commands:</span>
• cat <filename> - Display file contents
• ls / ll / la - List directory contents
• pwd - Print working directory
• history - Show command history
• clear / cls - Clear the screen (Ctrl+L)
• help [topic] - Show help (try: help s3, help iam, help ssm)

<span class="success">Navigation:</span>
• Tab - Auto-completion
• ↑/↓ - Command history
• Ctrl+L - Clear screen
• Ctrl+R - Reset game`,
    
    s3: `<span class="status-indicator status-success"></span>S3 Commands:
• aws s3 ls - List all buckets
• aws s3 ls s3://bucket-name - List objects in bucket
• aws s3 cp s3://bucket/file . - Download file
• aws s3api list-buckets --query "Buckets[?contains(Name, 'search')]" - Query buckets
• aws s3api get-object --bucket <bucket> --key <key> <filename> - Download with API`,
    
    iam: `<span class="status-indicator status-warning"></span>IAM Commands:
• aws iam list-users - List all users
• aws iam list-attached-user-policies --user-name <name> - List user policies
• aws iam get-policy-version --policy-arn <arn> --version-id <version> - Get policy
• aws iam get-role --role-name <name> - Get role details
• aws iam list-roles - List all roles`,
    
    ssm: `<span class="status-indicator status-info"></span>SSM Commands:
• aws ssm describe-parameters - List all parameters
• aws ssm get-parameter --name <name> - Get parameter value
• aws ssm get-parameter --name <name> --with-decryption - Get encrypted parameter
• aws ssm get-parameter --name <name> --version-id <version> - Get specific version`,

    lambda: `<span class="status-indicator status-success"></span>Lambda Commands:
• aws lambda list-functions - List all functions
• aws lambda get-function --function-name <name> - Get function details
• aws lambda invoke --function-name <name> --payload <json> output.txt - Invoke function`,

    shortcuts: `<span class="status-indicator status-info"></span>Keyboard Shortcuts:
• Tab - Auto-complete current command
• ↑/↓ - Navigate command history
• Ctrl+L - Clear screen
• Ctrl+R - Reset game
• Ctrl+C - Cancel current input
• Esc - Close autocomplete dropdown

<span class="success">Command Aliases:</span>
• ll, la - List files (ls -la)
• cls - Clear screen
• h, ? - Help
• q - Quit`
};

// System responses for CLI commands
const systemResponses = {
    ls: `total 8
drwxr-xr-x  2 user user 4096 Aug 19 20:23 .
drwxr-xr-x 15 user user 4096 Aug 19 20:20 ..
-rw-r--r--  1 user user  156 Aug 19 20:23 clue.txt`,
    
    pwd: `/home/user/cli-hunt`,
    
    whoami: `user`,
    
    date: () => new Date().toLocaleString(),
    
    uptime: `20:23:47 up 2:15, 1 user, load average: 0.08, 0.12, 0.09`,
    
    uname: `Linux cli-hunt 5.15.0-aws x86_64 GNU/Linux`,

    // AWS Utility Commands
    'aws --version': `aws-cli/2.13.25 Python/3.11.5 Linux/5.15.0-aws exe/x86_64.ubuntu.22 prompt/off`,
    
    'aws --help': `usage: aws [--version] [--debug] [--endpoint-url <value>]
            [--no-verify-ssl] [--no-paginate] [--output <value>]
            [--query <value>] [--profile <value>] [--region <value>]
            [--version] [--color <value>] [--no-sign-request]
            [--ca-bundle <value>] [--cli-read-timeout <value>]
            [--cli-connect-timeout <value>]

The AWS Command Line Interface (CLI) is a unified tool to manage your AWS services.

Available services:
• s3              • iam             • lambda          • ssm
• dynamodb        • ec2             • cloudformation  • secretsmanager
• logs            • cloudwatch      • kms             • sts

For service-specific help: aws <service> help`,

    'aws configure list': `      Name                    Value             Type    Location
      ----                    -----             ----    --------
   profile                <not set>             None    None
access_key     ****************ABCD shared-credentials-file    
secret_key     ****************WXYZ shared-credentials-file    
    region                us-east-1      config-file    ~/.aws/config`,

    'aws configure get region': `us-east-1`,

    'aws sts get-caller-identity': `{
    "UserId": "AIDACKCEVSQ6C2EXAMPLE",
    "Account": "123456789012",
    "Arn": "arn:aws:iam::123456789012:user/cli-hunter"
}`,

    'aws sts get-session-token': `{
    "Credentials": {
        "AccessKeyId": "ASIAIOSFODNN7EXAMPLE",
        "SecretAccessKey": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
        "SessionToken": "AQoDYXdzEJr...<remainder of security token>",
        "Expiration": "2023-08-19T23:00:00.000Z"
    }
}`,

    'aws iam get-user': `{
    "User": {
        "Path": "/",
        "UserName": "cli-hunter",
        "UserId": "AIDACKCEVSQ6C2EXAMPLE",
        "Arn": "arn:aws:iam::123456789012:user/cli-hunter",
        "CreateDate": "2023-08-19T10:00:00.000Z"
    }
}`,

    'aws iam get-account-summary': `{
    "SummaryMap": {
        "Users": 5,
        "Groups": 2,
        "Roles": 12,
        "Policies": 8,
        "UserPolicySizeQuota": 2048,
        "GroupPolicySizeQuota": 5120,
        "RolePolicySizeQuota": 10240
    }
}`,

    'aws ec2 describe-regions': `{
    "Regions": [
        {"RegionName": "us-east-1", "Endpoint": "ec2.us-east-1.amazonaws.com"},
        {"RegionName": "us-west-1", "Endpoint": "ec2.us-west-1.amazonaws.com"},
        {"RegionName": "us-west-2", "Endpoint": "ec2.us-west-2.amazonaws.com"},
        {"RegionName": "eu-west-1", "Endpoint": "ec2.eu-west-1.amazonaws.com"},
        {"RegionName": "ap-southeast-1", "Endpoint": "ec2.ap-southeast-1.amazonaws.com"}
    ]
}`,

    'aws ec2 describe-availability-zones': `{
    "AvailabilityZones": [
        {"ZoneName": "us-east-1a", "State": "available", "RegionName": "us-east-1"},
        {"ZoneName": "us-east-1b", "State": "available", "RegionName": "us-east-1"},
        {"ZoneName": "us-east-1c", "State": "available", "RegionName": "us-east-1"}
    ]
}`,

    'aws kms list-keys': `{
    "Keys": [
        {"KeyId": "12345678-1234-1234-1234-123456789012"},
        {"KeyId": "87654321-4321-4321-4321-210987654321"},
        {"KeyId": "alias/aws/s3"},
        {"KeyId": "alias/hunt-master-key"}
    ]
}`
};
