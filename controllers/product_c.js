const {to} = require('await-to-js')

const database = require('./../src/lib/database/database')
const logger = require('./../src/lib/logger/winston')
const reviewVal = require('./../src/lib/Payload Validation/validate_joi')
const productVal = require('./../src/lib/Payload Validation/validate_joi')

const getProducts = async (params) => {
    try {
        let err, result

        if (params.product_id) {
            [err, result] = await to(database.product_model.findAll({
                where: {
                    id: params.product_id
                }
            }))
            if (err) {
                throw new Error(err.message)
            }

            if (!result[0]) {
                throw new Error('No product found for this id!')
            }

            return {
                'data': result,
                'error': null
            }
        } else if (params.category_id) {
            [err, result] = await to(database.product_model.findAll({
                where: {
                    category_id: params.category_id
                }
            }))
            if (err) {
                throw new Error(err.message)
            }

            if (!result[0]) {
                throw new Error('No product found for this category id!')
            }

            return {
                'data': result,
                'error': null
            }
        } else {
            [err, result] = await to(database.product_model.findAll())
            if (err) {
                throw new Error(err.message)
            }

            return {
                'data': result,
                'error': null
            }
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

const postProduct = async (params) => {
    try {
        let err, result

        [err, result] = await to(productVal.newProduct.validateAsync(params))
        if (err) {
            throw new Error(err.message)
        }

        [err, result] = await to(database.product_model.create(params))
        if (err) {
            throw new Error(err.message)
        }

        return {
            'data': {"Success": "Product Added"},
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

const postReview = async (params) => {
    try {
        let err, result

        [err, result] = await to(reviewVal.newReview.validateAsync(params))
        if (err) {
            throw new Error(err.message)
        }

        [err, result] = await to(database.product_model.findAll({
            where: {
                id: params.product_id
            }
        }))
        if (err) {
            throw new Error(err.message)
        }
        if (!result[0]) {
            throw new Error('No product exists with this id !')
        }

        [err, result] = await to(database.review_model.create(params))
        if (err) {
            throw new Error(err.message)
        }

        return {
            'data': {"Success": "Review added!"},
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

const getReview = async (params) => {
    try {
        let err, result
        [err, result] = await to(database.review_model.findAll({
            where: {
                product_id: params.product_id
            }
        }))
        if (err) {
            throw new Error(err.message)
        }
        if (!result[0]) {
            throw new Error('No review found for this product id!')
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

module.exports = {getProducts, postProduct, postReview, getReview}