const express = require('express');
const router = express.Router();
const events = [
  { _id: '1', name: 'Event 1', date: '2025-03-15', location: 'Location 1', description: 'Sample event 1 description' },
  { _id: '2', name: 'Event 2', date: '2025-04-20', location: 'Location 2', description: 'Sample event 2 description' },
];
router.get('/', (req, res) => {
  res.json(events);
});
router.get('/:id', (req, res) => {
  const event = events.find((e) => e._id === req.params.id);
  if (!event) {
    return res.status(404).send('Event not found');
  }
  res.json(event);
});
router.post('/', (req, res) => {
  const { name, date, location, description } = req.body;
  const newEvent = { _id: (events.length + 1).toString(), name, date, location, description };
  events.push(newEvent);
  res.status(201).json(newEvent);
});

module.exports = router;
