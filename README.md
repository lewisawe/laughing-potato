# AWS CLI Scavenger Hunt

An interactive web-based game that teaches AWS CLI commands through progressive challenges and real-world scenarios.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Overview

Master AWS CLI commands through an engaging scavenger hunt that simulates real AWS environments. Navigate through multiple difficulty levels, each teaching different AWS services and advanced command-line techniques.

### Key Features

- **Interactive CLI Simulation** - Realistic command-line interface with authentic AWS responses
- **Progressive Difficulty** - 4 levels from Beginner to Expert (25+ total challenges)
- **10+ AWS Services** - S3, IAM, Lambda, DynamoDB, CloudFormation, Secrets Manager, and more
- **Smart Auto-completion** - Tab completion with command descriptions and shortcuts
- **Contextual Help** - Built-in help system with service-specific guidance
- **Achievement System** - Earn badges for efficiency, speed, and skill
- **Responsive Design** - Works on desktop, tablet, and mobile devices

## Quick Start

### Option 1: Direct Download
1. Download all files to a local directory
2. Open `index.html` in any modern web browser
3. Start playing immediately!

### Option 2: Clone Repository
```bash
git clone <repository-url>
cd CLI_skavenger_hunt
open index.html
```

### Option 3: Local Server (Optional)
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Then visit http://localhost:8000
```

## How to Play

### Getting Started
1. **Choose your difficulty level** - Beginner, Intermediate, Advanced, or Expert
2. **Read the first clue** carefully
3. **Type AWS CLI commands** to solve each challenge
4. **Follow the trail** of clues through multiple AWS services
5. **Complete all stages** to earn your certification!

### Controls & Features
- **Tab** - Auto-complete commands with descriptions
- **Up/Down Arrows** - Navigate command history
- **Ctrl+L** - Clear screen (preserves current clue)
- **Ctrl+R** - Reset game
- **help [topic]** - Get contextual assistance

## Difficulty Levels

### Beginner (6 Stages)
**Perfect for AWS CLI newcomers**
- Basic S3 operations (`aws s3 ls`, `aws s3 cp`)
- Simple SSM parameter retrieval
- Basic IAM policy inspection
- **Services**: S3, SSM, IAM
- **Estimated time**: 10-15 minutes

### Intermediate (7 Stages)
**Multi-service integration scenarios**
- Encrypted S3 buckets and CloudTrail logs
- Lambda function investigation
- Encrypted SSM parameters with decryption
- DynamoDB item retrieval
- **Services**: S3, Lambda, SSM, DynamoDB, CloudTrail
- **Estimated time**: 15-25 minutes

### Advanced (8 Stages)
**Complex infrastructure analysis**
- CloudFormation stack investigation
- Secrets Manager integration
- CloudWatch Logs filtering and analysis
- KMS key management
- Multi-service troubleshooting workflows
- **Services**: CloudFormation, Secrets Manager, CloudWatch, KMS, S3, DynamoDB
- **Estimated time**: 25-40 minutes

### Expert (3 Intensive Stages)
**Security incident response scenarios**
- Advanced EC2 and VPC analysis with complex queries
- Security group vulnerability assessment
- Production environment investigation
- **Services**: EC2, VPC, Secrets Manager
- **Estimated time**: 20-30 minutes

## AWS Services Covered

| Service | Commands Taught | Use Cases |
|---------|----------------|-----------|
| **S3** | `ls`, `cp`, `s3api list-buckets` | Object storage, data retrieval |
| **IAM** | `list-users`, `get-policy-version` | Identity management, permissions |
| **Lambda** | `list-functions`, `get-function` | Serverless computing |
| **SSM** | `get-parameter`, `describe-parameters` | Configuration management |
| **DynamoDB** | `get-item`, `scan`, `describe-table` | NoSQL database operations |
| **CloudFormation** | `list-stacks`, `list-stack-resources` | Infrastructure as Code |
| **Secrets Manager** | `get-secret-value`, `list-secrets` | Secure credential storage |
| **CloudWatch** | `describe-log-groups`, `get-log-events` | Monitoring and logging |
| **KMS** | `describe-key`, `decrypt` | Encryption key management |
| **EC2** | `describe-instances`, `describe-vpcs` | Virtual machines, networking |

## Achievement System

Earn badges based on your performance:

- **Perfect Navigator** - Complete with 90%+ efficiency
- **No Hints Needed** - Complete without using any hints
- **Speed Demon** - Complete in under 2 minutes
- **Command Master** - Complete Advanced level
- **First Try Hero** - Get every command right on first attempt

## Technical Details

### Architecture
- **Frontend Only** - No backend required, runs entirely in browser
- **Vanilla JavaScript** - No frameworks or dependencies
- **Modular Design** - Separated HTML, CSS, and JavaScript files
- **Progressive Enhancement** - Works without JavaScript (basic functionality)

### File Structure
```
CLI_skavenger_hunt/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── config.js           # Game data and AWS command definitions
├── game.js             # Core game logic and interactions
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

### Browser Compatibility
- **Chrome** 60+
- **Firefox** 55+
- **Safari** 12+
- **Edge** 79+
- **Mobile browsers**

## Customization

### Adding New Levels
1. Edit `config.js`
2. Add new stages to `gameStages` object
3. Define expected commands and outputs
4. Add corresponding AWS commands to autocomplete

### Modifying Difficulty
```javascript
// In config.js
gameStages.yourLevel = [
    {
        expectedCommand: 'your-aws-command',
        output: 'simulated-aws-response',
        nextClue: 'next-challenge-description',
        hint: 'helpful-hint-text'
    }
];
```

### Styling Changes
- Modify `styles.css` for visual customization
- CSS variables available for easy theme changes
- Responsive design breakpoints included

## Contributing

We welcome contributions! Here's how you can help:

### Ways to Contribute
- **Report bugs** - Found an issue? Let us know!
- **Suggest features** - Ideas for new AWS services or challenges
- **Improve documentation** - Help make instructions clearer
- **Add game content** - Create new levels or scenarios
- **Enhance UI/UX** - Improve the visual design

### Development Setup
1. Fork the repository
2. Make your changes
3. Test thoroughly across different browsers
4. Submit a pull request with clear description

### Adding New AWS Services
1. Add commands to `awsCommands` array in `config.js`
2. Create realistic response data
3. Add help documentation
4. Test command validation logic

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **AWS Documentation** - For accurate CLI command references
- **Community Feedback** - Thanks to all beta testers and contributors
- **Open Source Libraries** - Built with standard web technologies

## Support

- **Issues**: Report bugs or request features via GitHub Issues
- **Discussions**: Join community discussions for tips and tricks
- **Documentation**: Check this README and inline help system

## Related Projects

- [AWS CLI Official Documentation](https://docs.aws.amazon.com/cli/)
- [AWS CLI Command Reference](https://awscli.amazonaws.com/v2/documentation/api/latest/index.html)
- [AWS Training and Certification](https://aws.amazon.com/training/)

---

**Ready to become an AWS CLI master?** Start your scavenger hunt adventure today!

*Made with love for the AWS community*
