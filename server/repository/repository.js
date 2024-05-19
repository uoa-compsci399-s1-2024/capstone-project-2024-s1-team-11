const sequelize = require('../database-utils/entity-manager');
const {Topic, Rock, User, Badge, Item, Avatar, Users_Rocks, Users_Badges, Users_Items, Privilege} = require('../models');
const {max} = require("pg/lib/defaults");


class Repository {

    static #repoInstance = null;

    constructor(){
        this.sequelize = sequelize;
    }

    static async getRepoInstance(){
        try {
            if (Repository.#repoInstance === null) {
                Repository.#repoInstance = new Repository();
                await Repository.#repoInstance.sequelize.sync();
            } return Repository.#repoInstance;
        } catch (e){ console.error(e); }
    }


    // CRUD operations for Maths Topics
    async getTopicsCount(){
        try{
            return (await Topic.findAndCountAll()).count;
        }catch (e){ console.log(e); }
    }

    async getAllTopics() {
        try{
            let topics_map = new Map();
            let topics = await Topic.findAll();
            topics.forEach((topic) => { topics_map.set(topic.topic_id, topic); });
            return topics_map;
        } catch (e){ console.error(e); }
    }

    async getTopic(topic_id){
        try {
            return await Topic.findByPk(topic_id);
        } catch (e){ console.log(e); }
    }

    async addTopic(topic){
        try {
            const max_id = await Topic.max("topic_id");
            return await Topic.create({
                topic_id: max_id + 1,
                title: topic.title,
                description: topic.description,
                imageUri: topic.imageUri,
                metaTitle: topic.metaTitle,
                metaDescription: topic.metaDescription
            });
        } catch (e) { console.error(e); }
    }

    async updateTopic(updated_topic){
        try {
            let topic_data = await Topic.findByPk(updated_topic.topic_id);
            if (topic_data !== null) {
                await topic_data.update({title: updated_topic.title, description: updated_topic.description});
            }
        } catch (e) { console.error(e); }
    }

    async deleteTopic(topic_id){
        try {
            let topic_data = await Topic.findByPk(topic_id);
            if (topic_data !== null) {
                await topic_data.destroy();
            }
        }catch (e) { console.log(e); }
    }


    // CRUD operations for Maths Rock.
    async getRocksCount(){
        return (await Rock.findAndCountAll()).count;
    }

    async getAllRocks(){
        try {
            let rocks_map = new Map();
            let rocks = await Rock.findAll();
            for (let i = 0; i < rocks.length; i++) {
                rocks_map.set(rocks[i].rock_id, rocks[i]);
            }
            return rocks_map;
        }catch (e){
            console.error(e);
        }
    }

    async getRock(rock_id){
        try {
            return await Rock.findByPk(rock_id);
        }catch (e){ console.error(e); }
    }

    async addRock(rock){
        try{
            const max_id = await Rock.max("rock_id");
            return await Rock.create({
                    rock_id: max_id +1,
                    rock_name: rock.rock_name,
                    product_key: rock.product_key,
                    topic_id: rock.topic_id
                });
        } catch (e) { console.error(e); }
    }

    async updateRock(rock) {
        try {
            let rock_data = await Rock.findByPk(rock.rock_id);
            if (rock_data !== null) {     // Checks whether the rock exists in the database.
                rock.save({rock_name: rock.rock_name, product_key: rock.product_key, topic_id: rock.topic_id})
            }
        } catch (e) { console.error(e); }
    }

    async deleteRock(rock_id){
        try {
            let rock = await Rock.findByPk(rock_id);
            if (rock !== null) {
                await rock.destroy();
            }
        } catch (e) { console.error(e); }
    }


    // CRUD operations for Badges
    async getAllBadges(){
        try {
            let badges_map = new Map();
            let badges = await Badge.findAll();
            for (let i = 0; i < badges.length; i++) {
                badges_map.set(badges[i].badge_id, badges[i]);
            } return badges_map;
        }catch (e){ console.error(e); }
    }

    async addBadge(badge){
        try {
            await Badge.build({
                badge_title: badge.badge_title,
                badge_description: badge.badge_description,
                badge_imageUri: badge.badge_imageUri
            }).save();
        } catch (e){ console.error(e); }
    }

    // CRUD operations for Users
    async getUsersCount() {
        try {
            return (await User.findAndCountAll()).count;
        } catch (e) {console.error(e); }
    }

    async getAllUsers(){
        let users_map = new Map();
        let users = await User.findAll();
        for (let i = 0; i < users.length; i++){
            users_map.set(users[i].user_id, users[i]);
        }
        return users_map;
    }

    async getUser(user_id){
        try {
            return await User.findByPk(user_id);
        } catch (e) { console.error(e); }
    }

    async getUserByUsername(username){
        try {
            return await User.findOne({where: {username: username}});
        } catch (e) { console.error(e); }
    }

    async getUserByEmail(email){
        try {
            return await User.findOne({where: {email: email}});
        } catch (e) {console.error(e);}
    }

    async addUser(user){
        try {
            let user_data = await User.findOne({where: {username: user.username}});
            if (user_data === null) {     // Checks whether the same user already exist.
                await User.build({
                    user_id: user.user_id,
                    username: user.username,
                    alias: user.alias,
                    password: user.password,
                    salt: user.salt,
                    email: user.email,
                    district: user.district
                }).save();
            }
        } catch (e) { console.error(e); }
    }

    async getUserAvatar(user_id){
        const user = await User.findByPk(user_id);
        const avatar_id = user.avatar_id;
        if (avatar_id !== null) {
            return await Avatar.findByPk(avatar_id);
        } return null;
    }
    
    async addRockToUserCollection(user_id, rock_id){
        try {
            let user = await User.findByPk(user_id);
            let rock = await Rock.findByPk(rock_id);
            if (user !== null && rock !== null) {
                await Users_Rocks.findOrCreate({where: {user_id: user_id, rock_id: rock_id}});
            }
        } catch (e) { console.error(e); }
    }

    async getUserRocks(user_id){
        try {
            let rocks = await this.getAllRocks();
            let userRocks = await Users_Rocks.findAll({where: {user_id: user_id}})
            let result = new Map();
            for (const userRock of userRocks){
                let rock = rocks.get(userRock.rock_id);
                result.set(rock.rock_id, rock);
            }
            return result;
        } catch (e) { console.error(e); }
    }

    async getUserRocksCount(user_id){
        try{
            return (await Users_Rocks.findAndCountAll({where: {user_id: user_id}})).count;
        } catch (e) { console.error(e); }
    }

    async checkRockInUserCollection(user_id, rock_id) {
        try {
            const userRock = await Users_Rocks.findOne({ where: {user_id: user_id, rock_id: rock_id } });
    
            return !!userRock; // Returns true if the user is linked to the rock in the Users_Rocks table
        } catch (error) {
            console.error('Error checking rock in user collection:', error);
            throw new Error('Failed to check rock in user collection.');
        }
    }
    
    async updateUser(user){
        try {
            let user_data = await User.findOne({where: {user_id: user.user_id}});
            if (user_data !== null) {
                await user.save({
                    user_id: user.user_id,
                    username: user.username,
                    password: user.password,
                    salt: user.salt,
                    email: user.email,
                    district: user.district,
                    avatar_id: user.avatar_id
                });
            }
        } catch (e) { console.error(e); }
    }

    async getUserBadges(user_id){
        try {
            let badges = await this.getAllBadges();
            let user_badges = await Users_Badges.findAll({where: {user_id: user_id}})
            let result = new Map();
            for (const user_badge of user_badges){
                let badge = badges.get(user_badge.badge_id);
                result.set(badge.badge_id, badge);
            } return result;
        } catch (e) { console.error(e); }
    }

    async giveBadgeToUser(user_id, badge_id){
        try {
            let user = await User.findByPk(user_id);
            let badge = await Badge.findByPk(badge_id);
            if (user !== null && badge !== null) {
                await Users_Badges.findOrCreate({where: {user_id: user_id, badge_id: badge_id}});
            }
        } catch (e) { console.error(e); }
    }

    async getUserPrivilege(username){
        try{
            if (username) {
                let user = await this.getUserByUsername(username);
                if (user) {
                    let user_id = user.user_id;
                    return await Privilege.findOne({where: {user_id: user_id.valueOf()}});
                }
            } return false;
        } catch (e){
            console.error(e);
            return false;
        }
    }


    // CRUD Operations for Avatar
    async addAvatar(avatar_image_name){
        try {
            await Avatar.build({imageUri: avatar_image_name}).save();
        } catch (e) { console.error(e); }
    }

    async getAvatar(avatar_id){
        try {
            return await Avatar.findByPk(avatar_id);
        } catch (e) { console.error(e); }
    }

    async getAllAvatars(){
        try {
            return await Avatar.findAll();
        } catch (e) { console.log(e); }
    }

    async getAllAvatarCount(){
        try {
            return (await Avatar.findAndCountAll()).count;
        } catch (e) { console.error(e); }
    }

}

module.exports = Repository;
