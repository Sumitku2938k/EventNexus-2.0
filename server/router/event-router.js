const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event-controller');

//Route for all events page
router.route('/').get(eventController.events);

module.exports = router;