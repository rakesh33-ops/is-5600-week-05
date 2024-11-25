const express = require('express');
const Order = require('../models/order');  // Ensure you have a model for orders
const router = express.Router();

// Route to add a new order
router.post('/orders', async (req, res) => {
  try {
    const { productId, quantity, totalPrice, customerName, shippingAddress } = req.body;

    // Validate the required fields
    if (!productId || !quantity || !totalPrice || !customerName || !shippingAddress) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new order with the provided data
    const newOrder = new Order({
      productId,
      quantity,
      totalPrice,
      customerName,
      shippingAddress,
      status: 'Pending',  // Default status
    });

    // Save the new order to the database
    await newOrder.save();

    // Return the newly created order
    res.status(201).json(newOrder);
  } catch (err) {
    console.error('Error saving order:', err);
    res.status(500).json({ error: 'Failed to add order' });
  }
});

// Route to get all orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    console.error('Error retrieving orders:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Route to get an order by ID
router.get('/orders/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (err) {
    console.error('Error retrieving order:', err);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// Export the router to use in app.js
module.exports = router;
