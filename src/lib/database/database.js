const {to} = require('await-to-js')
const {Sequelize, DataTypes} = require('sequelize')
const logger = require('../logger/winston')

const connection = new Sequelize(
    'ecom',
    'root',
    'rootpasswordgiven',
    {
        host: 'localhost',
        dialect: 'mysql',
        logging: msg => logger.info(msg)
    }
)

const category_model = connection.define('category', {
    id:{
        type: DataTypes.BIGINT(11),
        autoIncrement:true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        notEmpty: true,
        notNull: true
    }
})

const product_model = connection.define('products', {
    id:{
        type: DataTypes.BIGINT(11),
        autoIncrement:true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        notEmpty: true,
        notNull: true
    },
    details:{
        type: DataTypes.STRING,
        notEmpty: true,
        notNull: true
    },
    price:{
        type: DataTypes.FLOAT,
        defaultValue: 0,
    },
    category_id:{
        type: DataTypes.BIGINT(11),
        allowNull:false,
        references:{
            model: category_model,
            key: 'id'
        }
    }
})

const attributes_model = connection.define('attributes', {
    id:{
        type: DataTypes.BIGINT(11),
        autoIncrement:true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        notEmpty: true,
        notNull: true
    },
    value:{
        type: DataTypes.STRING,
        notEmpty: true,
        notNull: true
    },
    product_id:{
        type: DataTypes.BIGINT(11),
        allowNull:false,
        references:{
            model: product_model,
            key: 'id'
        }
    }
})

const review_model = connection.define('reviews', {
    id:{
        type: DataTypes.BIGINT(11),
        autoIncrement:true,
        allowNull: false,
        primaryKey: true
    },
    review:{
        type: DataTypes.STRING,
        notEmpty: true,
        notNull: true
    },
    product_id:{
        type: DataTypes.BIGINT(11),
        allowNull:false,
        references:{
            model: product_model,
            key: 'id'
        }
    }
})

const customer_model = connection.define('customer', {
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        notEmpty: true,
        notNull: true
    },
    email:{
        type: DataTypes.STRING,
        notEmpty: true,
        notNull: true
    },
    phone:{
        type: DataTypes.BIGINT,
        notEmpty: true,
        notNull: true
    },
    address:{
        type: DataTypes.STRING,
        defaultValue: null
    },
    creditCardNumber:{
        type: DataTypes.BIGINT,
        defaultValue: null
    },
    encryptedPassword:{
        type: DataTypes.STRING,
        notEmpty: true,
        notNull: true
    }
})

const order_model = connection.define('orders', {
    id:{
        type: DataTypes.BIGINT(11),
        autoIncrement:true,
        allowNull: false,
        primaryKey: true
    },
    customer:{
        type: DataTypes.STRING,
        allowNull:false,
        references:{
            model: customer_model,
            key: 'username'
        }
    },
    product_id:{
        type: DataTypes.BIGINT(11),
        allowNull:false,
        references:{
            model: product_model,
            key: 'id'
        }
    },
    qty:{
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
})

const cartItems_model = connection.define('shoppingCart', {
    id:{
        type: DataTypes.BIGINT(11),
        autoIncrement:true,
        allowNull: false,
        primaryKey: true
    },
    customer:{
        type: DataTypes.STRING,
        allowNull:false,
        references:{
            model: customer_model,
            key: 'username'
        }
    },
    product_id:{
        type: DataTypes.BIGINT(11),
        allowNull:false,
        references:{
            model: product_model,
            key: 'id'
        }
    },
    qty:{
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
})


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
    connect, category_model, product_model, attributes_model, review_model, customer_model, order_model, cartItems_model
}