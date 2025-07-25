// AI-Powered Session Note Evaluation with Secure API Key Management
// Score At The Top Extension

class SecureAPIKeyManager {
  constructor() {
    this.encryptionKey = null;
  }

  async generateEncryptionKey() {
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(chrome.runtime.id + 'score-academy-2024'),
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

  async decryptAPIKey(encryptedData) {
    const key = await this.generateEncryptionKey();
    const encrypted = new Uint8Array(encryptedData.encrypted);
    const iv = new Uint8Array(encryptedData.iv);

    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      encrypted
    );

    return new TextDecoder().decode(decrypted);
  }
}

// Encrypted OpenAI API Key - Production Ready
const ENCRYPTED_API_KEY = {
  encrypted: [
    74,
    6,
    44,
    199,
    115,
    203,
    160,
    136,
    195,
    191,
    233,
    77,
    107,
    240,
    9,
    225,
    40,
    23,
    22,
    106,
    117,
    63,
    248,
    142,
    42,
    180,
    84,
    170,
    16,
    57,
    165,
    46,
    150,
    125,
    207,
    228,
    29,
    85,
    102,
    166,
    120,
    202,
    17,
    251,
    54,
    161,
    21,
    99,
    231,
    137,
    253,
    64,
    43,
    126,
    42,
    184,
    118,
    37,
    24,
    72,
    143,
    134,
    46,
    211,
    183,
    233,
    152,
    178,
    207,
    85,
    244,
    188,
    239,
    250,
    176,
    147,
    253,
    67,
    209,
    168,
    88,
    193,
    140,
    245,
    41,
    52,
    105,
    36,
    136,
    47,
    142,
    10,
    244,
    201,
    216,
    205,
    219,
    2,
    234,
    211,
    4,
    211,
    0,
    220,
    16,
    216,
    19,
    152,
    53,
    38,
    11,
    250,
    0,
    208,
    74,
    234,
    15,
    183,
    117,
    6,
    210,
    241,
    144,
    26,
    212,
    175,
    251,
    37,
    242,
    140,
    146,
    162,
    138,
    51,
    5,
    52,
    138,
    64,
    133,
    159,
    42,
    159,
    15,
    152,
    167,
    27,
    227,
    19,
    159,
    78,
    99,
    77,
    198,
    43,
    217,
    93,
    215,
    21,
    234,
    229,
    213,
    118,
    63,
    130,
    10,
    134,
    242,
    128,
    149,
    138,
    242,
    226,
    156,
    165,
    236,
    182,
    127,
    205,
    17,
    89
  ],
  iv: [
    230,
    150,
    212,
    116,
    252,
    193,
    82,
    247,
    83,
    198,
    234,
    170
  ]
};

// Usage and Rate Limiting Functions
const checkUsageLimit = async (userEmail) => {
  const today = new Date().toDateString();
  const usage = await chrome.storage.local.get(`usage_${userEmail}_${today}`);
  const count = usage[`usage_${userEmail}_${today}`] || 0;
  
  if (count >= 50) { // 50 evaluations per day max
    throw new Error('Daily evaluation limit reached (50 per day)');
  }
  
  // Increment usage
  await chrome.storage.local.set({
    [`usage_${userEmail}_${today}`]: count + 1
  });
  
  return count + 1;
};

const validateNote = (note) => {
  if (note.length > 5000) { // Max 5000 characters
    throw new Error('Note too long (max 5000 characters)');
  }
  if (note.length < 50) { // Min 50 characters
    throw new Error('Note too short (min 50 characters)');
  }
};

// Request rate limiting
let lastRequestTime = 0;
const checkRateLimit = () => {
  const now = Date.now();
  if (now - lastRequestTime < 10000) { // 10 seconds between requests
    throw new Error('Please wait 10 seconds between evaluations');
  }
  lastRequestTime = now;
};

// Get current usage count for display
const getCurrentUsage = async (userEmail) => {
  const today = new Date().toDateString();
  const usage = await chrome.storage.local.get(`usage_${userEmail}_${today}`);
  return usage[`usage_${userEmail}_${today}`] || 0;
};

// AI Evaluation Prompt
const EVALUATION_PROMPT = `You are an experienced tutor manager with 10 years of experience evaluating session notes. Your role is to provide realistic, constructive feedback based STRICTLY on what is written in the provided session note. You must NOT make assumptions or add information that isn't explicitly stated in the note.

CRITICAL INSTRUCTION: Base your evaluation ONLY on what is actually written in the session note. Do not infer, assume, or imagine details that are not explicitly mentioned. If information is missing for a category, that should be reflected in a lower score.

The rubric evaluates these areas on a 1-4 scale: intro, commentary on what was covered, commentary on strengths, commentary on weaknesses, commentary on energy, commentary on preparedness, commentary on progress, commentary on next session, closing, and homework.

GRADING CRITERIA (be realistic and strict):

Intro
1 - No personal opening or generic greeting only
2 - Brief personal opening but minimal effort
3 - Personal opening with genuine warmth about working with the student
4 - Exceptional personal opening with specific details about enjoying work with this particular student

Commentary on what was covered
1 - Vague or no details about session content
2 - Basic mention of topics but little insight
3 - Good detail about content with some insight into student understanding
4 - Comprehensive coverage details with deep insight into student comprehension and learning process

Commentary on strengths
1 - No mention of student strengths
2 - Brief mention of strengths without examples
3 - Clear strengths mentioned with at least one specific example
4 - Multiple specific strengths with examples and actionable development suggestions

Commentary on weaknesses
1 - No mention of areas for improvement
2 - Basic mention of weaknesses without detail
3 - Specific weaknesses identified with examples
4 - Detailed weakness analysis with specific examples and practical improvement strategies

Commentary on energy
1 - No mention of student's energy or engagement
2 - Brief mention of energy level
3 - Clear description of student's energy and engagement
4 - Detailed energy assessment with specific examples and suggestions for improvement if needed

Commentary on preparation
1 - No mention of student's preparation level
2 - Basic mention of preparation
3 - Good description of how prepared the student was
4 - Detailed preparation assessment with specific examples and improvement suggestions

Commentary on progress
1 - No mention of student progress during session
2 - Basic mention of progress
3 - Clear description of progress made in the session
4 - Detailed progress analysis with specific examples and future development strategies

Commentary on next session
1 - No mention of future sessions
2 - Vague mention of next session without specifics
3 - Clear mention of next session with some specific plans
4 - Detailed next session planning with specific time, date, and learning objectives

Closing
1 - No personal closing or abrupt ending
2 - Basic personal closing
3 - Warm personal closing expressing enjoyment working with student
4 - Exceptional personal closing with specific appreciation and encouragement

Homework
1 - No homework mentioned
2 - Homework mentioned but vague
3 - Specific homework assigned with clear instructions
4 - Detailed homework with specific instructions, time estimates, and learning objectives

IMPORTANT INSTRUCTIONS:
- Be realistic and constructive in your scoring - most notes should score 2-3 in most categories
- Only give 4s for truly exceptional content in that category
- Only give 1s when the category is completely missing
- If the opening/closing are scored 1-2, improve them to at least level 3 quality
- Fix any obvious spelling or grammar errors
- Base ALL feedback strictly on what is written - do not add assumed information
- Your comments should reference specific parts of the original note when possible
- DO NOT add greetings like "Hi!" or "Hello!" to the improved note - start naturally with the content
- Keep the improved note professional and appropriate for parent communication

RESPONSE FORMAT:

IMPROVED NOTE:
[Your improved version here - only modify if opening/closing need improvement or there are errors. Do not add artificial greetings.]

EVALUATION:
| Category | Score | Comments |
|----------|-------|----------|
| Intro | [1-4] | [Specific feedback based on what's in the note] |
| What was covered | [1-4] | [Specific feedback based on what's in the note] |
| Strengths | [1-4] | [Specific feedback based on what's in the note] |
| Weaknesses | [1-4] | [Specific feedback based on what's in the note] |
| Energy | [1-4] | [Specific feedback based on what's in the note] |
| Preparation | [1-4] | [Specific feedback based on what's in the note] |
| Progress | [1-4] | [Specific feedback based on what's in the note] |
| Next session | [1-4] | [Specific feedback based on what's in the note] |
| Closing | [1-4] | [Specific feedback based on what's in the note] |
| Homework | [1-4] | [Specific feedback based on what's in the note] |

OVERALL SCORE: [Average rounded to 1 decimal]/4.0`;

// Main AI Evaluation Function
const performAIEvaluation = async (sessionNote, userEmail) => {
  try {
    // Security checks
    validateNote(sessionNote);
    await checkUsageLimit(userEmail);
    checkRateLimit();
    
    // Production implementation with encrypted API key
    const keyManager = new SecureAPIKeyManager();
    const apiKey = await keyManager.decryptAPIKey(ENCRYPTED_API_KEY);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4.1',
        messages: [
          {
            role: 'user',
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
    
  } catch (error) {
    console.error('AI Evaluation error:', error);
    throw error;
  }
};

// Simulate AI response for demo purposes
const simulateAIResponse = (sessionNote) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const response = `IMPROVED NOTE:
Today I enjoyed working with the student on algebra concepts. We focused on quadratic equations and factoring techniques. The student showed understanding when working through the example problems.

During our session, we covered three main areas: factoring by grouping, factoring trinomials, and solving quadratic equations using the quadratic formula. The student grasped these concepts and was able to apply them to practice problems with some guidance.

The student's strengths were evident in their analytical thinking. They consistently checked their work by substituting solutions back into the original equations. They also asked questions about when to use different factoring methods.

One area we need to continue working on is speed and confidence with basic arithmetic operations. Sometimes the student would hesitate with simple multiplication or division. I recommend practicing multiplication tables and basic operations at home.

The student came prepared today with completed homework. Their energy level was positive throughout the session, asking questions about the material.

Progress was made today in understanding the connection between factoring and solving equations. The student solved most practice problems with guidance.

For homework, I've assigned practice problems from Chapter 9, focusing on factoring techniques. These should be completed by our next session on Thursday at 3:00 PM.

I enjoyed working with this student today and look forward to our continued progress in algebra.

EVALUATION:
| Category | Score | Comments |
|----------|-------|----------|
| Intro | 3 | Personal opening with warmth but could include more specific enjoyment details |
| What was covered | 3 | Good detail about content with some insight into student understanding |
| Strengths | 3 | Clear strengths mentioned with specific examples |
| Weaknesses | 3 | Specific weaknesses identified with improvement suggestions |
| Energy | 2 | Basic mention of energy level but lacks detailed description |
| Preparation | 2 | Basic mention of preparation but could include more specific examples |
| Progress | 2 | Basic mention of progress but lacks specific quantifiable details |
| Next session | 3 | Clear mention with specific time but could include more detailed plans |
| Closing | 2 | Basic personal closing but could express more specific enjoyment |
| Homework | 2 | Homework mentioned but lacks specific details and time estimates |

OVERALL SCORE: 2.5/4.0`;
      
      resolve(response);
    }, 2000); // Simulate API delay
  });
};

// Parse AI response to extract improved note and evaluation
const parseAIResponse = (response) => {
  const improvedNoteMatch = response.match(/IMPROVED NOTE:\s*([\s\S]*?)\s*EVALUATION:/);
  const evaluationMatch = response.match(/EVALUATION:\s*([\s\S]*?)\s*OVERALL SCORE:/);
  const overallScoreMatch = response.match(/OVERALL SCORE:\s*([\d.]+)\/4\.0/);
  
  const improvedNote = improvedNoteMatch ? improvedNoteMatch[1].trim() : '';
  const evaluationTable = evaluationMatch ? evaluationMatch[1].trim() : '';
  const overallScore = overallScoreMatch ? parseFloat(overallScoreMatch[1]) : 0;
  
  // Parse the table into structured data
  const evaluationData = [];
  const tableRows = evaluationTable.split('\n')
    .filter(row => row.includes('|') && !row.includes('Category'))
    .filter(row => !row.match(/^\s*\|[\s\-|]+\|\s*$/)); // Filter out separator rows with dashes
  
  tableRows.forEach(row => {
    const cells = row.split('|').map(cell => cell.trim()).filter(cell => cell);
    if (cells.length >= 3) {
      evaluationData.push({
        category: cells[0],
        score: parseInt(cells[1]) || 0,
        comments: cells[2]
      });
    }
  });
  
  return {
    improvedNote,
    evaluationData,
    overallScore
  };
};

// Export functions for use in popup.js
window.AIEvaluation = {
  performAIEvaluation,
  parseAIResponse,
  getCurrentUsage,
  SecureAPIKeyManager
}; 