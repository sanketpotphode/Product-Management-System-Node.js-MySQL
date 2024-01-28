const db = require('../utils/db');
const bcrypt = require('bcrypt');
const { logAsync } = require('../utils/logger');

class UserModel {

  // Model function to get all users
  static getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
      await db.query('SELECT * FROM users WHERE status = 1', (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };

  // Model function to get a user by username
  static getUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
      const queryString = 'SELECT * FROM users WHERE username = ?';
      db.query(queryString, [username], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.length > 0 ? results[0] : null);
        }
      });
    });
  };

  // Model function to get a user by user id
  static getUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
      await db.query('SELECT * FROM users WHERE status = 1 AND id = ?', [userId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  };

  // Model function to create a new user
  static createUser = (userData) => {
    return new Promise(async (resolve, reject) => {
      await db.query('INSERT INTO users SET ?', userData, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };

  // Model function to update user details
  static updateUser = (userId, updatedUserData) => {
    return new Promise(async (resolve, reject) => {
      await db.query('UPDATE users SET ? WHERE id = ?', [updatedUserData, userId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };

  // Model function to get a user by user id
  static deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
      await db.query('DELETE FROM users WHERE id = ?', [userId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  };

  static loginUser(username, password) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.getUserByUsername(username);

        if (!user) {
          reject(new Error('User not found'));
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          reject(new Error('Invalid password'));
        }

        // // Log the login activity asynchronously
        // await logAsync('info', `User logged in: ${username}`);

        resolve(user);
      } catch (error) {
        // await logAsync('error', `Error in loginUser: ${error.message}`);
        reject(error);
      }
    });
  }

  static registerUser(username, password, role) {
    return new Promise(async (resolve, reject) => {
      try {
        // Check if the user already exists
        const existingUser = await this.getUserByUsername(username);
        if (existingUser) {
          reject(new Error('User already exists'));
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = {
          username,
          password: hashedPassword,
          role
        };

        const userId = await this.createUser(newUser);

        // Log the registration activity asynchronously
        await logAsync('info', `User registered: ${username}`);

        resolve(userId);
      } catch (error) {
        await logAsync('error', `Error in registerUser: ${error.message}`);
        reject(error);
      }
    });
  }

}

module.exports = UserModel;
