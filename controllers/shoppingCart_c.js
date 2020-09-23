const {to} = require('await-to-js')
const Sequelize = require('sequelize')

const database = require('./../src/lib/database/database')
const logger = require('./../src/lib/logger/winston')
const Order = require('./../controllers/orders_c')

const showCart = async (params) => {
    try {
        let err, result
        [err, result] = await to(database.cartItems_model.findAll({
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

const addItem = async (params) => {
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

        [err, result] = await to(database.cartItems_model.findAll({
            where: {
                customer: params.body.customer,
                product_id: params.body.product_id
            }
        }));
        if (err) {
            throw new Error(err.message)
        }
        if (result[0]) {
            [err, result] = await to(database.cartItems_model.update({
                qty: Sequelize.literal(`qty+${params.body.qty}`)
            }, {
                where: {
                    customer: params.body.customer,
                    product_id: params.body.product_id
                }
            }))
            if (err) {
                throw new Error(err.message)
            }
        } else {
            [err, result] = await to(database.cartItems_model.create(params.body))
            if (err) {
                throw new Error(err.message)
            }
        }

        return {
            'data': {
                'message': 'product added to card successfully!'
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

const updateQty = async (params) => {
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

        [err, result] = await to(database.cartItems_model.findAll({
            where: {
                customer: params.body.customer,
                product_id: params.body.product_id
            }
        }));
        if (err) {
            throw new Error(err.message)
        }
        if (!result[0]) {
            throw new Error('no product with this id exists in the cart')
        }

        [err, result] = await to(database.cartItems_model.update({
            qty: params.body.qty
        }, {
            where: {
                customer: params.body.customer,
                product_id: params.body.product_id
            }
        }))
        if (err) {
            throw new Error(err.message)
        }

        return {
            'data': {
                'message': 'new quantity updated successfully!'
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

const removeItem = async (params) => {
    try {
        let err, result
        params.body.customer = params.user.username;

        if (!params.body.product_id) {
            throw new Error('product_id is a required attribute!')
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

        [err, result] = await to(database.cartItems_model.findAll({
            where: {
                customer: params.body.customer,
                product_id: params.body.product_id
            }
        }));
        if (err) {
            throw new Error(err.message)
        }
        if (!result[0]) {
            throw new Error('no product with this id exists in the cart')
        }

        [err, result] = await to(database.cartItems_model.destroy({
            where: {
                customer: params.body.customer,
                product_id: params.body.product_id
            }
        }))
        if (err) {
            throw new Error(err.message)
        }

        return {
            'data': {
                'message': 'product removed successfully from cart!'
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

const getAmount = async (params) => {
    try {
        let err, result
        [err, result] = await to(database.cartItems_model.findAll({
            where: {
                customer: params.user.username
            }
        }))
        if (err) {
            throw new Error(err.message)
        }

        let amount = 0;
        for (const item of result) {
            [err, result] = await to(database.product_model.findAll({
                where: {
                    id: item['dataValues']['product_id']
                }
            }))
            if (err) {
                throw new Error(err.message)
            }

            amount += result[0]['dataValues']['price'] * item['dataValues']['qty']
        }

        return {
            'data': {
                'message': `your total cart amount = ₹${amount}`
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

const checkOut = async (params) => {
    try {
        let err, result

        [err, result] = await to(getAmount(params));
        if (err) {
            throw new Error(err.message)
        }
        if (!result.data) {
            throw new Error(result.error.message)
        }

        const amount_message = result.data.message;


        [err, result] = await to(database.cartItems_model.findAll({
            where: {
                customer: params.user.username
            }
        }))
        if (err) {
            throw new Error(err.message)
        }

        let product, bill = [];
        for (const item of result) {
            product = {
                body: {
                    product_id: item['dataValues']['product_id'],
                    qty: item['dataValues']['qty']
                },
                user: {
                    username: params.user.username
                }
            };
            [err, result] = await to(Order.newOrder(product))
            if (err) {
                throw new Error(err.message)
            }
            if (!result.data) {
                throw new Error(result.error.message)
            }
            bill.push(result.data.amount);

            [err, result] = await to(removeItem(product))
            if (err) {
                throw new Error(err.message)
            }
            if (!result.data) {
                throw new Error(result.error.message)
            }
        }

        return {
            'data': {
                'message': 'orders placed successfully!',
                'bill': bill,
                'amount': amount_message
            },
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

module.exports = {showCart, addItem, updateQty, removeItem, getAmount, checkOut}