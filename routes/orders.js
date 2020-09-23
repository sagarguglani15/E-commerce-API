var express = require('express');
var router = express.Router();

const {to} = require('await-to-js')
const Orders = require('./../controllers/orders_c')
const authenticate = require('./../controllers/auth')

router.get('/', authenticate, async (req, res) => {
    let err, result
    [err, result] = await to(Orders.getOrders(req.user))
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

router.post('/', authenticate, async (req, res) => {
    let err, result
    [err, result] = await to(Orders.newOrder(req))
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