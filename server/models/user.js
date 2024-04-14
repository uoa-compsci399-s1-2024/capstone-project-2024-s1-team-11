const { DataTypes, Model }= require('sequelize');
const sequelize = require('../database-utils/entity-manager');


class User extends Model {}

User.init(
    {
        user_id: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        alias :{
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        district: {
            type: DataTypes.STRING
        }
    },
    {   
        sequelize,
        modelName: 'User',
        tableName: 'Users' 
    }
);

module.exports = User;
