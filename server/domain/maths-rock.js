const MathsTopic = require("./maths-topic")

class MathsRock {

    constructor(rockId, rockName, mathsTopic){
        if (!(Number.isInteger(rockId))){
            throw new Error('Invalid Id type: Id must be an integer.');
        }
        if (typeof(rockName) !== 'string'){
            throw new Error('Invalid RockName type: RockName must be a string.');
        }
        if (!(mathsTopic instanceof MathsTopic) & (mathsTopic !== null)){
            throw new Error('Invalid MathsTopic type: MathsTopic must be a MathsTopic object or null.');
        }
        this.rockId = rockId;
        this.rockName = rockName;
        this.mathsTopic = mathsTopic;
        this.productKey = null;
        this.generateProductkey(); // Will redesign the hash function in future.
    }

    getRockId(){
        return this.rockId;
    }

    getRockName(){
        return this.rockName;
    }

    getMathsTopic(){
        return this.mathsTopic;
    }

    getProductKey(){
        return this.productKey;
    }

    generateProductkey(){
        if (this.rockId !== null){
            let numString = this.hashRockId();
            this.productKey = this.rockId.toString() + this.ceasarCypher(numString);
        }
    }

    hashRockId(){
        if (this.rockId !== null){
            let hashNum = (98715473 * 13 * this.rockId) % 77787637;
            return hashNum.toString();
        }
    }

    ceasarCypher(numString){
        if (this.rockId !== null){
            const symbolSet = '0123456789aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ';
            const symbolSetSize = symbolSet.length;
            let rotation = 7;
            let cypherText = '';
            let count = 3;
            [...numString].forEach((numChar) => {
                let num = Number.parseInt(numChar);
                let cypherChar = symbolSet[(num * count * rotation) % symbolSetSize];
                cypherText += cypherChar;
                count += num;
            })
            return cypherText;
        }
    }

}


module.exports = MathsRock;