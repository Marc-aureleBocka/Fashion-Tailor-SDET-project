const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/wardrobe', require('./routes/wardrobe'));
app.use('/api/outfits', require('./routes/outfits'));
app.use('/api/inspirations', require('./routes/inspirations'));

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fashion-tailor';

// Ensure database name is included in connection string
let connectionString = MONGODB_URI;
if (connectionString.includes('mongodb+srv://') && !connectionString.includes('/fashion-tailor')) {
  // Add database name if not present
  connectionString = connectionString.replace('?', '/fashion-tailor?');
}

// MongoDB connection options optimized for serverless
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Optimize for serverless environments
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

// Connect to MongoDB
mongoose.connect(connectionString, mongooseOptions)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    // In serverless, don't crash - let the function handle it
    if (process.env.VERCEL !== '1') {
      process.exit(1);
    }
  });

const PORT = process.env.PORT || 5000;

// Only start server if not in Vercel serverless environment
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel serverless functions
module.exports = app;

