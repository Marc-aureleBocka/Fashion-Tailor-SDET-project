const mongoose = require('mongoose');

const wardrobeItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['shirt', 'pants', 'shoes', 'jacket', 'dress', 'accessories', 'other'],
  },
  color: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    default: '',
  },
  imageUrl: {
    type: String,
    required: true,
  },
  metadata: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {},
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

wardrobeItemSchema.index({ userId: 1 });
wardrobeItemSchema.index({ category: 1 });

module.exports = mongoose.model('WardrobeItem', wardrobeItemSchema);

