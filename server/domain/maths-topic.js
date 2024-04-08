class MathsTopic {

    constructor(topicId, title, description){
        if (!(Number.isInteger(topicId))){
            throw new Error('Invalid Id type: Id must be an integer.');
        }
        if (!(typeof(title) === "string")){
            throw new Error('Invalid title type: Title must be a string object.');
        }
        
        if (!(typeof(description) === "string")){
            throw new Error('Invalid description type: Description must be a string object.');
        }
        this.topicId = topicId;
        this.title = title;
        this.description = description;
    }

    getTopicId(){
        return this.topicId
    }

    getTitle(){
        return this.title;
    }

    getDescription(){
        return this.description;
    }

}

module.exports = MathsTopic;