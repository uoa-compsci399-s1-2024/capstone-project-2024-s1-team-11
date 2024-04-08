const MathsRock = require("./maths-rock");

class User {
    constructor(userId, username, password, email, district) {
        if (!(Number.isInteger(userId))){
            throw new Error('Invalid Id type: Id must be an integer.');
        }
        if (!(typeof(email) === 'string') & (email !== null)){
            throw new Error('Invalid email type: Email must be a string object or null.');
        }
        if (!(typeof(district) === 'string') & (district !== null)){
            throw new Error('Invalid district type: District must be a string object or null.');
        }
        User.validateUsername(username);
        User.validatePassword(password);

        this.userId = userId;
        this.username = username;
        this.password = password;
        this.email = email;
        this.district = district;
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

    getEmail(){
        return this.email;
    }

    setEmail(email){
        this.email = email;
    }

    getDistrict(){
        return this.district;
    }

    setDistrict(district){
        if (!(district instanceof String)){
            throw new Error('Invalid district type: District must be a string object.');
        }
        this.district = district;
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

    // Todo: modify this function such that no special characters are allowed.
    static validateUsername(username){
        if (typeof(username) === 'string'){
            if (username.length >= 3){
                return true;
            }
        }
        throw new Error('Invalid username: Username must be a string, and must be at least 3 characters long.')
    }

    // Todo: modify this function such that it must include uppercase, lowercase and digits.
    static validatePassword(password){
        if (typeof(password) === 'string'){
            if (password.length >= 8){
                return true;
            }
        }
        throw new Error('Invalid password: Password must be a string, and must be at least 8 characters long.')
    }
}

module.exports = User;