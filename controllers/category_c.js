const {to} = require('await-to-js')

const database = require('./../src/lib/database/models/category_model')
const logger = require('./../src/lib/logger/winston')
const catgVal = require('./../src/lib/Payload Validation/validate_joi')

const getCategories = async (req, res) => {
    try {
        let err, result

        if (req.params.category_id) {
            [err, result] = await to(database.category_model.findAll({
                where: {
                    id: req.params.category_id
                }
            }))
            if (err) {
                throw new Error(err.message)
            }

            if (!result[0]) {
                throw new Error("No category found with this id !")
            }

            return res.json({
                'data': result,
                'error': null
            })
        } else if (req.params.product_id) {
            [err, result] = await to(require('./../src/lib/database/models/product_model').product_model.findAll({
                attributes: ['category_id'],
                where: {
                    id: req.params.product_id
                }
            }))
            if (err) {
                throw new Error(err.message)
            }

            if (!result[0]) {
                throw new Error('No category found for this product id !')
            }

            return getCategories({
                category_id: result[0]['dataValues']['category_id']
            })
        } else {
            [err, result] = await to(database.category_model.findAll())
            if (err) {
                throw new Error(err.message)
            }
            return res.json({
                'data': {'Category details': result},
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

const postCategory = async (req, res) => {
    try {
        let err, result

        [err, result] = await to(catgVal.newCategory.validateAsync(req.body))
        if (err) {
            throw new Error(err.message)
        }

        [err, result] = await to(database.category_model.create({
            name: req.body.name
        }))
        if (err) {
            throw new Error(err.message)
        }


        return res.json({
            'data': {"Success": "Category Added"},
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

module.exports = {getCategories, postCategory}
