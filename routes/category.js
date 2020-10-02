var express = require('express');
var router = express.Router();

const {to} = require('await-to-js')
let Category = require('./../controllers/category_c');


router.get('/', Category.getCategories);

router.get('/:category_id', Category.getCategories);

router.get('/inProduct/:product_id', Category.getCategories);

router.post('/', Category.postCategory)

module.exports = router;
