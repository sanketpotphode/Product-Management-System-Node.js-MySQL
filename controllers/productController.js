const ProductModel = require('../models/productModel');
const UserModel = require('../models/userModel');
const { handleValidationErrors, validateProduct } = require('../middleware/validationMiddleware');
const { upload, storage } = require('../middleware/uploadMiddleware');

const productController = {
  getAllProducts: async (req, res) => {
    const { offset, limit, title, priceFrom, priceTo, manufacturer } = req.query;

    try {
      const products = await ProductModel.getAllProducts(offset, limit, title, priceFrom, priceTo, manufacturer);
      res.status(200).json(products);
    } catch (error) {
      console.error('Error in getAllProducts:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getProductById: async (req, res) => {
    const productId = req.params.id;

    try {
      const product = await ProductModel.getProductById(productId);
      res.status(200).json(product);
    } catch (error) {
      console.error('Error in getProductById:', error.message);
      res.status(404).json({ message: 'Product not found' });
    }
  },

  createProduct: async (req, res) => {
    // Allow only admin to create products
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: 'Unauthorized. Only admins can create products.' });
    }
  
    try {
  
      // Create product data
      const { name, description, price, quantity, manufacturer, files} = req.body;
      
      //console.log(req.body);
  
      // Upload muntiple files
      upload.array('images')(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          console.error('Error in file upload:', err.message);
          return res.status(400).json({ message: 'Error in file upload', error: err.message });
        } else if (err) {
          console.error('Error in file upload:', err);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
  
        const images = files.map(file => file.path);
  
        // Create product data including images
        const productData = {
          name,
          description,
          price,
          quantity,
          manufacturer,
          images,
        };
  
        const productId = await ProductModel.createProduct(productData);
        res.status(201).json({ message: 'Product created successfully', productId });
      });
    } catch (error) {
      console.error('Error in createProduct:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  updateProduct: async (req, res) => {
    //Allow only admim to update products
    if(req.user.role != "admin"){
      return res.status(403).json({ message: 'Unauthorized. Only admins can create products.' });
    }
    const productId = req.params.id;
    const { name, description, price, quantity, manufacturer } = req.body;

    // Validate the product data
    validateProduct(req);

    // Check for validation errors
    const validationErrors = handleValidationErrors(req);
    if (validationErrors) {
      return res.status(400).json({ errors: validationErrors });
    }

    try {
      // Role-based authorization
      const user = await UserModel.getUserById(req.user.id);
      if (!user.roles.includes('admin')) {
        return res.status(403).json({ message: 'Unauthorized. Only admins can update products.' });
      }

      // Update product data
      const productData = {
        name,
        description,
        price,
        quantity,
        manufacturer,
      };

      await ProductModel.updateProduct(productId, productData);
      res.status(200).json({ message: 'Product updated successfully', productId });
    } catch (error) {
      console.error('Error in updateProduct:', error.message);
      res.status(404).json({ message: 'Product not found' });
    }
  },

  deleteProduct: async (req, res) => {
    const productId = req.params.id;

    try {
      // Role-based authorization
      const user = await UserModel.getUserById(req.user.id);
      if (!user.roles.includes('admin')) {
        return res.status(403).json({ message: 'Unauthorized. Only admins can delete products.' });
      }

      await ProductModel.deleteProduct(productId);
      res.status(200).json({ message: 'Product deleted successfully', productId });
    } catch (error) {
      console.error('Error in deleteProduct:', error.message);
      res.status(404).json({ message: 'Product not found' });
    }
  },
};

module.exports = productController;
