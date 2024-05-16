const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database-utils/entity-manager');


class Badge extends Model{}

Badge.init(
    {
        badge_id: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        badge_title: {
            type: DataTypes.STRING
        },
        badge_description: {
            type: DataTypes.TEXT
        },
        badge_imageUri: {
            type: DataTypes.STRING
        }
    },
    { 
        sequelize,
        modelName: 'Badge',
        tableName: 'Badges' 
    }
);


module.exports = Badge;