const {to} = require('await-to-js')

const database = require('./../src/lib/database/database')
const logger = require('./../src/lib/logger/winston')

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

        if (!params.name) {
            throw new Error('Product name is a required attribute')
        }
        if (!params.details) {
            throw new Error('Product details is a required attribute')
        }
        if (!params.price) {
            throw new Error('Product price is a required attribute')
        }
        if (!params.category_id) {
            throw new Error('Product\'s category_id is a required attribute')
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

        if (!params.product_id) {
            throw new Error('Please provide the product_id to post the review for')
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

        if (!params.review) {
            throw new Error('Review cannot be blank!')
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