const {to} = require('await-to-js')

const database = require('./../src/lib/database/database')
const logger = require('./../src/lib/logger/winston')


const getOrders = async (params) => {
    try {
        [err, result] = await to(database.order_model.findAll({
            where: {
                customer: params.username
            }
        }))
        if (err) {
            throw new Error(err.message)
        }

        return {
            'data': result,
            'error': null
        }
    } catch (err) {
        logger.error(err.message)
        return {
            'data': null,
            'error': {
                'message': err.message
            }
        }
    }
}

const newOrder = async (params) => {
    try {
        let err, result

        params.body.customer = params.user.username;
        if (!params.body.product_id) {
            throw new Error('product_id is a required attribute!')
        }
        if (!params.body.qty) {
            throw new Error('qty is a required attribute!')
        }

        if (parseInt(params.body.qty)) {
            if (parseInt(params.body.qty) < 0) {
                throw new Error("quantity must be a natural number")
            }
        } else {
            throw new Error("qty is not a valid natural number !")
        }

        [err, result] = await to(database.product_model.findAll({
            where: {
                id: params.body.product_id
            }
        }))
        if (err) {
            throw new Error(err.message)
        }
        if (!result[0]) {
            throw new Error(' no product found for this id!')
        }

        let price = result[0]['dataValues']['price'];

        [err, result] = await to(database.customer_model.findAll({
            where: {
                username: params.user.username
            }
        }))

        if (!result[0]['dataValues']['address']) {
            throw new Error('user\'s address is not updated!')
        }
        if (!result[0]['dataValues']['creditCardNumber']) {
            throw new Error('user\'s creditCardNumber is not updated!')
        }


        [err, result] = await to(database.order_model.create(params.body))
        if (err) {
            throw new Error(err.message)
        }

        return {
            'data': {
                'message': 'Order placed successfully!',
                'amount': `₹${price} x ${params.body.qty} items = ₹${price * params.body.qty}`
            }, 'error': null
        }
    } catch (err) {
        logger.error(err.message)
        return {
            'data': null,
            'error': {
                'message': err.message
            }
        }
    }
}

module.exports = {getOrders, newOrder}