const bcrypt = require("bcrypt");
const express = require("express");
const Repository = require("../../repository/repository");
const SECRET_KEY = require("../../utils/secretKeyGenerator")


const router = express.Router()

router.use(express.json());

router.post('/', async (req, res) => {
    try{
        const username = req.body.username;
        const password = req.body.password;
        const repo = await Repository.getRepoInstance();
        let user = await repo.getUserByUsername(username);
        if (user !== null && bcrypt.compare(password, user.password)){
            const signature = await bcrypt.hash(username + SECRET_KEY, 10);
            req.session.user = username;
            req.session.signature = signature;
            console.log(req.session);
            return res.status(201).json({username: username, user_id: user.user_id, signature: signature});
        }
        return res.status(401).send({message: 'Authentication failed.'});
    }catch(error){
        console.error(error);
        return res.status(401).send({message: 'Authentication failed.'});
    }
})


module.exports = router;