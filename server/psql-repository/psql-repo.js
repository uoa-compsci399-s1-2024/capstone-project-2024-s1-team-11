const { Sequelize }= require('sequelize');
const { buildSchema } = require('../models/schema-builder');
const config = require('./config');


class PSQLRepo {

    static #repoInstance = null;

    constructor(db_name, username, password){
        this.sequelize = new Sequelize(db_name, username, password, 
        {
            host: 'localhost', 
            post: 5432, 
            dialect: 'postgres', 
            define: {timestamps: false, freezeTableName: true},
            logging: false,
        });
        this.Models = buildSchema(this.sequelize);
    }

    static async getRepoInstance(){
        if (PSQLRepo.#repoInstance === null){
            PSQLRepo.#repoInstance = new PSQLRepo(config.db_name, config.username, config.password);
            await PSQLRepo.#repoInstance.sequelize.sync();
        }
        return PSQLRepo.#repoInstance;
    }

    // CRUD operations for Maths Topics
    async getTopicsCount(){
        let query = await this.Models.Topic.findAndCountAll();
        return query.count;
    }

    async getAllTopics(){
        let topics_map = new Map();
        let topics = await this.Models.Topic.findAll();
        topics.forEach((topic) => { 
            topics_map.set(topic.topic_id, topic);
        });
        return topics_map;
    }

    async getTopic(topic_id){
        let topic =  await this.Models.Topic.findOne({ where: {topic_id: topic_id}});
        if (topic !== null){
            return topic;
        }return null;
    }

    async addTopic(topic){
        // Search the topic in our database to check whether the same topic already exists. Only add the topic if it does not already exist.
        let topic_data = await this.Models.Topic.findOne({ where: {topic_id: topic.topic_id}});
        if (topic_data === null){
            await this.Models.Topic.build({ topic_id: topic.topic_id, title: topic.title, description: topic.description}).save();
        }else{
            throw new Error(`Topic with ID: ${topic.topic_id} already exists in the database.`);
        }
    }

    async updateTopic(updated_topic){
        let topic_data =  await this.Models.Topic.findOne({ where: {topic_id: updated_topic.topic_id}});
        if (topic_data !== null){
            await topic_data.update({title: updated_topic.title, description: updated_topic.description});
        }else{
            throw new Error(`Topic with ID: ${updated_topic.topic_id} does not exist in the database.`);
        }
    }

    async deleteTopic(topic_id){
        let topic_data =  await this.Models.Topic.findOne({ where: {topic_id: topic_id}});
        if (topic_data !== null){
            await topic_data.destroy();
        }
    }

    // CRUD operations for Maths Rock.
    async getRocksCount(){
        let query = await this.Models.Rock.findAndCountAll();
        return query.count;
    }

    async getAllRocks(){
        let rocks_map = new Map();
        let rocks = await this.Models.Rock.findAll();
        for (let i = 0; i < rocks.length; i++){
            rocks_map.set(rocks[i].rock_id, rocks[i]);
        }
        return rocks_map;
    }

    async getRock(rock_id){
        let rock = await this.Models.Rock.findOne({ where: { rock_id: rock_id }});
        return rock;
    }

    async addRock(rock){
        let rock_data = await this.Models.Rock.findOne({where: { rock_id: rock.rock_id }});
        if (rock_data === null){     // Checks whether the same rock already exist in the database.
            await this.Models.Rock.build({ rock_id: rock.rock_id, 
                                        rock_name: rock.rock_name, 
                                        product_key: rock.product_key, 
                                        topic_id: rock.topic_id }).save();
        }else{
            throw new Error(`Rock with ID: ${rock.rock_id} already exists in the database.`);
        }
    }

    async updateRock(rock){
        let rock_data = await this.Models.Rock.findOne({ where: { rock_id: rock.rock_id }});
        if (rock_data !== null){     // Checks whether the rock exists in the database.
            rock.save({rock_name: rock.rock_name, product_key: rock.product_key, topic_id: rock.topic_id })
        }else{
            throw new Error(`Rock with ID: ${rock.rock_id} does not exist in the database.`);
        }
    }

    async deleteMathsRock(rock_id){
        let rock =  await this.Models.Rock.findOne({ where: {rock_id: rock_id}});
        if (rock !== null){
            await rock.destroy();
        }
    }

    // CRUD operations for Users
    async getUsersCount(){
        let query = await this.Models.User.findAndCountAll();
        return query.count;
    }

    async getAllUsers(){
        let users_map = new Map();
        let users = await this.Models.User.findAll();
        for (let i = 0; i < users.length; i++){
            users_map.set(users[i].user_id, users[i]);
        }
        return users_map;
    }

    async getUser(user_id){
        let user = await this.Models.User.findOne({where: {user_id: user_id}});
        return user;
    }

    async addUser(user){
        let user_data = await this.Models.User.findOne({where: {user_id: user.user_id}});
        if (user_data === null){     // Checks whether the same user already exist.
            await this.Models.User.build({ user_id: user.user_id, 
                                        username: user.username, 
                                        password: user.password, 
                                        email: user.email, 
                                        district: user.district }).save();
        }else{
            throw new Error(`User with ID: ${user.user_id} already exists in the database.`);
        }
    }

    async addRockToUserCollection(user_id, rock_id){
        let user = await this.Models.User.findOne({where: {user_id: user_id}});
        let rock = await this.Models.Rock.findOne({where: {rock_id: rock_id}});
        if (user !== null & rock !== null){
            await this.Models.Users_Rocks.findOrCreate({where: {user_id: user_id, rock_id: rock_id}});
        }else{
            throw new Error(`Either ${user_id} is an invalid user ID or ${rock_id} is an invalid rock ID.`);
        }
    }

    async updateUser(user){
        let user_data = await this.Models.User.findOne({where: {user_id: user.user_id}});
        if (user_data !== null){
            await user.save({ username: user.username, password: user.password, email: user.email, district: user.district });
        }else{
            throw new Error(`User with user ID: ${user.user_id} does not exist in the database.`);
        }
    }

}

module.exports = PSQLRepo;










// Informal test case. 
// Todo: Write test cases with JEST.

async function inspectDatabase(){

    // Create a repo instance. A singleton design pattern is used.
    repo = await PSQLRepo.getRepoInstance();

    // Check the number of topics in db.
    topics_count = await repo.getTopicsCount();
    topics = await repo.getAllTopics();
    console.log(`There are ${topics_count} topics.`);
    console.log(topics);

    // Check the the number of rocks in db.
    rocks_count = await repo.getRocksCount();
    rocks = await repo.getAllRocks();
    console.log(`There are ${rocks_count} topics.`);
    console.log(rocks);

    // Inspect users count.
    users_count = await repo.getUsersCount();
    users = await repo.getAllUsers();
    console.log(`There are ${users_count} topics.`);
    console.log(users);

};

async function populateDatabase(){
    repo = await PSQLRepo.getRepoInstance();
    topics_count = await repo.getTopicsCount();
    await repo.addTopic({topic_id: topics_count * 2 + 1, title: 'LOL', description: 'Hahahahaha.'});

    rocks_count = await repo.getRocksCount();
    await repo.addRock({rock_id: rocks_count * 2 + 1, rock_name: 'A rock', product_key: 'ABCDEFG', topic_id: topics_count * 2 + 1});

    users_count = await repo.getUsersCount();
    await repo.addUser({ user_id: users_count * 2 + 1, username: 'Thanos', password: 'password', email: 'email', district: 'Earth' });

    await repo.addRockToUserCollection(users_count * 2 + 1, rocks_count * 2 + 1);
}

// populateDatabase();
// inspectDatabase();
