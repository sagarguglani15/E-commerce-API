var express = require('express');
var router = express.Router();

const {to} = require('await-to-js')
var Attributes = require('./../controllers/attributes_c')


router.get('/', Attributes.getAttributes);

router.get('/:attribute_id', Attributes.getAttributes);

router.get('/inProduct/:product_id', Attributes.getAttributes);

router.post('/', Attributes.postAttribute)

module.exports = router;
