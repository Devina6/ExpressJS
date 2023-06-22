const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');


router.get('/add-product',productsController.getAddProduct);

router.post('/add-product',productsController.postAddProduct);


module.exports = router;
