const RepositoryAdapter = require("../repositoryAdapter");
const MemRepo = require("./mem-repo");


class MemRepoAdapter extends RepositoryAdapter {
    constructor(){
        super();
        this.memoryRepo = new MemRepo();
    }
    async getAllMathsTopics(){
        return this.memoryRepo.getAllMathsTopics();
    }

    async getMathsTopic(topicId){
        return this.memoryRepo.getMathsTopic(topicId);
    }

    async addMathsTopic(mathsTopic){
        this.memoryRepo.addMathsTopic(mathsTopic);
    }

    async updateMathsTopic(updatedMathsTopic){
        this.memoryRepo.updateMathsTopic(updatedMathsTopic);
    }

    async deleteMathsTopic(topicId){
        this.memoryRepo.deleteMathsTopic(topicId);
    }

    async getMathsRock(rockId){
        return this.memoryRepo.getMathsRock(rockId);
    }

    async addMathsRock(mathsRock){
        this.memoryRepo.addMathsRock(mathsRock);
    }

    async updateMathsRock(updatedMathsRock){
        this.memoryRepo.updateMathsRock(updatedMathsRock);
    }

    async deleteMathsRock(rockId) { 
        this.memoryRepo.deleteMathsRock(rockId); 
    }

    async getUser(userId) { 
        this.memoryRepo.getUser(userId);
     }

    async addUser(user) { 
        this/this.memoryRepo.addUser(user);
     }

    async updateUser(updatedUser) { 
        this.memoryRepo.updateUser(updatedUser);
     }

    async deleteUser(userId) { 
        this.memoryRepo.deleteUser(userId); 
    }
}

module.exports = MemRepoAdapter;