const express = require("express");
const Repository = require("../../repository/repository");
const authenticate = require("./authenticate")


const router = express.Router()

router.use(express.json());
router.use(authenticate);
router.post('/', async (req, res) => {
    try{
        if (req.body !== null && req.body !== {}) {
            const username = req.body.username;
            const repo = await Repository.getRepoInstance();
            let user_privilege = await repo.getUserPrivilege(username);
            if (user_privilege) {
                console.log("successful authorization");
                return res.status(200).send({message: 'Authorized: Admin Access.'});
            }
        }
        return res.status(403).send({message: 'Access Forbidden: No Admin Privilege.'});
    }catch(error){
        console.error(error);
        return res.status(500).send({message: 'Internal Server Error'});
    }
})

async function authorize(req, res, next) {
    try {
        if (req.body !== null && req.body !== {}) {
            const username = req.body.username;
            const repo = await Repository.getRepoInstance();
            let user_privilege = await repo.getUserPrivilege(username);
            if (user_privilege) {
                console.log("Successful Authorization With Authorize Middleware");
                return next();
            }
        }
        return res.status(403).send({message: 'Access Forbidden: No Admin Privilege.'});
    } catch (error) {
        console.error(error);
        return res.status(500).send({message: 'Internal Server Error'});
    }
}

module.exports = {router, authorize};