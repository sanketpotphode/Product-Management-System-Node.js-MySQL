const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateUser, handleValidationErrors } = require('../middleware/validationMiddleware');

// Authentication routes

// User login
router.post('/login', authController.login);

// User registration
router.post('/register', validateUser, handleValidationErrors, authController.register);

module.exports = router;
