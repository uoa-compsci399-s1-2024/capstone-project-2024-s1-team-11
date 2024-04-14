const { DataTypes, Model }= require('sequelize');
const sequelize = require('../database-utils/entity-manager');


class Rock extends Model{}

Rock.init(
    {
        rock_id: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        rock_name: { 
            type: DataTypes.STRING,
            allowNull: false
        },
        product_key: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {   sequelize,
        modelName: 'Rock',
        tableName: 'Rocks'
    }
);

module.exports = Rock;
