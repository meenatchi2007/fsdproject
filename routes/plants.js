const express = require('express');
const Plant = require('../models/Plant');
const { auth, adminAuth } = require('../middleware/auth');
const router = express.Router();

// Get all plants
router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};
    if (search) query.$or = [{ name: new RegExp(search, 'i') }, { category: new RegExp(search, 'i') }];
    if (category && category !== 'All') query.category = category;
    const plants = await Plant.find(query);
    res.json(plants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single plant
router.get('/:id', async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) return res.status(404).json({ message: 'Plant not found' });
    res.json(plant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add plant (Admin only)
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const plant = new Plant(req.body);
    await plant.save();
    res.status(201).json(plant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update plant (Admin only)
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const plant = await Plant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!plant) return res.status(404).json({ message: 'Plant not found' });
    res.json(plant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete plant (Admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const plant = await Plant.findByIdAndDelete(req.params.id);
    if (!plant) return res.status(404).json({ message: 'Plant not found' });
    res.json({ message: 'Plant deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
