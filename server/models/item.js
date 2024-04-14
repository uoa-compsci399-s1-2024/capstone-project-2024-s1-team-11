const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database-utils/entity-manager');


class Item extends Model{
    static ITEM_TYPES = {
        HAT: 'hat',
        CLOTHING: 'clothing',
        LEGGINGS: 'leggings',
        BOOTS: 'boots'
    }
}

Item.init(
    {
        item_id: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        item_name: {
            type: DataTypes.STRING
        },
        item_description: {
            type: DataTypes.TEXT
        },
        item_type: {
            type: DataTypes.ENUM('hat', 'clothing', 'leggings', 'boots'),
            allowNull: false
        }
    },
    { 
        sequelize,
        modelName: 'Item',
        tableName: 'Items' 
    }
);


module.exports = Item;