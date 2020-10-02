const {DataTypes} = require('sequelize')

const {connection} = require('./../database')

const order_model = connection.define('orders', {
    id: {
        type: DataTypes.BIGINT(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    customer: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: require('./customer_model').customer_model,
            key: 'username'
        }
    },
    product_id: {
        type: DataTypes.BIGINT(11),
        allowNull: false,
        references: {
            model: require('./product_model').product_model,
            key: 'id'
        }
    },
    qty: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
})

module.exports = {order_model}