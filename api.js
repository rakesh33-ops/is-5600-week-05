const express = require('express');
const Product = require('./models/products');  // Ensure this is the correct path to your Product model
const router = express.Router();

// Route to add a new product
router.post('/products', async (req, res) => {
  try {
    const { name, description, image } = req.body;

    // Validate that name and image are provided
    if (!name || !image) {
      return res.status(400).json({ error: 'Name and image are required fields.' });
    }

    // Create a new product with the provided data
    const newProduct = new Product({
      name,
      description,
      image,
    });

    // Save the product to the database
    await newProduct.save();

    // Return the newly created product
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Error saving product:', err);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// Export the router to use in app.js
module.exports = router;
