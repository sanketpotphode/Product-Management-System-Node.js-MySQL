const jwt = require('../utils/jwtService');
const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const { validateUser, handleValidationErrors } = require('../middleware/validationMiddleware');

const userController = {

  getAllUserProfiles: async (req, res) => {
    try {
      // Get all user profiles
      const allUsers = await UserModel.getAllUsers();
      res.status(200).json(allUsers);
    } catch (error) {
      console.error('Error in getAllUserProfiles:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getUserProfile: async (req, res) => {
    const userId = req.user.id;

    try {
      const user = await UserModel.getUserById(userId);
      res.status(200).json(user);
    } catch (error) {
      console.error('Error in getUserProfile:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getUserProfileById: async (req, res) => {
    const userId = req.params.userId;

    try {
      const user = await UserModel.getUserById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error('Error in getUserProfileById:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  updateUserProfile: async (req, res) => {
    const userId = req.user.id;
    const { username, password } = req.body;

    try {
      // Update user data
      const userData = {
        username,
        // Hash the new password if provided
        password: password ? await bcrypt.hash(password, 10) : undefined,
      };

      await UserModel.updateUser(userId, userData);
      res.status(200).json({ message: 'User profile updated successfully', userId });
    } catch (error) {
      console.error('Error in updateUserProfile:', error.message);
      res.status(404).json({ message: 'User not found' });
    }
  },

  deleteUserProfile: async (req, res) => {
    const userId = req.user.id;

    try {
      await UserModel.deleteUser(userId);
      res.status(200).json({ message: 'User deleted successfully', userId });
    } catch (error) {
      console.error('Error in deleteUserProfile:', error.message);
      res.status(404).json({ message: 'User not found' });
    }
  },

  loginUser: async (req, res) => {
    const { username, password } = req.body;

    // Validate the login data
    const validateLogin = [
      validateUser.find((validation) => validation.field === 'username'),
      validateUser.find((validation) => validation.field === 'password'),
    ];

    // Check for validation errors
    // const validationErrors = handleValidationErrors(req, validateLogin);
    // if (validationErrors) {
    //   return res.status(400).json({ errors: validationErrors });
    // }

    try {
      // Authenticate user
      const user = await UserModel.loginUser(username, password);

      //console.log(user);

      // Generate JWT token
      const token = jwt.generateToken({ id: user.id, username: user.username , role : user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error in loginUser:', error.message);
      res.status(401).json({ message: 'Invalid credentials' });
    }
  },


  validateUser: [...validateUser], // Validation middleware for user registration

  registerUser: async (req, res) => {
    const { username, password } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await UserModel.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = {
        username,
        password: hashedPassword,
        role: ['user'],
      };

      const userId = await UserModel.createUser(newUser);

      res.status(201).json({ message: 'User registered successfully', userId });
    } catch (error) {
      console.error('Error in registerUser:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

module.exports = userController;
