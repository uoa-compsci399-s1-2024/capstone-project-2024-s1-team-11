const MathsTopic = require('../../domain/maths-topic');
const MathsRock = require('../../domain/maths-rock');
const User = require('../../domain/user');
const { Sequelize, Model, DataTypes }= require('sequelize');


const sequelize = new Sequelize('db_name_maths_rocks', 'your_username', 'your_password', 
    {
        host: 'localhost', 
        post: 5432, 
        dialect: 'postgres', 
        define: {timestamps: false, freezeTableName: true}
    });

const MathsTopicModel = sequelize.define('Maths_Topic', 
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
        type: DataTypes.STRING
    } 
},
{
    tableName: 'Maths_Topics'
});

const MathsRockModel = sequelize.define('Maths_Rock', 
{
    rock_id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
},
{
    tableName: 'Maths_Rocks'
});
MathsRockModel.belongsTo(MathsTopicModel, { foreignKey: 'topic_id'});

const UserModel = sequelize.define('User', 
{
    user_id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    tableName: 'Users'
});
UserModel.belongsToMany(MathsRockModel, { through: 'Users_Rocks', foreignKey: 'user_id'});
MathsRockModel.belongsToMany(UserModel, { through: 'Users_Rocks', foreignKey: 'rock_id'});

module.exports = { sequelize };