const MathsTopic = require('../../domain/maths-topic');
const {sequelize, Model }= require('./psql-orm');

class PSQLRepo {

    constructor(){}

    async getAllMathsTopics(){
        return await sequelize.models.Maths_Topic.findAll().then((topics) => {
            let topics_list = [];
            topics.forEach((topic) => {
                let topicJSON = topic.toJSON();
                topics_list.push(new MathsTopic(topicJSON.topic_id, topicJSON.title, topicJSON.description));
            });
            return topics_list;
        });
    }

    async getMathsTopic(topic_id){
        return await sequelize.models.Maths_Topic.findOne({ where: {topic_id: topic_id}}).then((topic) => {
            return topic.toJSON()
        }).then((topicJSON) => {
            return new MathsTopic(topicJSON.topic_id, topicJSON.title, topicJSON.description);
        });
    }
}

repo = new PSQLRepo();
topics = repo.getAllMathsTopics().then((topics) => console.log(topics));
topic = repo.getMathsTopic(1).then((topic) => {console.log(topic)});
