const mongoose = require('mongoose');

const importedInspirationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  extractedItems: {
    type: [mongoose.Schema.Types.Mixed],
    default: [],
  },
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

