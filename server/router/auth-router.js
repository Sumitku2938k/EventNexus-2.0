const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller');
const { signUpSchema } = require('../validator/auth-validator');
const validate = require('../middlewares/validate-middleware');

router.route('/').get(authController.home); //Route for home page
router.route('/register').post(validate(signUpSchema), authController.register); // Route for user registration
router.route('/login').post(authController.login); // Route for user login

module.exports = router;