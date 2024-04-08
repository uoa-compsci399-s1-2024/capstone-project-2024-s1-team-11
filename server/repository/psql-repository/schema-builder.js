async function buildSchema(sequelize){
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
                },
                email: {
                    type: DataTypes.STRING
                },
                district: {
                    type: DataTypes.STRING
                }
            },
            {
                tableName: 'Users'
            });
        UserModel.belongsToMany(MathsRockModel, { through: 'Users_Rocks', foreignKey: 'user_id'});
        MathsRockModel.belongsToMany(UserModel, { through: 'Users_Rocks', foreignKey: 'rock_id'});

        await sequelize.sync();
    }


module.exports = { buildSchema };
