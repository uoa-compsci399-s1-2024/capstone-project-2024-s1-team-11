const express = require("express");
const bcrypt = require("bcrypt");
const Repository = require("../repository/repository");
const router = express.Router()

router.use(express.json());

router.post('/', async (req, res) => {
    const data = req.body;
    const username = data.username;
    const password = data.password;

    const repo = await Repository.getRepoInstance();
    try{
        let user = await repo.getUserByUsername(username);
        if (user !== null){
            if (bcrypt.compare(password, user.password)){
                req.session.user = username;
                console.log(req.session);
                return res.status(201).send({message: 'Authenticated!'});
            }
        }
        return res.status(401).send({message: 'Authentication failed!'});
    }catch(error){
        console.error(error);
        return res.status(401).send({message: 'Authentication failed!'});
    }
})

module.exports = router;