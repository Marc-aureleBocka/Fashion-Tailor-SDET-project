const express = require('express');
const auth = require('../middleware/auth');
const WardrobeItem = require('../models/WardrobeItem');

const router = express.Router();

// Get all wardrobe items for user
router.get('/', auth, async (req, res) => {
  try {
    const items = await WardrobeItem.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get wardrobe item by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const item = await WardrobeItem.findOne({ _id: req.params.id, userId: req.user._id });
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add wardrobe item
router.post('/', auth, async (req, res) => {
  try {
    const { category, color, brand, imageUrl, metadata } = req.body;
    const item = new WardrobeItem({
      userId: req.user._id,
      category,
      color,
      brand: brand || '',
      imageUrl,
      metadata: metadata || {},
    });
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update wardrobe item
router.put('/:id', auth, async (req, res) => {
  try {
    const item = await WardrobeItem.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete wardrobe item
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await WardrobeItem.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get items by category
router.get('/category/:category', auth, async (req, res) => {
  try {
    const items = await WardrobeItem.find({
      userId: req.user._id,
      category: req.params.category,
    }).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

