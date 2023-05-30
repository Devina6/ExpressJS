const router = express.Router();
const express = require('express');
const contactController = require('../controllers/contact');

router.get('/contact',contactController.getContact);

router.post('/contact',contactController.postContact);


module.exports = router;
