const express = require('express');
const router = express.Router();

// Example route for home page
router.route('/').get((req, res) => {
  res.status(200).send('Welcome to EventNexus API');
});

// Example route for all events page
router.route('/events').get((req, res) => {
  res.status(200).json({ message: 'Events endpoint' });
});


module.exports = router;