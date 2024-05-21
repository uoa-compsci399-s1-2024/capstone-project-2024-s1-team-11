const sequelize = require('../database-utils/entity-manager');
const { DataTypes} = require('sequelize');
const Topic = require('./topic');
const Rock = require('./rock');
const User = require('./user');
const Badge = require('./badge');
const Avatar = require('./avatar')
const Privilege = require('./privilege')
const Page = require("./page");


Rock.belongsTo(Topic, { foreignKey: {name: 'topic_id', allowNull: true} });

const Users_Rocks = sequelize.define('Users_Rocks',
    {
        collectedAt: {
            type: DataTypes.STRING
        }
    })
Rock.belongsToMany(User, { through: 'Users_Rocks', foreignKey: 'rock_id' });
User.belongsToMany(Rock, { through: 'Users_Rocks', foreignKey: 'user_id' });

Badge.belongsToMany(User, { through: 'Users_Badges', foreignKey: 'badge_id' });
User.belongsToMany(Badge, { through: 'Users_Badges', foreignKey: 'user_id' });

User.belongsTo(Avatar, { foreignKey: 'avatar_id' });

User.hasOne(Privilege, {foreignKey: 'user_id'});
Privilege.belongsTo(User, {foreignKey: 'user_id'});

const Users_Badges = sequelize.models.Users_Badges;

module.exports = {Topic, Rock, User, Badge, Avatar, Users_Rocks, Users_Badges, Privilege, Page};