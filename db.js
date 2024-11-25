const mongoose = require('mongoose');

// MongoDB URI (can be set in environment variables)
const mongoURI = process.env.MONGODB_URI || 'mongodb://root:example@localhost:27017/?authSource=admin';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB Connection Error:', err));

// Export mongoose
module.exports = mongoose;
