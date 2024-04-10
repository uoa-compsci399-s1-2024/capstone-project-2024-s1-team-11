const createTopic = require('./topic');
const createRock = require('./rock');
const createUser = require('./user');


function buildSchema(sequelize){
    const TopicModel = createTopic(sequelize);
    const RockModel = createRock(sequelize);
    const UserModel = createUser(sequelize);
    
    RockModel.belongsTo(TopicModel, { foreignKey: 'topic_id' });
    RockModel.belongsToMany(UserModel, { through: 'Users_Rocks', foreignKey: 'rock_id' });
    UserModel.belongsToMany(RockModel, { through: 'Users_Rocks', foreignKey: 'user_id' });

    const Models = { Topic: TopicModel, 
                    Rock: RockModel,
                    User: UserModel,
                    Users_Rocks: sequelize.models.Users_Rocks }
    
    return Models;
}

module.exports = { buildSchema };
