const bcrypt = require("bcrypt");
const SECRET_KEY = require("../../utils/secretKeyGenerator");

export default function authenticate(req, res, next){
    const username = req.body.username;
    const signature = req.body.signature

    if (!bcrypt.compare(signature, username + SECRET_KEY)){
        return res.status(401).send({message: 'Unauthorized: Authentication failed.'});
    }
    next();
}