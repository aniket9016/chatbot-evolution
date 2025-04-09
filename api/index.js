// Simple API server for Vercel deployment
const express = require('express');
const path = require('path');
const app = express();

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Basic API endpoint
app.get('/api/hello', (req, res) => {
  res.json({ 
    message: 'Hello from Chatbot Evolution API!',
    timestamp: new Date().toISOString() 
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'API is running',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV
  });
});

// For Vercel deployment - handle other routes with a simple response
app.get('*', (req, res) => {
  res.json({
    message: 'Welcome to the Chatbot Evolution API',
    endpoints: ['/api/hello', '/api/health'],
    timestamp: new Date().toISOString()
  });
});

// Listen if not in Vercel environment
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export the Express API
module.exports = app;