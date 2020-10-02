const {DataTypes} = require('sequelize')

const {connection} = require('./../database')

const category_model = connection.define('category', {
    id: {
        type: DataTypes.BIGINT(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        notEmpty: true,
        notNull: true
    }
})

module.exports = {category_model}