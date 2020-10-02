const {to} = require('await-to-js')

const database = require('./../src/lib/database/models/order_model')
const logger = require('./../src/lib/logger/winston')
const orderVal = require('./../src/lib/Payload Validation/validate_joi')


const getOrders = async (req, res) => {
    try {
        let err, result
        [err, result] = await to(database.order_model.findAll({
            where: {
                customer: req.user.username
            }
        }))
        if (err) {
            throw new Error(err.message)
        }

        return res.json({
            'data': result,
            'error': null
        })
    } catch (err) {
        logger.error(err.message)
        return res.json({
            'data': null,
            'error': {
                'message': err.message
            }
        })
    }
}

const newOrder = async (req, res) => {
    try {
        let err, result

        [err, result] = await to(orderVal.newOrder.validateAsync(req.body))
        if (err) {
            throw new Error(err.message)
        }

        req.body.customer = req.user.username;

        [err, result] = await to(require('./../src/lib/database/models/product_model').product_model.findAll({
            where: {
                id: req.body.product_id
            }
        }))
        if (err) {
            throw new Error(err.message)
        }
        if (!result[0]) {
            throw new Error(' no product found for this id!')
        }

        let price = result[0]['dataValues']['price'];

        [err, result] = await to(require('./../src/lib/database/models/customer_model').customer_model.findAll({
            where: {
                username: req.user.username
            }
        }))

        if (!result[0]['dataValues']['address']) {
            throw new Error('user\'s address is not updated!')
        }
        if (!result[0]['dataValues']['creditCardNumber']) {
            throw new Error('user\'s creditCardNumber is not updated!')
        }


        [err, result] = await to(database.order_model.create(req.body))
        if (err) {
            throw new Error(err.message)
        }

        return res.json({
            'data': {
                'message': 'Order placed successfully!',
                'amount': `₹${price} x ${req.body.qty} items = ₹${price * req.body.qty}`
            }, 'error': null
        })
    } catch (err) {
        logger.error(err.message)
        return res.json({
            'data': null,
            'error': {
                'message': err.message
            }
        })
    }
}

module.exports = {getOrders, newOrder}