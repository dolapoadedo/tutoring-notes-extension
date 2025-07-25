# Score At The Top - Session Notes Extension

A Chrome extension for tutors at Score At The Top Learning Centers to format session notes with AI-powered evaluation, consistent branding, and professional structure.

## Features

- **Google OAuth Authentication** - Secure login using @score-academy.com Google accounts
- **AI-Powered Note Evaluation** - Detailed scoring and improvement suggestions
- **Professional Session Report Formatting** - Consistent, branded output
- **Real-time Usage Tracking** - 50 AI evaluations per day per user
- **Secure Data Handling** - Encrypted API keys and local-only storage
- **24-hour Secure Login Sessions** - Automatic session management
- **Score At The Top Branding** - Professional colors and styling
- **User Profile Integration** - Google account information display

## Installation

### From Chrome Web Store (Recommended)
*Coming Soon - Currently in review*

### Manual Installation (Development)
1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in the top-right corner)
4. Click "Load unpacked"
5. Select the folder containing the extension files

## Usage

1. Click the extension icon in your Chrome toolbar
2. Click "Sign in with Google" 
3. Sign in with your @score-academy.com Google account
   - **Note:** Only @score-academy.com email addresses are allowed
   - Other domains will be rejected with an "Access denied" message
4. Fill in the student name, subject/course, and detailed session notes
5. Click "AI Evaluate/Improve" to get AI-powered feedback and improvements
6. Review the evaluation results and improved note suggestions
7. Use the improved notes for professional communication with parents

## User Access Management

Users are automatically authenticated through Google OAuth. To grant access to new tutors:

1. Ensure they have a @score-academy.com Google account
2. No additional configuration needed in the extension
3. Users will be able to sign in directly with their Google credentials

The extension automatically validates that users have the correct email domain (@score-academy.com) before granting access.

## Key Benefits

- **AI-Powered Evaluation**: Detailed scoring across 10 categories with improvement suggestions
- **Professional Branding**: Matches Score At The Top's visual identity
- **Quality Assurance**: Standardized evaluation criteria for session note quality
- **Google OAuth Security**: Secure authentication using Score Academy's Google Workspace
- **No Password Management**: Users sign in with their existing Google credentials
- **Automatic User Management**: Access controlled by Google account domain verification
- **Real User Names**: Session reports use actual names from Google accounts
- **Easy to Use**: Clean, intuitive interface with real-time feedback
- **Rate Limited**: 50 AI evaluations per day to manage costs and usage
- **Privacy-First**: Local storage only, no permanent data retention

## Technical Features

### Security
- **Encrypted API Keys**: AES-256-GCM encryption for OpenAI API keys
- **Local Storage Only**: No server-side data storage
- **Domain Restrictions**: @score-academy.com email verification
- **Session Management**: 24-hour automatic logout

### AI Evaluation
- **OpenAI GPT-4 Integration**: Advanced language model for note evaluation
- **10-Point Rubric**: Comprehensive scoring across multiple categories
- **Usage Limits**: 50 evaluations per user per day
- **Real-time Feedback**: Instant improvement suggestions

### Privacy & Compliance
- **GDPR Compliant**: European data protection standards
- **CCPA Compliant**: California privacy regulations
- **No Data Retention**: Temporary processing only
- **Transparent Privacy Policy**: Available in PRIVACY_POLICY.md

## Chrome Web Store Submission

This extension is ready for Chrome Web Store submission with:
- ✅ Proper icon sizes (16x16, 48x48, 128x128)
- ✅ Comprehensive privacy policy
- ✅ Security best practices
- ✅ Professional documentation
- 📋 Screenshot and promotional assets needed (see CHROME_STORE_ASSETS.md)

## Contact

Score At The Top Learning Centers  
Phone: (844) 438-1600  
Website: www.scoreatthietop.com  

*Maximize Grades • Maximize SAT/ACT Scores • Maximize Your Potential* 