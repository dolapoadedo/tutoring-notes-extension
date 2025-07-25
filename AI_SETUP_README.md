# AI-Powered Session Note Evaluation Setup Guide

## Overview

The Chrome extension now includes AI-powered session note evaluation using OpenAI's GPT-4 model. This feature provides:

- **Automated scoring** based on a 10-category rubric (1-4 scale)
- **Improved note generation** with grammar fixes and enhanced language
- **Secure API key storage** using Web Crypto API encryption
- **Usage limits** (50 evaluations per user per day)
- **Rate limiting** (10-second cooldown between requests)

## Security Features

### 🔐 Encrypted API Key Storage
- API key is encrypted using AES-GCM with PBKDF2 key derivation
- Extension ID + custom salt for unique encryption per installation
- 100,000 iterations for strong key derivation
- No plaintext API key stored anywhere in the code

### 🛡️ Usage Controls
- **Daily Limits**: 50 evaluations per user per day
- **Rate Limiting**: 10 seconds between evaluation requests
- **Input Validation**: Notes must be 50-5000 characters
- **User Authentication**: Only @score-academy.com users can access

## Production Setup Instructions

### Step 1: Encrypt Your OpenAI API Key

1. **Get your OpenAI API key** from https://platform.openai.com/api-keys

2. **Find your extension ID**:
   - Load the extension in Chrome Developer Mode
   - Copy the extension ID from chrome://extensions/

3. **Encrypt the API key**:
   ```javascript
   // Open browser console on any page
   // Load the encryption utility
   fetch('encrypt-api-key.js').then(r => r.text()).then(eval);
   
   // Update the extension ID in the script
   const encryptor = new APIKeyEncryptor();
   encryptor.extensionId = 'your-actual-extension-id-here';
   
   // Encrypt your API key
   const encrypted = await encryptor.encryptAPIKey('sk-your-actual-api-key-here');
   console.log('Encrypted key:', JSON.stringify(encrypted, null, 2));
   
   // Test decryption
   const isValid = await encryptor.testDecryption(encrypted, 'sk-your-actual-api-key-here');
   console.log('Decryption test passed:', isValid);
   ```

### Step 2: Update the Extension Code

1. **Replace the placeholder in `ai-evaluation.js`**:
   ```javascript
   // Replace this:
   const ENCRYPTED_API_KEY = {
     encrypted: [/* This will be populated with actual encrypted key */],
     iv: [/* This will be populated with actual IV */]
   };
   
   // With your encrypted key:
   const ENCRYPTED_API_KEY = {
     encrypted: [/* Your encrypted array from step 1 */],
     iv: [/* Your IV array from step 1 */]
   };
   ```

2. **Enable the production API code**:
   ```javascript
   // In ai-evaluation.js, replace the simulateAIResponse call with:
   const keyManager = new SecureAPIKeyManager();
   const apiKey = await keyManager.decryptAPIKey(ENCRYPTED_API_KEY);
   
   const response = await fetch('https://api.openai.com/v1/chat/completions', {
     method: 'POST',
     headers: {
       'Authorization': `Bearer ${apiKey}`,
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       model: 'gpt-4',
       messages: [
         {
           role: 'system',
           content: EVALUATION_PROMPT
         },
         {
           role: 'user',
           content: `Here is the session note to evaluate:\n\n${sessionNote}`
         }
       ],
       temperature: 0.3,
       max_tokens: 2000
     })
   });
   
   if (!response.ok) {
     throw new Error(`OpenAI API error: ${response.status}`);
   }
   
   const data = await response.json();
   return data.choices[0].message.content;
   ```

## User Interface

### AI Evaluation Workflow

1. **User writes session notes** in the text area
2. **Usage counter** shows daily limit (e.g., "5/50 AI evaluations used today")
3. **Click "🤖 Evaluate with AI"** button
4. **Loading state** with spinner and "Evaluating..." text
5. **Results display** with:
   - Overall score (e.g., "3.9/4.0")
   - Detailed scoring table with comments
   - Improved version of the note
   - Version selector (Original vs Improved)
6. **Generate report** uses selected version

### Features

- **Color-coded scores**: Red (1), Orange (2), Yellow (3), Green (4)
- **Loading indicators**: Spinner animation during evaluation
- **Error handling**: User-friendly error messages
- **Usage tracking**: Real-time counter updates
- **Version comparison**: Easy switching between original and improved

## Error Handling

The system handles various error scenarios:

### Usage Limits
```
"Daily evaluation limit reached (50 per day)"
```

### Rate Limiting
```
"Please wait 10 seconds between evaluations"
```

### Input Validation
```
"Note too long (max 5000 characters)"
"Note too short (min 50 characters)"
```

### API Errors
```
"OpenAI API error: 429" (rate limited)
"OpenAI API error: 401" (invalid key)
"Network error. Please check connection."
```

## Cost Management

### Estimated Costs (GPT-4)
- **Average request**: ~1,500 tokens (prompt + response)
- **Cost per evaluation**: ~$0.045 USD
- **Daily maximum per user**: 50 × $0.045 = $2.25 USD
- **Monthly estimate for 10 active users**: ~$675 USD

### Usage Monitoring
- Track daily usage per user
- Monitor total API costs in OpenAI dashboard
- Consider implementing weekly/monthly limits if needed

## Testing

### Demo Mode
The extension includes a demo mode that simulates AI responses without using the actual API:

```javascript
// Current demo implementation
return simulateAIResponse(sessionNote);
```

This allows testing the complete workflow before production deployment.

### Test Scenarios

1. **Valid note evaluation** (50-5000 characters)
2. **Note too short** (< 50 characters)
3. **Note too long** (> 5000 characters)
4. **Rate limiting** (multiple requests within 10 seconds)
5. **Daily limit** (51st request in a day)
6. **Version selection** (original vs improved)

## Security Considerations

### ✅ Secure Implementation
- ✅ API key encrypted with strong encryption
- ✅ Rate limiting to prevent abuse
- ✅ Usage limits to control costs
- ✅ Input validation and sanitization
- ✅ User authentication required
- ✅ No API key in source code

### 🔒 Additional Recommendations
- Monitor OpenAI usage dashboard regularly
- Set up billing alerts in OpenAI account
- Consider implementing admin override capabilities
- Log evaluation attempts for audit trail
- Regular security reviews of encryption implementation

## Support

For issues or questions:

1. Check browser console for detailed error messages
2. Verify user has @score-academy.com email
3. Check OpenAI API status and billing
4. Verify extension permissions and host_permissions
5. Test with demo mode first

## Files Modified

- `manifest.json` - Added OpenAI API permissions
- `popup.html` - Added AI evaluation UI components
- `popup.js` - Integrated AI evaluation functionality
- `ai-evaluation.js` - Core AI evaluation logic
- `encrypt-api-key.js` - Utility for API key encryption

The implementation maintains backward compatibility - all existing functionality continues to work exactly as before. 