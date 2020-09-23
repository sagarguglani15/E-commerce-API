const Joi = require('@hapi/joi')

const newAttribute = Joi.object({
    name: Joi.string().required(),
    value: Joi.string().required(),
    product_id: Joi.number().required()
})

const newCategory = Joi.object({
    name: Joi.string().required()
})

const newReview = Joi.object({
    product_id: Joi.number().required(),
    review: Joi.string().required()
})

const newProduct = Joi.object({
    name: Joi.string().required(),
    details: Joi.string().required(),
    price: Joi.number().required(),
    category_id: Joi.number().required(),
})

const newCustomer = Joi.object({
    username: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.number().required(),
    password: Joi.required(),
})

const loginCustomer = Joi.object({
    username: Joi.string().required(),
    password: Joi.required(),
})

const address = Joi.object({
    address: Joi.string().required()
})

const creditCard = Joi.object({
    creditCard: Joi.number().required()
})

const newOrder = Joi.object({
    product_id: Joi.number().required(),
    qty: Joi.number().integer().min(1).required()
})

const productID = Joi.object({
    product_id: Joi.number().required()
})

module.exports = {
    newAttribute, newCategory, newReview, newProduct, newCustomer,
    loginCustomer, address, creditCard, newOrder, productID
}