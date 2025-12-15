const express = require('express');
const auth = require('../middleware/auth');
const ImportedInspiration = require('../models/ImportedInspiration');

const router = express.Router();

// Get all inspirations for user
router.get('/', auth, async (req, res) => {
  try {
    const inspirations = await ImportedInspiration.find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    res.json(inspirations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get inspiration by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const inspiration = await ImportedInspiration.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!inspiration) {
      return res.status(404).json({ message: 'Inspiration not found' });
    }
    res.json(inspiration);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Import inspiration (image URL or link)
router.post('/', auth, async (req, res) => {
  try {
    const { imageUrl, name, genre, extractedItems } = req.body;

    const inspiration = new ImportedInspiration({
      userId: req.user._id,
      imageUrl,
      name,
      genre,
      extractedItems: extractedItems || [],
    });
    await inspiration.save();

    res.status(201).json(inspiration);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update inspiration
router.put('/:id', auth, async (req, res) => {
  try {
    const inspiration = await ImportedInspiration.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!inspiration) {
      return res.status(404).json({ message: 'Inspiration not found' });
    }
    res.json(inspiration);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete inspiration
router.delete('/:id', auth, async (req, res) => {
  try {
    const inspiration = await ImportedInspiration.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!inspiration) {
      return res.status(404).json({ message: 'Inspiration not found' });
    }
    res.json({ message: 'Inspiration deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

