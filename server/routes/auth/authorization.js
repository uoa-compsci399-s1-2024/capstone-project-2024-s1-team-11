const bcrypt = require("bcrypt");
const express = require("express");
const Repository = require("../../repository/repository");
const SECRET_KEY = require("../../utils/secretKeyGenerator")
const authenticate = require("./authenticate")


const router = express.Router()

router.use(express.json());
router.use(authenticate);
router.post('/', async (req, res) => {
    try{
        const username = req.body.username;
        const repo = await Repository.getRepoInstance();
        let user_priv = await repo.getUserPrivilege(username);
        if (user_priv){
            console.log("successful authorization");
            return res.status(200).send({ message: 'Authorized: Admin Access.'});
        }
        return res.status(403).send({message: 'Access Forbidden: No Admin Privilege.'});
    }catch(error){
        console.error(error);
        return res.status(500).send({message: 'Internal Server Error'});
    }
})


module.exports = router;