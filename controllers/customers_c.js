const {to} = require('await-to-js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const database = require('./../src/lib/database/database')
const logger = require('./../src/lib/logger/winston')
const customerVal = require('./../src/lib/Payload Validation/validate_joi')

const postCustomer = async (params) => {
    try {
        let err, result

        [err, result] = await to(customerVal.newCustomer.validateAsync(params))
        if (err) {
            throw new Error(err.message)
        }

        let encryptedPassword
        [err, encryptedPassword] = await to(bcrypt.hash(params.password.toString(), 10))
        if (err) {
            throw new Error(err.message)
        }

        delete params.password;
        params.encryptedPassword = encryptedPassword;

        [err, result] = await to(database.customer_model.findAll({
            where: {
                username: params.username
            }
        }))
        if (err) {
            throw new Error(err.message)
        }
        if (result[0]) {
            throw new Error(' A customer with this username already exists !')
        }

        [err, result] = await to(database.customer_model.create(params))
        if (err) {
            throw new Error(err.message)
        }

        let customer = {username: params.username, encryptedPassword: params.encryptedPassword};
        const token = jwt.sign(customer, process.env.GNOME_DESKTOP_SESSION_ID, {expiresIn: '50m'})

        return {
            'data': {
                'message': 'Signed up successfully!',
                'your Access Token': token
            },
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

const loginCustomer = async (params) => {
    try {
        let err, result

        [err, result] = await to(customerVal.loginCustomer.validateAsync(params))
        if (err) {
            throw new Error(err.message)
        }

        [err, result] = await to(database.customer_model.findAll({
            where: {
                username: params.username
            }
        }))
        if (err) {
            throw new Error(err.message)
        }

        if (!result[0]) {
            throw new Error('no customer with this username exists!')
        }

        let customer = result[0]['dataValues'];

        [err, result] = await to(bcrypt.compare(params.password.toString(), customer.encryptedPassword))
        if (err) {
            throw new Error(err.message)
        }
        if (result) {
            customer = {username: params.username, encryptedPassword: customer.encryptedPassword}
            const token = jwt.sign(customer, process.env.GNOME_DESKTOP_SESSION_ID, {expiresIn: '50m'})
            return {
                'data': {
                    'message': 'logged in successfully !',
                    'your Access Token': token
                },
                'error': null
            }
        } else {
            throw new Error('Invalid Password!')
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

const getCustomer = async (params) => {
    try {
        let err, result

        [err, result] = await to(database.customer_model.findAll({
            where: {
                username: params.user.username
            }
        }))
        if (err) {
            throw new Error(err.message)
        }

        return {
            'data': {
                'customer details': result
            }, 'error': null
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

const updateAddress = async (params) => {
    try {
        let err, result

        [err, result] = await to(customerVal.address.validateAsync(params.body))
        if (err) {
            throw new Error(err.message)
        }

        [err, result] = await to(database.customer_model.update({
            address: params.body.address
        }, {
            where: {
                username: params.user.username
            }
        }))
        if (err) {
            throw new Error(err.message)
        }

        return {
            'data': {
                'message': 'address updated successfully!'
            }, 'error': null
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

const updateCreditCard = async (params) => {
    try {
        let err, result

        [err, result] = await to(customerVal.creditCard.validateAsync(params.body))
        if (err) {
            throw new Error(err.message)
        }

        [err, result] = await to(database.customer_model.update({
            creditCardNumber: params.body.creditCard
        }, {
            where: {
                username: params.user.username
            }
        }))
        if (err) {
            throw new Error(err.message)
        }

        return {
            'data': {
                'message': 'creditCard number updated successfully!'
            }, 'error': null
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

module.exports = {postCustomer, loginCustomer, getCustomer, updateAddress, updateCreditCard}