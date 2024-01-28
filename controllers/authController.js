const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('dotenv').config().parsed;
const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const authController = {
  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      // Check if the user exists
      const user = await UserModel.getUserByUsername(username);

      // Check if the password is correct
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate a JWT token
      const token = jwt.sign({ username: user.username, roles: user.roles }, JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({ token });
    } catch (error) {
      console.error('Error in login:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  register: async (req, res) => {
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
        roles: ['user'], // You can customize the roles as needed
      };

      const userId = await UserModel.createUser(newUser);

      res.status(201).json({ message: 'User registered successfully', userId });
    } catch (error) {
      console.error('Error in register:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

module.exports = authController;
