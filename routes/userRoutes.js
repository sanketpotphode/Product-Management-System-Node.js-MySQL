const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
// const { validateUser, handleValidationErrors } = require('../middleware/validationMiddleware');

// User routes

// Get all user profiles (requires token authentication)
router.get('/', userController.getAllUserProfiles);

// Get user profile by ID (requires token authentication)
router.get('/:userId', userController.getUserProfileById);

// Get user profile (requires token authentication)
router.get('/profile', userController.getUserProfile);

// Update user profile (requires token authentication)
router.put('/update', userController.updateUserProfile);

// Delete user profile (requires token authentication)
router.delete('/delete', userController.deleteUserProfile);

// User registration
router.post('/register', userController.registerUser);

// User login
router.post('/login', userController.loginUser);

module.exports = router;
