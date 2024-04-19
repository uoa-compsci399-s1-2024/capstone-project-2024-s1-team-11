const sequelize = require('../database-utils/entity-manager');
const {Topic, Rock, User, Badge, Item, Avatar, Users_Rocks, Users_Badges, Users_Items} = require('../models');


class Repository {

    static #repoInstance = null;

    constructor(){
        this.sequelize = sequelize;
    }

    static async getRepoInstance(){
        if (Repository.#repoInstance === null){
            Repository.#repoInstance = new Repository();
            await Repository.#repoInstance.sequelize.sync();
        }
        return Repository.#repoInstance;
    }

    // CRUD operations for Maths Topics
    async getTopicsCount(){
        let query = await Topic.findAndCountAll();
        return query.count;
    }

    async getAllTopics(){
        let topics_map = new Map();
        let topics = await Topic.findAll();
        topics.forEach((topic) => { 
            topics_map.set(topic.topic_id, topic);
        });
        return topics_map;
    }

    async getTopic(topic_id){
        let topic =  await Topic.findOne({ where: {topic_id: topic_id}});
        if (topic !== null){
            return topic;
        }return null;
    }

    async addTopic(topic){
        // Search the topic in our database to check whether the same topic already exists. Only add the topic if it does not already exist.
        let topic_data = await Topic.findOne({ where: {topic_id: topic.topic_id}});
        if (topic_data === null){
            await Topic.build({ topic_id: topic.topic_id, title: topic.title, description: topic.description}).save();
        }else{
            throw new Error(`Topic with ID: ${topic.topic_id} already exists in the database.`);
        }
    }

    async updateTopic(updated_topic){
        let topic_data =  await Topic.findOne({ where: {topic_id: updated_topic.topic_id}});
        if (topic_data !== null){
            await topic_data.update({title: updated_topic.title, description: updated_topic.description});
        }else{
            throw new Error(`Topic with ID: ${updated_topic.topic_id} does not exist in the database.`);
        }
    }

    async deleteTopic(topic_id){
        let topic_data =  await Topic.findOne({ where: {topic_id: topic_id}});
        if (topic_data !== null){
            await topic_data.destroy();
        }
    }

    // CRUD operations for Maths Rock.
    async getRocksCount(){
        let query = await Rock.findAndCountAll();
        return query.count;
    }

    async getAllRocks(){
        let rocks_map = new Map();
        let rocks = await Rock.findAll();
        for (let i = 0; i < rocks.length; i++){
            rocks_map.set(rocks[i].rock_id, rocks[i]);
        }
        return rocks_map;
    }

    async getRock(rock_id){
        let rock = await Rock.findOne({ where: { rock_id: rock_id }});
        return rock;
    }

    async addRock(rock){
        let rock_data = await Rock.findOne({where: { rock_id: rock.rock_id }});
        if (rock_data === null){     // Checks whether the same rock already exist in the database.
            await Rock.build({ rock_id: rock.rock_id, 
                                        rock_name: rock.rock_name, 
                                        product_key: rock.product_key, 
                                        topic_id: rock.topic_id }).save();
        }else{
            throw new Error(`Rock with ID: ${rock.rock_id} already exists in the database.`);
        }
    }

    async updateRock(rock){
        let rock_data = await Rock.findOne({ where: { rock_id: rock.rock_id }});
        if (rock_data !== null){     // Checks whether the rock exists in the database.
            rock.save({rock_name: rock.rock_name, product_key: rock.product_key, topic_id: rock.topic_id })
        }else{
            throw new Error(`Rock with ID: ${rock.rock_id} does not exist in the database.`);
        }
    }

    async deleteMathsRock(rock_id){
        let rock =  await Rock.findOne({ where: {rock_id: rock_id}});
        if (rock !== null){
            await rock.destroy();
        }
    }

    // CRUD operations for Users
    async getUsersCount(){
        let query = await User.findAndCountAll();
        return query.count;
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
        let user = await User.findOne({where: {user_id: user_id}});
        return user;
    }

    async addUser(user){
        let user_data = await User.findOne({where: {user_id: user.user_id}});
        if (user_data === null){     // Checks whether the same user already exist.
            await User.build({ user_id: user.user_id, 
                                username: user.username, 
                                password: user.password, 
                                email: user.email, 
                                district: user.district }).save();
        }else{
            throw new Error(`User with ID: ${user.user_id} already exists in the database.`);
        }
    }

    async addRockToUserCollection(user_id, rock_id){
        let user = await User.findOne({where: {user_id: user_id}});
        let rock = await Rock.findOne({where: {rock_id: rock_id}});
        if (user !== null & rock !== null){
            await Users_Rocks.findOrCreate({where: {user_id: user_id, rock_id: rock_id}});
        }else{
            throw new Error(`Either ${user_id} is an invalid user ID or ${rock_id} is an invalid rock ID.`);
        }
    }

    async isFromQRCode(userId, rockId) {
        try {
            // Not sure of this logic yet, but likely need a set QR code for each rock in the database for this to work
            const userRock = await Users_Rocks.findOne({ where: { user_id: userId, rock_id: rockId } });
            return userRock !== null;
        } catch (error) {
            console.error("Error checking if user came from QR code:", error);
            return false; // Return false in case of error
        }
    }
    
    async updateUser(user){
        let user_data = await User.findOne({where: {user_id: user.user_id}});
        if (user_data !== null){
            await user.save({ username: user.username, password: user.password, email: user.email, district: user.district });
        }else{
            throw new Error(`User with user ID: ${user.user_id} does not exist in the database.`);
        }
    }

}

module.exports = Repository;
