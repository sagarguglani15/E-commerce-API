var express = require('express');
var router = express.Router();

const {to} = require('await-to-js')
var Products = require('./../controllers/product_c')

router.get('/', Products.getProducts)

router.get('/:product_id', Products.getProducts)

router.get('/inCategory/:category_id', Products.getProducts)

router.post('/', Products.postProduct)

router.get('/:product_id/reviews', Products.getReview)

router.post('/:product_id/reviews', Products.postReview)

module.exports = router;
