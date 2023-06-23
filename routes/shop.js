const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');


router.get('/',productsController.getProduct);

router.get('/products',shopController.getProducts);

router.get('/cart',shopController.getCart);

router.get('/checkout',shopController.getCheckOut);

module.exports = router;
