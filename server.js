import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env file from the current working directory
dotenv.config({ path: join(process.cwd(), '.env') });

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Parse JSON bodies
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'HeyGen Streaming Avatar Demo Backend',
    status: 'running',
    endpoints: {
      'GET /api/get-access-token': 'Get streaming token from HeyGen API',
      'GET /api/get-avatar-id': 'Get avatar ID from .env file'
    }
  });
});

app.get('/api/get-avatar-id', async (req, res) => {
  try {
    // Get avatar ID from .env file
    const avatarId = process.env.HEYGEN_AVATAR_ID;

    console.log('Avatar ID from .env:', avatarId);

    if (!avatarId) {
      return res.status(500).json({ error: 'Avatar ID not found in .env file. Please set HEYGEN_AVATAR_ID.' });
    }

    res.json({ avatarId });
  } catch (error) {
    console.error('Error fetching avatar ID:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch avatar ID' });
  }
});

app.get('/api/get-access-token', async (req, res) => {
  try {
    // Get API key from .env file
    const apiKey = process.env.HEYGEN_API_KEY;

    console.log('API Key from .env:', !!apiKey);

    if (!apiKey) {
      return res.status(500).json({ error: 'API key not found in .env file. Please set HEYGEN_API_KEY.' });
    }
    
    const response = await fetch('https://api.heygen.com/v1/streaming.create_token', {
      method: 'POST',
      headers: { 
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('HeyGen API response status:', response.status);
    console.log('HeyGen API response headers:', [...response.headers.entries()]);
    
    // Check if response is ok before trying to parse JSON
    if (!response.ok) {
      const errorText = await response.text();
      console.error('HeyGen API error:', errorText);
      
      // Try to parse error as JSON, fallback to text if it fails
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = JSON.parse(errorText);
        errorMessage += `, message: ${errorData.message || errorText}`;
      } catch (e) {
        errorMessage += `, message: ${errorText || 'Unknown error'}`;
      }
      
      throw new Error(errorMessage);
    }
    
    // Check if response has content before parsing
    const contentType = response.headers.get('content-type');
    const contentLength = response.headers.get('content-length');
    
    console.log('Response Content-Type:', contentType);
    console.log('Response Content-Length:', contentLength);
    
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response:', text);
      throw new Error('Received non-JSON response from HeyGen API');
    }
    
    // Check if response is empty
    if (contentLength === '0' || !contentLength) {
      console.error('Empty response from HeyGen API');
      throw new Error('Received empty response from HeyGen API');
    }
    
    const textResponse = await response.text();
    console.log('Raw response text:', textResponse);
    
    if (!textResponse) {
      throw new Error('Empty response body from HeyGen API');
    }
    
    let data;
    try {
      data = JSON.parse(textResponse);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('Response text that failed to parse:', textResponse);
      throw new Error(`Failed to parse JSON response: ${parseError.message}`);
    }
    
    console.log('HeyGen API response data:', data);
    
    if (!data) {
      throw new Error('Empty response from HeyGen API');
    }
    
    if (!data.data || !data.data.token) {
      throw new Error('Invalid response from HeyGen API - no token found');
    }
    
    res.json({ token: data.data.token });
  } catch (error) {
    console.error('Error fetching access token:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch access token' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log('Frontend can pass API key as query parameter: /api/get-access-token?apiKey=YOUR_API_KEY');
});