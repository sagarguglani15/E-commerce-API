const {to} = require('await-to-js')

const database = require('./../src/lib/database/database')
const logger = require('./../src/lib/logger/winston')

const getAttributes = async (params) => {
    try {
        let err, result

        if (params.attribute_id) {
            [err, result] = await to(database.attributes_model.findAll({
                where: {
                    id: params.attribute_id
                }
            }))
            if (err) {
                throw new Error(err.message)
            }

            if (!result[0]) {
                throw new Error("No attribute found with this id !")
            }

            return {
                'data': result,
                'error': null
            }
        } else if (params.product_id) {
            [err, result] = await to(database.attributes_model.findAll({
                where: {
                    product_id: params.product_id
                }
            }))
            if (err) {
                throw new Error(err.message)
            }

            if (!result[0]) {
                throw new Error('No attributes found for this product id !')
            }

            return {
                'data': result,
                'error': null
            }
        } else {
            [err, result] = await to(database.attributes_model.findAll())
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


const postAttribute = async (params) => {
    try {
        let err, result

        // [err, result] = category.validate(params)
        if (!params.name) {
            throw new Error('Attribute name is a required value!')
        }
        if (!params.value) {
            throw new Error('Attribute value can\'t be blank!')
        }
        if (!params.product_id) {
            throw new Error('Attribute\'s product_id is a required value!')
        }

        [err, result] = await to(database.attributes_model.create(params))
        if (err) {
            throw new Error(err.message)
        }


        return {
            'data': {"Success": "Attribute Added"},
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

module.exports = {getAttributes, postAttribute}
