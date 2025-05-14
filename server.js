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

// Debug log for startup
console.log('🔧 Middleware and routes loading...');

// Routes
app.use('/contacts', (req, res, next) => {
  console.log('📡 /contacts route hit');
  next();
}, contactsRoutes);

// Serve front-end index.html
app.get('/', (req, res) => {
  console.log('📄 Serving index.html from /public');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    mongoose.connection.db.listCollections().toArray((err, collections) => {
      if (err) {
        console.error('⚠️ Error listing Mongo collections:', err);
      } else {
        console.log('📦 Mongo collections:', collections.map(c => c.name));
      }
    });
  })
  .catch(err => {
    console.error('❌ Failed to connect to MongoDB');
    console.error(err);
    process.exit(1); // Exit on DB failure
  });

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT} or deployed port ${PORT}`);
});