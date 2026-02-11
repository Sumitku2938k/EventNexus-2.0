const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller');

// Example route for home page
router.route('/').get(authController.home);

// Example route for all events page
router.route('/events').get(authController.events);

module.exports = router;