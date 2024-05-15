const sequelize = require('../database-utils/entity-manager');
const Topic = require('./topic');
const Rock = require('./rock');
const User = require('./user');
const Badge = require('./badge');
const Avatar = require('./avatar')
const Privilege = require('./privilege')


Rock.belongsTo(Topic, { foreignKey: 'topic_id' });

Rock.belongsToMany(User, { through: 'Users_Rocks', foreignKey: 'rock_id' });
User.belongsToMany(Rock, { through: 'Users_Rocks', foreignKey: 'user_id' });

Badge.belongsToMany(User, { through: 'Users_Badges', foreignKey: 'badge_id' });
User.belongsToMany(Badge, { through: 'Users_Badges', foreignKey: 'user_id' });

User.belongsTo(Avatar, { foreignKey: 'avatar_id' });

User.hasOne(Privilege, {foreignKey: 'user_id'});
Privilege.belongsTo(User, {foreignKey: 'user_id'});

const Users_Rocks = sequelize.models.Users_Rocks;
const Users_Badges = sequelize.models.Users_Badges;

module.exports = {Topic, Rock, User, Badge, Avatar, Users_Rocks, Users_Badges, Privilege};