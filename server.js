require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const contactsRoutes = require('./routes/contacts');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Routes
app.use('/contacts', contactsRoutes);

// Serve front-end index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    mongoose.connection.db.listCollections().toArray((err, collections) => {
      if (err) {
        console.error('MongoDB connection error:', err);
      } else {
        console.log('Collections:', collections);
      }
    });
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});