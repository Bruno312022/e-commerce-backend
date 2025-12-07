const { DataTypes } = require("sequelize");
const sequelize = require("../Config/conn");

const Products = sequelize.define("Products", {
    productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },

    productName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    },

    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

module.exports = Products;
