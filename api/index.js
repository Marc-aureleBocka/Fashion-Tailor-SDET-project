// Vercel serverless function - handles all API routes
// This file is automatically detected by Vercel as a serverless function
const app = require('../server/index.js');

// Export the Express app - Vercel will handle it as a serverless function
module.exports = app;
