const router = express.Router();
const express = require('express');
const productsController = require('../controllers/product');


router.get('/',productsController.getProduct);


module.exports = router;
