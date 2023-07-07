const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop');


router.get('/',shopController.getIndex);

router.get('/products',shopController.getProducts);

router.get('/products/:ID',shopController.getProduct);

router.get('/cart',shopController.getCart);

router.post('/cart/:productId', shopController.postCart);

router.post('/cart-delete-item/:productId', shopController.postCartDeleteProduct);

router.get('/orders',shopController.getOrders);

router.get('/checkout',shopController.getCheckOut);

module.exports = router;
