const {DataTypes} = require('sequelize')

const {connection} = require('./../database')

const review_model = connection.define('reviews', {
    id: {
        type: DataTypes.BIGINT(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    review: {
        type: DataTypes.STRING,
        notEmpty: true,
        notNull: true
    },
    product_id: {
        type: DataTypes.BIGINT(11),
        allowNull: false,
        references: {
            model: require('./product_model').product_model,
            key: 'id'
        }
    }
})

module.exports = {review_model}