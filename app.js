const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize dotenv for environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware to parse incoming requests
app.use(cors());  // Enable Cross-Origin Requests (if needed)
app.use(bodyParser.json());  // Parse JSON bodies

// Static folder to serve images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://root:example@localhost:27017/?authSource=admin',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.log('Error connecting to MongoDB:', err);
});

// Import routes
const apiRoutes = require('./api');
app.use('/api', apiRoutes);

// Root route for checking server status
app.get('/', (req, res) => {
  res.send('API is working!');
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
