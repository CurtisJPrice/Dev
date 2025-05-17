const express = require('express');
const router = express.Router();
const { getContacts, getContactById } = require('../controllers/contactsController');

// Route to get all contacts
router.get('/', getContacts);

// Route to get a single contact
router.get('/:id', getContactById);

module.exports = router;