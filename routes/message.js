const router = express.Router();
const express = require('express');
const contactController = require('../controllers/contact');


router.get('/message',contactController.getMessage);


module.exports = router;
