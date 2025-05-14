const express = require('express');
const router = express.Router();

const contactControllers = require('../controllers/contacts');

router.get('/', contactControllers.getAll);

router.get('/:id', contactControllers.getSingle);

router.post('/', contactControllers.createContact);

router.put('/:id', contactControllers.updateContact);

router.delete('/:id', contactControllers.deleteContact);

module.exports = router;