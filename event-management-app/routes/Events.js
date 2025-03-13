const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Create Event
router.post('/create', async (req, res) => {
    const { title, description, date, location, createdBy } = req.body;
    
    try {
        const newEvent = new Event({ title, description, date, location, createdBy });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(400).json({ message: 'Error creating event' });
    }
});

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        res.status(400).json({ message: 'Error fetching events' });
    }
});

module.exports = router;
