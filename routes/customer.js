var express = require('express');
var router = express.Router();

const {to} = require('await-to-js')
const Customer = require('./../controllers/customers_c')
const authenticate = require('./../controllers/auth')

router.post('/', async (req,res)=>{
    let err, result
    [err, result] = await to(Customer.postCustomer(req.body))
    if(err){
        return res.json({
            'data':null,
            'error': {
                'message': err.message
            }
        })
    }
    return res.json({
        'data':result,
        'error':null
    })
})

router.post('/login', async (req,res)=>{
    let err, result
    [err, result] = await to(Customer.loginCustomer(req.body))
    if(err){
        return res.json({
            'data':null,
            'error': {
                'message': err.message
            }
        })
    }
    return res.json({
        'data':result,
        'error':null
    })
})

router.get('/', authenticate, async (req,res)=>{
    let err, result
    [err, result] = await to(Customer.getCustomer(req))
    if(err){
        return res.json({
            'data':null,
            'error': {
                'message': err.message
            }
        })
    }
    return res.json({
        'data':result,
        'error':null
    })
})

router.put('/address', authenticate, async (req, res)=>{
    let err, result
    [err, result] = await to(Customer.updateAddress(req))
    if(err){
        return res.json({
            'data':null,
            'error': {
                'message': err.message
            }
        })
    }
    return res.json({
        'data':result,
        'error':null
    })
})

router.put('/creditCard', authenticate, async (req, res)=>{
    let err, result
    [err, result] = await to(Customer.updateCreditCard(req))
    if(err){
        return res.json({
            'data':null,
            'error': {
                'message': err.message
            }
        })
    }
    return res.json({
        'data':result,
        'error':null
    })
})

module.exports = router