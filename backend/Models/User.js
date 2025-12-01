const { DataTypes, ENUM } = require("sequelize")
const sequelize = require("../Config/conn")


const User = new sequelize.define("User", {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    fullName: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    
    email: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    
    role: {
        type: ENUM('common', 'admin')
    }
});

module.exports = User;