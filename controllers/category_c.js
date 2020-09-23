const {to} = require('await-to-js')
const Joi = require('@hapi/joi')

const database = require('./../src/lib/database/database')
const logger = require('./../src/lib/logger/winston')

const category = Joi.object({
    name: Joi.string().required()
})

const getCategories = async (params) => {
    try {
        let err, result

        if (params.category_id) {
            [err, result] = await to(database.category_model.findAll({
                where: {
                    id: params.category_id
                }
            }))
            if (err) {
                throw new Error(err.message)
            }

            if (!result[0]) {
                throw new Error("No category found with this id !")
            }

            return {
                'data': result,
                'error': null
            }
        } else if (params.product_id) {
            [err, result] = await to(database.product_model.findAll({
                attributes: ['category_id'],
                where: {
                    id: params.product_id
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
            return {
                'data': {'Category details': result},
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


const postCategory = async (params) => {
    try {
        let err, result

        // [err, result] = category.validate(params)
        if (!params.name) {
            throw new Error('name missing!')
        }

        [err, result] = await to(database.category_model.create({
            name: params.name
        }))
        if (err) {
            throw new Error(err.message)
        }


        return {
            'data': {"Success": "Category Added"},
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

module.exports = {getCategories, postCategory}
