const express = require('express');
const router = express.Router();

const contactContoller = require('../controllers/contacts');

router.get('/', contactContoller.getAll);

router.get('/:id', contactContoller.getSingle);

module.exports = router;