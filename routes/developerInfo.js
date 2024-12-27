const express = require('express');
const Developer = require('../models/Developer');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const developers = await Developer.find();
        if (!developers || developers.length === 0) {
        return res.status(404).json({ message: 'Developer not found' });
        }
        res.json(developers);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
  });


module.exports = router;