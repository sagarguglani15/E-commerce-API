var express = require('express');
var router = express.Router();

const {to} = require('await-to-js')
const Customer = require('./../controllers/customers_c')
const authenticate = require('./../controllers/auth')

router.post('/', Customer.postCustomer)

router.post('/login', Customer.loginCustomer)

router.get('/', authenticate, Customer.getCustomer)

router.put('/address', authenticate, Customer.updateAddress)

router.put('/creditCard', authenticate, Customer.updateCreditCard)

module.exports = router