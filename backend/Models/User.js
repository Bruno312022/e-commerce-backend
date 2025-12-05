const { DataTypes } = require("sequelize")
const sequelize = require("../Config/conn")


const User = sequelize.define("User", {
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
        type: DataTypes.ENUM('common', 'admin', 'dealer'),
        allowNull: false,
        defaultValue: 'common'
    }
});

module.exports = User;