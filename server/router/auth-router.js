const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller');

router.route('/').get(authController.home); //Route for home page
router.route('/register').post(authController.register); // Route for user registration
router.route('/login').post(authController.login); // Route for user login

module.exports = router;