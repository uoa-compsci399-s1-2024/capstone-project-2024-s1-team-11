const MathsTopic = require("../../domain/maths-topic")
const MathsRock = require("../../domain/maths-rock")
const user = require("../../domain/user")


class MemRepo {
    constructor(){
        this.mathsTopics = new Map();
        this.mathsRocks = new Map();
        this.users = new Map();
    }

    getAllMathsTopics(){
        return this.mathsTopics;
    }

    getMathsTopic(topicId){
        return this.mathsTopics.get(topicId);
    }

    addMathsTopic(mathsTopic){
        if (!(mathsTopic instanceof MathsTopic)){
            throw new Error('Invalid MathsTopic type: MathsTopic must be a MathsTopic object.');
        }
        if (this.mathsTopics.get(mathsTopic.getTopicId()) === undefined){
            this.mathsTopics.set(mathsTopic.getTopicId(), mathsTopic);
        } else{
            throw new Error('Duplicated primary key error: A topic with the same id already exists.');
        }
    }

    updateMathsTopic(updatedMathsTopic){
        if (!(updatedMathsTopic instanceof MathsTopic)){
            throw new Error('Invalid MathsTopic type: MathsTopic must be a MathsTopic object.');
        }
        this.mathsTopics.set(mathsTopic.getTopicId(), mathsTopic);
    }

    deleteMathsTopic(topicId){
        this.mathsTopics.delete(topicId);
    }

    getMathsRock(rockId){
        return this.mathsRocks.get(rockId);
    }

    addMathsRock(mathsRock){
        if (!(mathsRock instanceof MathsRock)){
            throw new Error('Invalid mathsRock type: MathsRock must be a MathsRock object.');
        }
        this.mathsRocks.set(mathsRock.getRockId(), mathsRock);
    }

    updateMathsRock(updatedMathsRock){
        this.mathsRocks.set(updatedMathsRock.getRockId(), updatedMathsRock);
    }

    deleteMathsRock(rockId){
        this.mathsRocks.delete(rockId);
    }

    getUser(userId){
        return this.users.get(userId);
    }

    addUser(user){
        if (!(user instanceof User)){
            throw new Error('Invalid user type: User must be an user object.');
        }
    }

    updateUser(updatedUser){
        this.users.set(updatedUser.getUserId(), updatedUser);
    }

    deleteUser(userId){
        this.users.delete(userId);
    }
}

module.exports = MemRepo;