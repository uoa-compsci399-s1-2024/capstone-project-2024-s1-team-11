const express = require("express");
const bcrypt = require("bcrypt");
const Repository = require("../repository/repository");
const router = express.Router()

router.use(express.json());

router.get("/", async(req, res) => {
    console.log(req.session);
    repo = await Repository.getRepoInstance();
    repo.getAllBadges().then((badges) => { 
        res.json(Object.fromEntries(badges)); 
    });
});

router.get("/:user_id", async (req, res) => {
    repo = await Repository.getRepoInstance();
    let { user_id } = req.params;
    repo.getUserBadges(user_id).then((badges) => {
        res.json(badges);
    });
});

module.exports = router;