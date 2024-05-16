const bcrypt = require("bcrypt");
const express = require("express");
const Repository = require("../../repository/repository");
const SECRET_KEY = require("../../utils/secretKeyGenerator")


const router = express.Router()

router.use(express.json());

router.post('/', async (req, res) => {
    try{
        const [username, password] = [req.body.username, req.body.password];
        const repo = await Repository.getRepoInstance();
        let user = await repo.getUserByUsername(username);
        if (user !== null && await bcrypt.compare(password, user.password)){
            const signature = await bcrypt.hash(username + user.user_id + SECRET_KEY, 10);
            return res.status(201).json({username: username, user_id: user.user_id, signature: signature});
        }
        return res.status(401).send({message: 'Authentication failed.'});
    }catch(error){
        console.error(error);
        return res.status(401).send({message: 'Authentication failed.'});
    }
})


module.exports = router;