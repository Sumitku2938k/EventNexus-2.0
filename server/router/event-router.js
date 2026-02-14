const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event-controller');
const authMiddleware = require('../middlewares/auth-middleware');

//Route for all events page
router.route('/').get(authMiddleware, eventController.getAllEvents);
router.route('/:id').get(authMiddleware, eventController.getEventById); //Route for getting event details by ID

module.exports = router;