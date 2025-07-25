// Utility script to encrypt OpenAI API key for production deployment
// Run this in the browser console to generate encrypted key

class APIKeyEncryptor {
  constructor() {
    this.extensionId = 'your-extension-id-here'; // Replace with actual extension ID
  }

  async generateEncryptionKey() {
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(this.extensionId + 'score-academy-2024'),
      'PBKDF2',
      false,
      ['deriveBits', 'deriveKey']
    );

    return await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: new TextEncoder().encode('score-tutoring-salt'),
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }

  async encryptAPIKey(apiKey) {
    const key = await this.generateEncryptionKey();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      new TextEncoder().encode(apiKey)
    );

    return {
      encrypted: Array.from(new Uint8Array(encrypted)),
      iv: Array.from(iv)
    };
  }

  async testDecryption(encryptedData, originalKey) {
    const key = await this.generateEncryptionKey();
    const encrypted = new Uint8Array(encryptedData.encrypted);
    const iv = new Uint8Array(encryptedData.iv);

    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      encrypted
    );

    const decryptedKey = new TextDecoder().decode(decrypted);
    return decryptedKey === originalKey;
  }
}

// Usage instructions:
console.log(`
=== API Key Encryption Utility ===

To encrypt your OpenAI API key:

1. Set your extension ID in this script
2. Run: const encryptor = new APIKeyEncryptor();
3. Run: const encrypted = await encryptor.encryptAPIKey('your-openai-api-key-here');
4. Copy the result and replace ENCRYPTED_API_KEY in ai-evaluation.js

Example:
const encryptor = new APIKeyEncryptor();
const encrypted = await encryptor.encryptAPIKey('sk-...');
console.log('Encrypted key:', encrypted);

// Test decryption:
const isValid = await encryptor.testDecryption(encrypted, 'sk-...');
console.log('Decryption test:', isValid);
`);

// Make the class globally available
window.APIKeyEncryptor = APIKeyEncryptor; 