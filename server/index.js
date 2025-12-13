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

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

