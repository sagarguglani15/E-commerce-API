require('dotenv').config()
const {to} = require('await-to-js')
const {Sequelize} = require('sequelize')
const logger = require('../logger/winston')

const connection = new Sequelize(
    'ecom',
    'root',
    process.env.MYSQLPASS,
    {
        host: 'localhost',
        dialect: 'mysql',
        logging: msg => logger.info(msg)
    }
)

const connect = async () => {
    let [err, result] = await to(connection.sync({alter: true}))
    if (err) {
        logger.error(err.message)
        return
    }
    logger.info('Successfully connected to MySQL server.')
    console.log('Successfully connected to MySQL server.')
}

module.exports = {
    connection, connect
}