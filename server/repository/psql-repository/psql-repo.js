const MathsTopic = require('../../domain/maths-topic');
const MathsRock = require('../../domain/maths-rock');
const User = require('../../domain/user');
const { Sequelize }= require('sequelize');
const { buildSchema } = require('./schema-builder');
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
    }

    async createTables(){
        await buildSchema(this.sequelize);
    }

    static async getRepoInstance(){
        if (PSQLRepo.#repoInstance === null){
            PSQLRepo.#repoInstance = new PSQLRepo(config.db_name, config.username, config.password);
            await PSQLRepo.#repoInstance.createTables();
        }
        return PSQLRepo.#repoInstance;
    }

    // CRUD operations for Maths Topics
    async getMathsTopicsCount(){
        let query = await this.sequelize.models.Maths_Topic.findAndCountAll();
        return query.count;
    }

    async getAllMathsTopics(){
        let topics_map = new Map();
        let topics_data = await this.sequelize.models.Maths_Topic.findAll();
        topics_data.forEach((topic_data) => { 
            let topic_json = topic_data.toJSON();
            topics_map.set(topic_json.topic_id, new MathsTopic(topic_json.topic_id, topic_json.title, topic_json.description));
        });
        return topics_map;
    }

    async getMathsTopic(topic_id){
        let topic_data =  await this.sequelize.models.Maths_Topic.findOne({ where: {topic_id: topic_id}});
        if (topic_data !== null){
            let topic_json = topic_data.toJSON();
            return new MathsTopic(topic_json.topic_id, topic_json.title, topic_json.description);
        }return null;
    }

    async addMathsTopic(maths_topic){
        // Search the topic in our database to check whether the same topic already exists.
        // Only add the topic if it does not already exist.
        let topic_data = await this.sequelize.models.Maths_Topic.findOne({ where: {topic_id: maths_topic.getTopicId()}});
        if (topic_data === null){
            await this.sequelize.models.Maths_Topic
                    .build({ topic_id: maths_topic.getTopicId(), title: maths_topic.getTitle(), description: maths_topic.getDescription()})
                    .save();
        }else{
            throw new Error(`Topic with ID: ${topic_id} already exists in the database.`)
        }
    }

    async updateMathsTopic(updated_maths_topic){
        let topic_id = updated_maths_topic.getTopicId();
        let topic_data =  await this.sequelize.models.Maths_Topic.findOne({ where: {topic_id: topic_id}});
        if (topic_data !== null){
            await topic_data.update({title: updated_maths_topic.getTitle(), description: updated_maths_topic.getDescription()});
        }else{
            throw new Error(`Topic with ID: ${topic_id} does not exist in the database.`);
        }
    }

    async deleteMathsTopic(topicId){
        let topic_data =  await this.sequelize.models.Maths_Topic.findOne({ where: {topic_id: topicId}});
        if (topic_data !== null){
            await topic_data.destroy();
        }
    }

    // CRUD operations for Maths Rock.
    async getRocksCount(){
        let query = await this.sequelize.models.Maths_Rock.findAndCountAll();
        return query.count;
    }

    async getAllMathsRocks(){
        let rocks_map = new Map();
        let rocks_data = await this.sequelize.models.Maths_Rock.findAll();
        let topics = await this.getAllMathsTopics();
        for (let i = 0; i < rocks_data.length; i++){
            let rock_json = rocks_data[i].toJSON();
            if (topics.get(rock_json.topic_id) !== undefined){
                rocks_map.set(rock_json.rock_id, new MathsRock(rock_json.rock_id, rock_json.rock_name, topics.get(rock_json.topic_id)));
            }else{
                rocks_map.set(rock_json.rock_id, new MathsRock(rock_json.rock_id, rock_json.rock_name, null));
            }
        };
        return rocks_map;
    }

    async getMathsRock(rockId){
        let rock = await this.sequelize.models.Maths_Rock.findOne({ where: { rock_id: rockId }});
        if (rock !== null){
            let rockJSON = rock.toJSON()
            let mathsTopic = await this.getMathsTopic(rockJSON.topic_id);
            return new MathsRock(rockJSON.rock_id, rockJSON.rock_name, mathsTopic);
        }return null;
    }

    async addMathsRock(mathsRock){
        let rock = await this.sequelize.models.Maths_Rock.findOne({where: {rock_id: mathsRock.getRockId()}});
        if (rock === null){     // Checks whether the same rock already exist in the database.
            let mathsTopic = mathsRock.getMathsTopic();
            if (mathsTopic !== null){   // Checks whether the rock is related to a topic.
                let topic = await this.getMathsTopic(mathsTopic.getTopicId());
                if (topic === null){ // If the related topic does not exist in the database, throw an error.
                    throw new Error('Associated maths topic does not exist in the database.');
                } 
                await this.sequelize.models.Maths_Rock
                        .build({ rock_id: mathsRock.getRockId(), 
                            rock_name: mathsRock.getRockName(), 
                            product_key: mathsRock.getProductKey(), 
                            topic_id: mathsRock.getMathsTopic().getTopicId()
                        }).save();
            }
            else{ // If a rock is not related to a topic, set topic_id to null in the database.
                await this.sequelize.models.Maths_Rock
                        .build({ rock_id: mathsRock.getRockId(), 
                            rock_name: mathsRock.getRockName(), 
                            product_key: mathsRock.getProductKey(), 
                            topic_id: null
                        }).save();
            }
        }
    }

    async updateMathsRock(updatedMathsRock){
        let rockId = updatedMathsRock.getTopicId();
        let rock = await this.sequelize.models.Maths_Rock.findOne({ where: { rock_id: rockId }});
        if (rock !== null){ // Checks whether the rock exist in the database.
            let mathsTopic = updatedMathsRock.getMathsTopic()
            if (mathsTopic !== null){
                let topic = await this.getMathsTopic(mathsTopic.getTopicId()); // Checks whether the related topic exists in the database.
                if (topic === null) {
                    throw new Error('Associated maths topic does not exist in the database.');
                }else{
                    rock.save({rock_name: updatedMathsRock.getRockName(), product_key: updatedMathsRock.getProductKey(), topic_id: updatedMathsRock.getMathsTopic().getTopicId() })
                }
            }else{
                rock.save({rock_name: updatedMathsRock.getRockName(), product_key: updatedMathsRock.getProductKey(), topic_id: null })
            }
        }else{
            throw new Error(`Rock with ID: ${rockId} does not exist in the database.`);
        }
    }

    async deleteMathsRock(rockId){
        let rock =  await this.sequelize.models.Maths_Rock.findOne({ where: {rock_id: rockId}});
        if (rock !== null){
            await rock.destroy();
        }
    }

    // CRUD operations for Users
    async getUsersCount(){
        let query = await this.sequelize.models.User.findAndCountAll();
        return query.count;
    }

    // This does not include the rocks collections of the users.
    async getAllUsers(){
        let users_map = new Map();
        let users = await this.sequelize.models.User.findAll();
        for (let i = 0; i < users.length; i++){
            let user_json = users[i].toJSON();
            let user = new User(user_json.user_id, user_json.username, user_json.password, user_json.email, user_json.district);
            users_map.set(user_json.user_id, user);
        }
        return users_map;
    }
    // This return a map of users along with all of their collected rocks.
    async getAllUsersAndRocks(){
        let users_map = new Map();
        let users = await this.sequelize.models.User.findAll();
        let rocks_map = await this.getAllMathsRocks();
        for (let i = 0; i < users.length; i++){
            let user_json = users[i].toJSON();
            let user = new User(user_json.user_id, user_json.username, user_json.password, user_json.email, user_json.district);
            let user_rocks = await this.sequelize.models.Users_Rocks.findAll({where: {user_id: user_json.user_id}});
            for (let j = 0; j < user_rocks.length; j++){
                let rock_id = user_rocks[j].toJSON().rock_id;
                if (rocks_map.get(rock_id) !== undefined){
                    user.addRockToCollection(rocks_map.get(rock_id));
                }
            }
            users_map.set(user_json.user_id, user);
        }
        return users_map;
    }


    // This only return the user, but does not include all the collected rocks.
    async getUser(user_id){
        let user_data = await this.sequelize.models.User.findOne({where: {user_id: user_id}});
        if (user_data !== null){
            let user_json = user_data.toJSON();
            let user = new User(user_json.user_id, user_json.username, user_json.password, user_json.email, user_json.district);
            return user;
        }
        return null;
    }

    // The returned user object would include all collected rocks.
    async getUserAndRocks(user_id){
        let user_data = await this.sequelize.models.User.findOne({where: {user_id: user_id}});
        if (user_data !== null){
            let user_json = user_data.toJSON();
            let user = new User(user_json.user_id, user_json.username, user_json.password, user_json.email, user_json.district);
            let user_rocks_data = await this.sequelize.models.Users_Rocks.findAll({where: {user_id: user_json.user_id}});
            let rocks_map = await this.getAllMathsRocks();
            for (let i = 0; i < user_rocks_data.length; i++){
                let rock_id = user_rocks_data[i].toJSON().rock_id;
                if (rocks_map.get(rock_id) !== undefined){
                    user.addRockToCollection(rocks_map.get(rock_id));
                }
            }
            return user;
        }
        return null;
    }

    // Only add an user's info, but does not add the collected rocks.
    async addUser(new_user){
        await this.sequelize.models.User
                .build({
                        user_id: new_user.getUserId(), 
                        username: new_user.getUsername(), 
                        password: new_user.getPassword(), 
                        email: new_user.getEmail(), 
                        district: new_user.getDistrict()
                    }).save();
    }

    async addRockToUserCollection(user_id, rock_id){
        let user_data = await this.sequelize.models.User.findOne({where: {user_id: user_id}});
        let rock_data = await this.sequelize.models.Maths_Rock.findOne({where: {rock_id: rock_id}});
        if (user_data !== null & rock_data !== null){
            await this.sequelize.models.Users_Rocks.findOrCreate({where: {user_id: user_id, rock_id: rock_id}});
        }else{
            throw new Error(`Either ${user_id} is an invalid user ID or ${rock_id} is an invalid rock ID.`);
        }
    }

    async updateUsername(user_id, username){
        if (User.validateUsername(username)){
            let user_data = await this.sequelize.models.User.findOne({where: {user_id: user_id}});
            if (user_data !== null){
                await user_data.save({username: username});
            }else{
                throw new Error(`User with user ID: ${user_id} does not exist in the database.`)
            }
        }
    }

    async updateUserPassword(user_id, password){
        if (User.validatePassword(password)){
            let user_data = await this.sequelize.models.User.findOne({where: {user_id: user_id}});
            if (user_data !== null){
                await userData.save({password: password});
            }else{
                throw new Error(`User with user ID: ${user_id} does not exist in the database.`)
            }
        }
    }

}

/*
// An informal test case.

async function test(){

    // Create a repo instance. A singleton design pattern is used.
    repo = await PSQLRepo.getRepoInstance();

    // Populate the database.
    topics_count = await repo.getMathsTopicsCount();
    console.log(topics_count);
    topic_id = topics_count + 1;
    new_topic = new MathsTopic(topic_id, `Number ${topic_id}`, `This is number ${topic_id}`);
    await repo.addMathsTopic(new_topic);

    rocks_count = await repo.getRocksCount();
    rock_id = rocks_count + 1;
    new_rock = new MathsRock(rocks_count + 1, 'Infinity Stone', new_topic);
    await repo.addMathsRock(new_rock);

    users_count = await repo.getUsersCount();
    user_id = users_count + 1;
    user = new User(user_id, 'Thanos', 'StrongPassword', 'Email@email.com', 'Earth');
    await repo.addUser(user);

    await repo.addRockToUserCollection(user_id, rock_id);
    
    // Retrieve data
    topics = await repo.getAllMathsTopics();
    rocks = await repo.getAllMathsRocks();
    users = await repo.getAllUsersAndRocks();
    console.log(topics);
    console.log(rocks);
    console.log(users);

    // Using counts to calculate next ID is not safe if the IDs are skipping.

};

*/

test();


module.exports = PSQLRepo;

