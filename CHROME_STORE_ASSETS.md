# Chrome Web Store Assets Guide

This document outlines the required assets for submitting the Score At The Top - Session Notes Extension to the Chrome Web Store.

## Required Assets Checklist

### ✅ Icons (Completed)
- [x] 16x16 pixel icon (`assets/icon-16.png`)
- [x] 48x48 pixel icon (`assets/icon-48.png`) 
- [x] 128x128 pixel icon (`assets/icon-128.png`)

### 📸 Screenshots (Required)
You need to take and upload screenshots showing your extension in action.

**Requirements:**
- **Size:** 1280x800 pixels or 1920x1080 pixels
- **Format:** PNG or JPEG
- **Quantity:** 1-5 screenshots
- **Content:** Show key features of your extension

**Recommended Screenshots:**
1. **Login Screen** - Show the Google OAuth sign-in interface
2. **Main Interface** - Session notes form with fields populated
3. **AI Evaluation Results** - Show the evaluation table and improved notes
4. **User Profile** - Display of logged-in user information

**How to Take Screenshots:**
1. Open Chrome Developer Tools (F12)
2. Click the device toggle icon or press Ctrl+Shift+M
3. Set custom dimensions: 1280x800
4. Navigate through your extension
5. Use browser screenshot tools or macOS screenshot (Cmd+Shift+4)

### 🎨 Promotional Images (Required)

#### Small Promotional Tile
- **Size:** 440x280 pixels
- **Format:** PNG or JPEG
- **Content:** Extension logo, name, and key benefit
- **Text should be readable at small sizes**

#### Large Promotional Tile (Optional but Recommended)
- **Size:** 920x680 pixels
- **Format:** PNG or JPEG
- **Content:** More detailed promotional image

**Promotional Image Content Ideas:**
- Score At The Top logo prominently displayed
- Text: "AI-Powered Session Notes for Tutors"
- Key features: "Google OAuth • AI Evaluation • Professional Formatting"
- Brand colors: Purple (#380560) and Cyan (#66cee9)

## Store Listing Content

### Short Description (132 characters max)
```
AI-powered session note formatting for Score At The Top tutors. OAuth authentication and professional report generation.
```

### Detailed Description
```
Transform your tutoring session notes with AI-powered evaluation and professional formatting designed specifically for Score At The Top Learning Centers staff.

KEY FEATURES:
• Secure Google OAuth Authentication (@score-academy.com accounts only)
• AI-Powered Note Evaluation with detailed scoring (1-4 scale)
• Professional session report formatting
• Real-time improvement suggestions
• Usage tracking and rate limiting (50 evaluations/day)
• Score At The Top branded interface
• 24-hour secure login sessions

PERFECT FOR:
• Score At The Top tutors and staff
• Professional session documentation
• Parent communication and reporting
• Quality assurance and training

SECURITY & PRIVACY:
• Encrypted API key storage
• Local data storage only
• No permanent note storage
• GDPR and CCPA compliant

REQUIREMENTS:
• Must have @score-academy.com Google account
• Chrome browser
• Internet connection for AI features

Contact Score At The Top Learning Centers:
Phone: (844) 438-1600
Website: www.scoreatthietop.com

Maximize Grades • Maximize SAT/ACT Scores • Maximize Your Potential
```

### Category
**Productivity**

### Language
**English**

## Privacy Policy
✅ **Completed:** `PRIVACY_POLICY.md`

**Note:** You'll need to host this privacy policy on a publicly accessible website. Options:
1. GitHub Pages (free)
2. Score At The Top website
3. Google Sites (free)
4. Any web hosting service

## Permissions Justification

Be prepared to explain these permissions during review:

### `identity`
Required for Google OAuth authentication to verify Score At The Top staff access.

### `storage`
Used to store user authentication data locally and track daily AI usage limits.

### `activeTab`
Required for the popup interface functionality.

### `https://api.openai.com/*`
Required to send session notes to OpenAI API for AI evaluation and improvement.

## Submission Steps

1. **Prepare Assets**
   - Take screenshots (1280x800)
   - Create promotional images (440x280)
   - Host privacy policy online

2. **Create Developer Account**
   - Pay $5 Chrome Web Store developer fee
   - Verify identity

3. **Upload Extension**
   - Zip entire extension folder
   - Upload to Chrome Web Store Developer Dashboard

4. **Fill Store Listing**
   - Add descriptions, screenshots, promotional images
   - Set category and pricing (free)
   - Add privacy policy URL

5. **Submit for Review**
   - Review can take 1-3 business days
   - Google may request changes

## Quality Assurance

Before submission, test:
- [x] Extension loads properly
- [x] OAuth authentication works
- [x] All permissions function correctly
- [x] Icons display at all sizes
- [x] No console errors
- [x] Privacy policy is accurate and accessible

## Post-Submission

Once approved:
- Extension will be publicly available (but restricted to @score-academy.com users)
- Monitor user feedback and reviews
- Prepare for future updates

## Contact for Assets Creation

If you need help creating promotional images or screenshots:
- Use Canva, Figma, or Photoshop for promotional images
- Use browser developer tools for consistent screenshot sizing
- Consider hiring a designer for professional promotional materials 