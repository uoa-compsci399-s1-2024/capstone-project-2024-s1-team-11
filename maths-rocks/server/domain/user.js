const MathsRock = require("./maths-rock");

class User {
    constructor(userId, username, password) {
        if (!(Number.isInteger(userId))){
            throw new Error('Invalid Id type: Id must be an integer.');
        }
        if (!(username instanceof String)){
            throw new Error('Invalid username type: Username must be a string object.');
        }
        if (!(password instanceof String)){
            throw new Error('Invalid password type: Password must be a string object.');
        }
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.rocksCollection = new Map();
    }

    getUserId(){
        return this.userId;
    }

    setUserId(userId){
        if (!(Number.isInteger(userId))){
            throw new Error('Invalid Id type: Id must be an integer.');
        }
        this.userId = userId;
    }

    getUsername(){
        return this.username;
    }

    setUsername(username){
        if (!(username instanceof String)){
            throw new Error('Invalid username type: Username must be a string object.');
        }
        this.username = username;
    }

    getPassword(){
        return this.password;
    }

    setPassword(password){
        if (!(password instanceof String)){
            throw new Error('Invalid password type: Password must be a string object.');
        }
        this.password = password;
    }

    getRocksCollection(){
        return this.rocksCollection;
    }

    addRockToCollection(mathsRock){
        if (!(mathsRock instanceof MathsRock)){
            throw new Error('Invalid mathsRock type: MathsRock must be a MathsRock object.');
        }
        this.rocksCollection.set(mathsRock.getRockId(), mathsRock);
    }

    removeRockFromCollection(mathsRock){
        if (!(mathsRock instanceof MathsRock)){
            throw new Error('Invalid mathsRock type: MathsRock must be a MathsRock object.');
        }
        this.rocksCollection.delete(mathsRock.getRockId());
    }
}

module.exports = User;