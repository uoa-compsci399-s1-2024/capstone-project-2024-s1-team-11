const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database-utils/entity-manager');


class Avatar extends Model{}

Avatar.init(
    {
        avatar_id: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }
    },
    { 
        sequelize,
        modelName: 'Avatar',
        tableName: 'Avatars' 
    }
);

module.exports = Avatar;