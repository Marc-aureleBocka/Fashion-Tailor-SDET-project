// Vercel serverless function - handles all API routes
const app = require('../server/index.js');

// Export handler for Vercel serverless functions
module.exports = (req, res) => {
  return app(req, res);
};
