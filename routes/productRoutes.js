const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');
const { validateProduct, handleValidationErrors } = require('../middleware/validationMiddleware');

// Product routes...!

// Get all products with pagination and filtering
router.get('/', productController.getAllProducts);

// Get product by ID
router.get('/:id', productController.getProductById);

// Create a new product (requires admin role)
router.post(
  '/',
  authMiddleware.authorizeRoles('admin'),
  uploadMiddleware.array('images', 5),
  validateProduct,
  handleValidationErrors,
  productController.createProduct
);

// Update product by ID (requires admin role)
router.put(
  '/:id',
  authMiddleware.authorizeRoles('admin'),
  validateProduct,
  handleValidationErrors,
  productController.updateProduct
);

// Delete product by ID (requires admin role)
router.delete(
    '/:id', 
    authMiddleware.authorizeRoles('admin'), 
    productController.deleteProduct
    );

module.exports = router;
