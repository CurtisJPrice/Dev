require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const contactsRoutes = require('./routes/contacts');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' folder
app.use(express.static('public'));

app.use(express.json());
app.use('/contacts', contactsRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('CSE341 Contacts API Running');
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});