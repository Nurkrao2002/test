import fetch from 'node-fetch';

async function testHeyGenAPI() {
  try {
    const apiKey = 'MDllY2Q2ZTUwNjBmNGI2ZmJjYTlhYmJlZjExY2Q5ODktMTc1NzkxNjczNA==';
    
    console.log('Testing HeyGen API with key:', apiKey.substring(0, 10) + '...');
    
    const response = await fetch('https://api.heygen.com/v1/streaming.create_token', {
      method: 'POST',
      headers: { 
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', [...response.headers.entries()]);
    
    const text = await response.text();
    console.log('Response text:', text);
    
    try {
      const data = JSON.parse(text);
      console.log('Parsed JSON:', data);
    } catch (e) {
      console.log('Failed to parse JSON:', e.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

testHeyGenAPI();