var express = require('express');
var router = express.Router();

const {to} = require('await-to-js')
const Orders = require('./../controllers/orders_c')
const authenticate = require('./../controllers/auth')

router.get('/', authenticate, Orders.getOrders)

router.post('/', authenticate, Orders.newOrder)

module.exports = router