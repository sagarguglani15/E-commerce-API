var express = require('express');
var router = express.Router();

const {to} = require('await-to-js')
var Attributes = require('./../controllers/attributes_c')


router.get('/', async (req, res) => {
    let err, result
    [err, result] = await to(Attributes.getAttributes({}))
    if (err) {
        return res.json({
            'data': null,
            'error': {
                'message': err.message
            }
        })
    }

    return res.json(result)
});

router.get('/:attribute_id', async (req, res) => {
    let err, result
    [err, result] = await to(Attributes.getAttributes(req.params))
    if (err) {
        return res.json({
            'data': null,
            'error': {
                'message': err.message
            }
        })
    }

    return res.json(result)
});

router.get('/inProduct/:product_id', async (req, res) => {
    let err, result
    [err, result] = await to(Attributes.getAttributes(req.params))
    if (err) {
        return res.json({
            'data': null,
            'error': {
                'message': err.message
            }
        })
    }

    return res.json(result)
});

router.post('/', async (req, res) => {

    let err, result
    [err, result] = await to(Attributes.postAttribute(req.body))
    if (err) {
        return res.json({
            'data': null,
            'error': {
                'message': err.message
            }
        })
    }

    return res.json(result)
})

module.exports = router;
