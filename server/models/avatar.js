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
        },
        imageUri: {
            type: DataTypes.STRING,
            defaultValue: "avatar-00.jpg"
        }
    },
    { 
        sequelize,
        modelName: 'Avatar',
        tableName: 'Avatars' 
    }
);

module.exports = Avatar;