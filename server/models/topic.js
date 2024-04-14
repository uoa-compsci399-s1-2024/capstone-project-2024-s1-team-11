const { DataTypes, Model }= require('sequelize');
const sequelize = require('../database-utils/entity-manager');


class Topic extends Model{}

Topic.init(
    {
        topic_id: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        } 
    },
    { 
        sequelize,
        modelName: 'Topic',
        tableName: 'Topics' 
    }
);


module.exports = Topic;
