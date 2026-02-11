const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller');


router.route('/').get(authController.home); //Route for home page
router.route('/register').post(authController.register); // Route for user registration

// Example route for all events page
router.route('/events').get(authController.events);

module.exports = router;