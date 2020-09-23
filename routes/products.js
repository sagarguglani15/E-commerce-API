var express = require('express');
var router = express.Router();

const {to} = require('await-to-js')
var Products = require('./../controllers/product_c')

router.get('/', async (req,res)=>{
    let err, result;
    [err, result] = await to(Products.getProducts({}))
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

router.get('/:product_id', async (req, res)=>{
    let err, result;
    [err, result] = await to(Products.getProducts(req.params))
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

router.get('/inCategory/:category_id', async (req, res)=>{
    let err, result;
    [err, result] = await to(Products.getProducts(req.params))
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

router.post('/', async (req,res)=>{
    let err, result;
    [err, result] = await to(Products.postProduct(req.body))
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

router.get('/:product_id/reviews', async (req,res)=>{
    let err, result;
    [err, result] = await to(Products.getReview(req.params))
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

router.post('/:product_id/reviews', async (req,res)=>{
    let err, result
    req.body.product_id = req.params.product_id;
    [err, result] = await to(Products.postReview(req.body))
    if(err){
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
