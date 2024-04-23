const express = require("express");
const bcrypt = require("bcrypt");
const Repository = require("../repository/repository");
const router = express.Router()

router.use(express.json());

router.post('/', async (req, res) => {
    const data = req.body;
    const username = data.username;
    const email = data.email;
    const district = data.district;
    const alias = username;

    const salt = await bcrypt.genSalt(1);
    const password = await bcrypt.hash(data.password, salt);

    const user = {
        username: username, 
        password: password,
        email: email,
        salt: salt,
        district: district,
        alias: alias
    };

    const repo = await Repository.getRepoInstance();
    try{
        await repo.addUser(user);
        res.status(201).send({message: 'Account Created!'});
    }catch(error){
        res.status(403).send({message: 'Registration failed due to: Username/email is already registered.'});
    }
})

module.exports = router;