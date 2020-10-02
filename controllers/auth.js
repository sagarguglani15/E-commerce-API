const jwt = require('jsonwebtoken')
require('dotenv').config()

const authenticate = (req, res, next) => {
    try {
        var token = req.headers.authorization
        if (!token) {
            throw new Error('Token value required as Authorization under header!')
        } else {
            token = token.split(' ')[1]
            if (token) {
                jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
                    if (err) {
                        throw new Error('Invalid Access Token')
                    } else {
                        req.user = user
                        next()
                    }
                })
            } else {
                throw new Error(' Access Token not found! ')
            }
        }
    } catch (err) {
        return res.json({
            'data': null,
            'error': {
                'message': err.message
            }
        })
    }
}

module.exports = authenticate