const express = require('express');
const router = express.Router();
const proController = require('../controllers/professionalController')
 
router.get('/', proController.getProfessionalData);

module.exports = router;
