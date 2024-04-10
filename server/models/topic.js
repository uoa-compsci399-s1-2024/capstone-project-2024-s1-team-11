const { DataTypes }= require('sequelize');


function createTopic(sequelize){

    const Topic = sequelize.define('Topic', 
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
        { tableName: 'Topics' }
    );

    return Topic
};

module.exports = createTopic;
