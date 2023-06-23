const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop');


router.get('/',shopController.getProduct);

router.get('/products',shopController.getProducts);

router.get('/cart',shopController.getCart);

router.get('/checkout',shopController.getCheckOut);

module.exports = router;
