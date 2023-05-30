const router = express.Router();
const express = require('express');
const productsController = require('../controllers/product');


router.get('/add-product',productsController.getAddProduct);

router.post('/add-product',productsController.postAddProduct);


module.exports = router;
