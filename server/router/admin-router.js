const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const adminMiddleware = require('../middlewares/admin-middleware');

router.route('/events/create').post(authMiddleware, adminMiddleware, adminController.createEvent); //Route for creating events
router.route('/events/delete/:id').delete(authMiddleware, adminMiddleware, adminController.deleteEvent); //Route for deleting events
router.route('/events/update/:id').patch(authMiddleware, adminMiddleware, adminController.updateEvent); //Route for updating events

module.exports = router;