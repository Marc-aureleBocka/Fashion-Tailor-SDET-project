const mongoose = require('mongoose');

const outfitSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  style: {
    type: String,
    default: '',
  },
  itemIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WardrobeItem',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

outfitSchema.index({ userId: 1 });

module.exports = mongoose.model('Outfit', outfitSchema);

