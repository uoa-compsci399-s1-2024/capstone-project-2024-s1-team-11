const { DataTypes }= require('sequelize');


function createUser(sequelize){

    const User = sequelize.define('User', 
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
            },
            email: {
                type: DataTypes.STRING
            },
            district: {
                type: DataTypes.STRING
            }
        },
        { tableName: 'Users' }
    );

    return User; 
};

module.exports = createUser;
