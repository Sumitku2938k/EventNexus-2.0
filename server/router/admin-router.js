const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const adminMiddleware = require('../middlewares/admin-middleware');

router.route('/events/create').post(authMiddleware, adminMiddleware, adminController.createEvent); //Route for creating events

module.exports = router;