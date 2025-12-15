const mongoose = require('mongoose');

const importedInspirationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // User-provided name for this inspiration (e.g. "Summer Streetwear Fit")
  name: {
    type: String,
    required: true,
  },
  // High-level genre / style for this inspiration (e.g. "streetwear")
  genre: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  // Reserved for future automatic analysis of the image
  extractedItems: {
    type: [mongoose.Schema.Types.Mixed],
    default: [],
  },
  // Kept only for backward compatibility; no longer used in the UI
  matchedRecommendations: {
    type: [mongoose.Schema.Types.Mixed],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

importedInspirationSchema.index({ userId: 1 });

module.exports = mongoose.model('ImportedInspiration', importedInspirationSchema);

