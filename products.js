const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'], // Validation for name
  },
  image: {
    type: String,
    required: [true, 'Product image is required'], // Validation for image
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'], // Validation for price
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  },
});

// Create Product model from schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
