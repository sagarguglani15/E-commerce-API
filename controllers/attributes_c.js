const {to} = require('await-to-js')

const database = require('./../src/lib/database/models/attributes_model')
const logger = require('./../src/lib/logger/winston')
const attrVal = require('./../src/lib/Payload Validation/validate_joi')

const getAttributes = async (req, res) => {
    try {
        let err, result

        if (req.params.attribute_id) {
            [err, result] = await to(database.attributes_model.findAll({
                where: {
                    id: req.params.attribute_id
                }
            }))
            if (err) {
                throw new Error(err.message)
            }

            if (!result[0]) {
                throw new Error("No attribute found with this id !")
            }

            return res.json({
                'data': result,
                'error': null
            });
        } else if (req.params.product_id) {
            [err, result] = await to(database.attributes_model.findAll({
                where: {
                    product_id: req.params.product_id
                }
            }))
            if (err) {
                throw new Error(err.message)
            }

            if (!result[0]) {
                throw new Error('No attributes found for this product id !')
            }

            return res.json({
                'data': result,
                'error': null
            });
        } else {
            [err, result] = await to(database.attributes_model.findAll())
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
        });
    }
}


const postAttribute = async (req, res) => {
    try {
        let err, result

        [err, result] = await to(attrVal.newAttribute.validateAsync(req.body))
        if (err) {
            throw new Error(err.message)
        }

        [err, result] = await to(database.attributes_model.create(req.body))
        if (err) {
            throw new Error(err.message)
        }

        return res.json({
            'data': {"Success": "Attribute Added"},
            'error': null
        });
    } catch (err) {
        logger.error(err.message)
        return res.json({
            'data': null,
            'error': {
                'message': err.message
            }
        });
    }
}

module.exports = {getAttributes, postAttribute}
