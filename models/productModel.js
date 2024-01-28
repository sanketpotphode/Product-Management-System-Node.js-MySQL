const db = require('../utils/db');
const { logAsync } = require('../utils/logger');

class ProductModel {

  // // Model function to get all products
  // static getAllProducts() {
  //   return new Promise((resolve, reject) => {
  //     const queryString = 'SELECT * FROM products WHERE status = 1';
  //     db.query(queryString, (error, results) => {
  //       if (error) {
  //         // logAsync('error', `Error in getAllProducts: ${error.message}`);
  //         reject(error);
  //       } else {
  //         resolve(results);
  //       }
  //     });
  //   });
  // };

  // Model function to get all products with pagination and optional filters
  static getAllProducts(offset = 0, limit = 10, title = '', priceFrom = 0, priceTo = Number.MAX_VALUE, manufacturer = '') {
    // Base query
    let queryString = 'SELECT * FROM products WHERE status = 1';

    // Filters
    const filters = [];
    if (title.trim() !== '') filters.push(`title LIKE '%${title.trim()}%'`);
    if (priceFrom || priceTo) filters.push(`price >= ${priceFrom || 0} AND price <= ${priceTo || Number.MAX_VALUE}`);
    if (manufacturer.trim() !== '') filters.push(`manufacturer LIKE '%${manufacturer.trim()}%'`);

    // Add filters to the query
    if (filters.length > 0) {
      queryString += ` AND ${filters.join(' AND ')}`;
    }

    // Add pagination
    queryString += ' LIMIT ? OFFSET ?';

    // Execute query
    const params = [limit, offset];

    return new Promise((resolve, reject) => {
      db.query(queryString, params, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };

  // Model function to get a user by user id
  static getProductById = (productId) => {
    return new Promise(async (resolve, reject) => {
      await db.query('SELECT * FROM products WHERE status = 1 AND id = ?', [productId], (error, results) => {
        if (error) {
          // logAsync('error', `Error in getProductById: ${error.message}`);
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  };

  static createProduct = (productData) => {
    return new Promise(async (resolve, reject) => {
      // Implement query to create a product
      const queryString = 'INSERT INTO products SET ?';
      await db.query(queryString, productData, (error, results) => {
        if (error) {
          // logAsync('error', `Error in createProduct: ${error.message}`);
          reject(error);
        } else {
          // logAsync('info', `Product created: ${productData.name}`);
          resolve(results);
        }
      });
    });

  };

  // static updateProduct(id, productData) {
  //   return new Promise(async (resolve, reject) => {
  //     // Implement query to update a product by ID
  //     const queryString = 'UPDATE products SET ? WHERE id = ?';
  //     await db.query(queryString, productData, (error, results) => {
  //       if (error) {
  //         // logAsync('error', `Error in updateProduct: ${error.message}`);
  //         reject(error);
  //       } else {
  //         // logAsync('info', `Product updated: ${productData.name}`);
  //         resolve(results);
  //       }
  //     });
  //   });
  // };

  static updateProduct(id, productData) {

    // Filter out null or undefined values from productData
    const updatedFields = Object.fromEntries(
      Object.entries(productData).filter(([_, value]) => value !== null && value !== undefined && value !== '')
    );

    if (Object.keys(updatedFields).length === 0) {
      // If there are no valid fields to update, reject the promise
      return Promise.reject(new Error('No valid fields to update'));
    }

    return new Promise(async (resolve, reject) => {
      // Implement query to update a product by ID
      const queryString = 'UPDATE products SET ? WHERE id = ?';
      await db.query(queryString, [updatedFields, id], (error, results) => {
        if (error) {
          // logAsync('error', `Error in updateProduct: ${error.message}`);
          reject(error);
        } else {
          // logAsync('info', `Product updated (ID: ${id}): ${Object.keys(updatedFields).join(', ')}`);
          resolve(results);
        }
      });
    });
  };

  static deleteProduct(productId) {
    return new Promise(async (resolve, reject) => {
      // Implement query to delete a product by ID
      const queryString = 'DELETE FROM products WHERE id = ?';
      await db.query(queryString, [productId], (error, results) => {
        if (error) {
          // logAsync('error', `Error in deleteProduct: ${error.message}`);
          reject(error);
        } else {
          // logAsync('info', `Product deleted: ${productData.name}`);
          resolve(results);
        }
      });
    });
  };

}

module.exports = ProductModel;
