// server/routes/compounds.js

const express = require('express');
const router = express.Router();
const Compound = require('../models/Compound');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify JWT
function auth(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Access denied' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch(err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

// Get all compounds for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const compounds = await Compound.find({ user: req.user.userId });
    res.json(compounds);
  } catch(err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// Add a new compound
router.post('/', auth, async (req, res) => {
  try {
    const { name, formula, molecularWeight, details, applications } = req.body;
    const compound = new Compound({
      user: req.user.userId,
      name,
      formula,
      molecularWeight,
      details,
      applications
    });
    await compound.save();
    res.status(201).json({ message: 'Compound added successfully' });
  } catch(err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// Get a specific compound
router.get('/:id', auth, async (req, res) => {
  try {
    const compound = await Compound.findOne({ _id: req.params.id, user: req.user.userId });
    if (!compound) return res.status(404).json({ message: 'Compound not found' });
    res.json(compound);
  } catch(err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

module.exports = router;
