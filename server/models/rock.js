const { DataTypes }= require('sequelize');


function createRock(sequelize){

    const Rock = sequelize.define('Rock', 
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
        { tableName: 'Rocks' }
    );

    return Rock;
};

module.exports = createRock;
