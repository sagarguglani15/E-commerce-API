var express = require('express');
var router = express.Router();

const {to} = require('await-to-js')
var Category = require('./../controllers/category_c')


router.get('/', async (req, res) => {
    let err, result
    [err, result] = await to(Category.getCategories({}))
    if(err){
        return res.json({
            'data':null,
            'error':{
                'message': err.message
            }
        })
    }

    return res.json(result)
});

router.get('/:category_id', async (req, res) => {
    let err, result
    [err, result] = await to(Category.getCategories(req.params))
    if(err){
        return res.json({
            'data':null,
            'error':{
                'message': err.message
            }
        })
    }

    return res.json(result)
});

router.get('/inProduct/:product_id', async (req, res) => {
    let err, result
    [err, result] = await to(Category.getCategories(req.params))
    if(err){
        return res.json({
            'data':null,
            'error':{
                'message': err.message
            }
        })
    }

    return res.json(result)
});

router.post('/', async (req, res) => {

    let err, result
    [err, result] = await to(Category.postCategory(req.body))
    if(err){
        return res.json({
            'data':null,
            'error':{
                'message': err.message
            }
        })
    }

    return res.json(result)
})

module.exports = router;
