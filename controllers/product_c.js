const {to} = require('await-to-js')

const database = require('./../src/lib/database/models/product_model')
const logger = require('./../src/lib/logger/winston')
const reviewVal = require('./../src/lib/Payload Validation/validate_joi')
const productVal = require('./../src/lib/Payload Validation/validate_joi')

const getProducts = async (req, res) => {
    try {
        let err, result

        if (req.params.product_id) {
            [err, result] = await to(database.product_model.findAll({
                where: {
                    id: req.params.product_id
                }
            }))
            if (err) {
                throw new Error(err.message)
            }

            if (!result[0]) {
                throw new Error('No product found for this id!')
            }

            return res.json({
                'data': result,
                'error': null
            })
        } else if (req.params.category_id) {
            [err, result] = await to(database.product_model.findAll({
                where: {
                    category_id: req.params.category_id
                }
            }))
            if (err) {
                throw new Error(err.message)
            }

            if (!result[0]) {
                throw new Error('No product found for this category id!')
            }

            return res.json({
                'data': result,
                'error': null
            })
        } else {
            [err, result] = await to(database.product_model.findAll())
            if (err) {
                throw new Error(err.message)
            }

            return res.json({
                'data': result,
                'error': null
            })
        }
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

const postProduct = async (req, res) => {
    try {
        let err, result

        [err, result] = await to(productVal.newProduct.validateAsync(req.body))
        if (err) {
            throw new Error(err.message)
        }

        [err, result] = await to(database.product_model.create(req.body))
        if (err) {
            throw new Error(err.message)
        }

        return res.json({
            'data': {"Success": "Product Added"},
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

const postReview = async (req, res) => {
    try {
        let err, result

        [err, result] = await to(reviewVal.newReview.validateAsync(req.body))
        if (err) {
            throw new Error(err.message)
        }

        [err, result] = await to(database.product_model.findAll({
            where: {
                id: req.params.product_id
            }
        }))
        if (err) {
            throw new Error(err.message)
        }
        if (!result[0]) {
            throw new Error('No product exists with this id !')
        }

        [err, result] = await to(require('./../src/lib/database/models/review_model').review_model.create(req.body))
        if (err) {
            throw new Error(err.message)
        }

        return res.json({
            'data': {"Success": "Review added!"},
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

const getReview = async (req, res) => {
    try {
        let err, result
        [err, result] = await to(require('./../src/lib/database/models/review_model').review_model.findAll({
            where: {
                product_id: req.params.product_id
            }
        }))
        if (err) {
            throw new Error(err.message)
        }
        if (!result[0]) {
            throw new Error('No review found for this product id!')
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

module.exports = {getProducts, postProduct, postReview, getReview}