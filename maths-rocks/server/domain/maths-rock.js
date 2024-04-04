const MathsTopic = require("./maths-topic")

class MathsRock {

    constructor(rockId, mathsTopic){
        if (!(Number.isInteger(rockId))){
            throw new Error('Invalid Id type: Id must be an integer.');
        }
        if (!(mathsTopic instanceof MathsTopic)){
            throw new Error('Invalid MathsTopic type: MathsTopic must be a MathsTopic object.');
        }
        this.rockId = rockId;
        this.mathsTopic = mathsTopic;
    }

    getRockId(){
        return this.rockId;
    }

    getMathsTopic(){
        return this.mathsTopic;
    }
}

module.exports = MathsRock;