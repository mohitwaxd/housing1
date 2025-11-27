const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

// Create axios instance with better defaults
const axiosInstance = axios.create({
  timeout: 15000,
  maxRedirects: 5,
  validateStatus: function (status) {
    return status < 500; // Accept all status codes less than 500
  }
});

// Add request interceptor to add random delays (only in local development)
// Note: Removed in production to avoid unnecessary latency in serverless functions
if (process.env.NODE_ENV !== 'production' && process.env.VERCEL !== '1') {
  axiosInstance.interceptors.request.use(function (config) {
    // Add a small random delay to mimic human behavior (local dev only)
    const delay = Math.random() * 1000 + 500; // 500-1500ms
    return new Promise(resolve => {
      setTimeout(() => resolve(config), delay);
    });
  });
}

// Enable CORS for all routes with comprehensive configuration
app.use(cors({
  origin: '*', // Allow all origins (you can restrict this in production)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Accept-Language', 'Cache-Control', 'Pragma'],
  credentials: false,
  optionsSuccessStatus: 200
}));

// Handle preflight requests
app.options('*', cors());

// Parse JSON bodies
app.use(express.json());

// Proxy endpoint for Housing.com APIs (MUST be before static file serving)
app.get('/api/proxy', async (req, res) => {
  try {
    const { url } = req.query;
    
    if (!url) {
      return res.status(400).json({ error: 'URL parameter is required' });
    }

    console.log('Proxying request to:', url);

    // Try multiple approaches to bypass 403
    const approaches = [
      {
        name: 'Standard Browser Headers',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Accept-Language': 'en-US,en;q=0.9',
          'Accept-Encoding': 'gzip, deflate, br',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://housing.com/',
          'Origin': 'https://housing.com',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-site',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'DNT': '1',
          'Connection': 'keep-alive'
        }
      },
      {
        name: 'Mobile Browser Headers',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Accept-Language': 'en-US,en;q=0.9',
          'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
          'Referer': 'https://housing.com/',
          'Origin': 'https://housing.com',
          'X-Requested-With': 'XMLHttpRequest'
        }
      },
      {
        name: 'Minimal Headers',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://housing.com/'
        }
      }
    ];

    let response = null;
    let lastError = null;

    for (const approach of approaches) {
      try {
        console.log(`Trying approach: ${approach.name}`);
        
        response = await axiosInstance.get(url, {
          headers: approach.headers,
          timeout: 15000
        });

        if (response.status === 200) {
          console.log(`Success with approach: ${approach.name}`);
          break;
        } else {
          console.log(`Approach ${approach.name} returned status: ${response.status}`);
        }
      } catch (error) {
        lastError = error;
        console.log(`Approach ${approach.name} failed:`, error.message);
        continue;
      }
    }

    if (!response || response.status !== 200) {
      throw lastError || new Error('All approaches failed');
    }

    res.json(response.data);
  } catch (error) {
    console.error('Proxy error:', error.message);
    
    // Handle specific error cases
    let errorMessage = 'Proxy request failed';
    let statusCode = 500;
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const status = error.response.status;
      const data = error.response.data;
      
      console.error(`HTTP ${status}:`, data);
      
      if (status === 403) {
        errorMessage = 'Access denied by Housing.com API (403 Forbidden)';
        statusCode = 403;
      } else if (status === 429) {
        errorMessage = 'Rate limited by Housing.com API (429 Too Many Requests)';
        statusCode = 429;
      } else if (status === 404) {
        errorMessage = 'API endpoint not found (404 Not Found)';
        statusCode = 404;
      } else {
        errorMessage = `Housing.com API error: ${status}`;
        statusCode = status;
      }
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = 'No response from Housing.com API (timeout or network error)';
      statusCode = 504;
    } else {
      // Something happened in setting up the request that triggered an Error
      errorMessage = error.message;
    }
    
    res.status(statusCode).json({ 
      error: errorMessage, 
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'Local proxy server is running'
  });
});

// Test endpoint to verify Housing.com API access
app.get('/test-housing', async (req, res) => {
  try {
    const testUrl = 'https://regions.housing.com/api/v1/polygon/suggest/?service_type=rent&feature_type=locality&input=test';
    console.log('Testing Housing.com API access...');
    
    const response = await axiosInstance.get(testUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://housing.com/'
      }
    });
    
    res.json({
      status: 'success',
      message: 'Housing.com API is accessible',
      statusCode: response.status,
      data: response.data
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Housing.com API test failed',
      error: error.message
    });
  }
});

// Root route - serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'property_filter_wireframe.html'));
});

// Serve static files (your HTML file) - MUST be after API routes
app.use(express.static(path.join(__dirname)));

// Only start server if running locally (not on Vercel)
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`🚀 Local proxy server running on http://localhost:${PORT}`);
    console.log(`📁 Serving files from: ${__dirname}`);
    console.log(`🔗 Open your app at: http://localhost:${PORT}/property_filter_wireframe.html`);
    console.log(`⚡ Proxy endpoint: http://localhost:${PORT}/api/proxy?url=...`);
  });

  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server...');
    process.exit(0);
  });
}

// Export the app for Vercel serverless functions
module.exports = app;
