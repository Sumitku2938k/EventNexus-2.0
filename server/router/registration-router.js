const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registration-controller');
const authMiddleware = require('../middlewares/auth-middleware');

// Get all registrations for the currently authenticated user
router.route('/me').get(authMiddleware, registrationController.getMyRegistrations);

// Check if user is registered for a specific event
router.route('/check/:eventId').get(authMiddleware, registrationController.checkRegistration);

module.exports = router;
