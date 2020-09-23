var express = require('express');
var router = express.Router();

const {to} = require('await-to-js')
const ShoppingCart = require('./../controllers/shoppingCart_c')
const authenticate = require('./../controllers/auth')

router.get('/', authenticate, async (req, res) => {
    let err, result
    [err, result] = await to(ShoppingCart.showCart(req.user))
    if (err) {
        return res.json({
            'data': null,
            'error': {
                'message': err.message
            }
        })
    }
    return res.json(result)
})

router.post('/add', authenticate, async (req, res) => {
    let err, result
    [err, result] = await to(ShoppingCart.addItem(req))
    if (err) {
        return res.json({
            'data': null,
            'error': {
                'message': err.message
            }
        })
    }
    return res.json(result)
})

router.put('/qty', authenticate, async (req, res) => {
    let err, result
    [err, result] = await to(ShoppingCart.updateQty(req))
    if (err) {
        return res.json({
            'data': null,
            'error': {
                'message': err.message
            }
        })
    }
    return res.json(result)
})

router.delete('/removeProduct', authenticate, async (req, res) => {
    let err, result
    [err, result] = await to(ShoppingCart.removeItem(req))
    if (err) {
        return res.json({
            'data': null,
            'error': {
                'message': err.message
            }
        })
    }
    return res.json(result)
})

router.get('/totalAmount', authenticate, async (req, res) => {
    let err, result
    [err, result] = await to(ShoppingCart.getAmount(req))
    if (err) {
        return res.json({
            'data': null,
            'error': {
                'message': err.message
            }
        })
    }
    return res.json(result)
})

router.post('/checkout', authenticate, async (req, res) => {
    let err, result
    [err, result] = await to(ShoppingCart.checkOut(req))
    if (err) {
        return res.json({
            'data': null,
            'error': {
                'message': err.message
            }
        })
    }
    return res.json(result)
})

module.exports = router