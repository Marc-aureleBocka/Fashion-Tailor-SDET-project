const express = require('express');
const auth = require('../middleware/auth');
const Outfit = require('../models/Outfit');
const WardrobeItem = require('../models/WardrobeItem');

const router = express.Router();

// Get all outfits for user
router.get('/', auth, async (req, res) => {
  try {
    const outfits = await Outfit.find({ userId: req.user._id })
      .populate('itemIds')
      .sort({ createdAt: -1 });
    res.json(outfits);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get outfit by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const outfit = await Outfit.findOne({ _id: req.params.id, userId: req.user._id })
      .populate('itemIds');
    if (!outfit) {
      return res.status(404).json({ message: 'Outfit not found' });
    }
    res.json(outfit);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create outfit
router.post('/', auth, async (req, res) => {
  try {
    const { name, style, itemIds } = req.body;
    
    // Verify all items belong to user
    if (itemIds && itemIds.length > 0) {
      const items = await WardrobeItem.find({
        _id: { $in: itemIds },
        userId: req.user._id,
      });
      if (items.length !== itemIds.length) {
        return res.status(400).json({ message: 'Some items not found or do not belong to user' });
      }
    }

    const outfit = new Outfit({
      userId: req.user._id,
      name,
      style: style || '',
      itemIds: itemIds || [],
    });
    await outfit.save();
    
    const populatedOutfit = await Outfit.findById(outfit._id).populate('itemIds');
    res.status(201).json(populatedOutfit);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Generate outfit from wardrobe
router.post('/generate', auth, async (req, res) => {
  try {
    const { style, categories } = req.body;
    const wardrobeItems = await WardrobeItem.find({ userId: req.user._id });
    
    if (wardrobeItems.length === 0) {
      return res.status(400).json({ message: 'No items in wardrobe' });
    }

    // Simple outfit generation algorithm
    const selectedItems = [];
    const usedCategories = new Set();
    
    const categoryPriority = categories || ['shirt', 'pants', 'shoes', 'jacket', 'accessories'];
    
    for (const category of categoryPriority) {
      const availableItems = wardrobeItems.filter(
        item => item.category === category && !usedCategories.has(category)
      );
      if (availableItems.length > 0) {
        const randomItem = availableItems[Math.floor(Math.random() * availableItems.length)];
        selectedItems.push(randomItem._id);
        usedCategories.add(category);
      }
    }

    if (selectedItems.length === 0) {
      return res.status(400).json({ message: 'No suitable items found for outfit' });
    }

    const outfit = new Outfit({
      userId: req.user._id,
      name: `Generated Outfit - ${new Date().toLocaleDateString()}`,
      style: style || 'casual',
      itemIds: selectedItems,
    });
    await outfit.save();
    
    const populatedOutfit = await Outfit.findById(outfit._id).populate('itemIds');
    res.status(201).json(populatedOutfit);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update outfit
router.put('/:id', auth, async (req, res) => {
  try {
    const outfit = await Outfit.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    ).populate('itemIds');
    if (!outfit) {
      return res.status(404).json({ message: 'Outfit not found' });
    }
    res.json(outfit);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete outfit
router.delete('/:id', auth, async (req, res) => {
  try {
    const outfit = await Outfit.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!outfit) {
      return res.status(404).json({ message: 'Outfit not found' });
    }
    res.json({ message: 'Outfit deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

