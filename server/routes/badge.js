const express = require("express");
const router = express.Router();
const Repository = require('../repository/repository');

router.get("/", async(req, res) => {
    console.log(req.session);
    repo = await Repository.getRepoInstance();
    repo.getAllBadges().then((badges) => { 
        res.json(Object.fromEntries(badges)); 
    });
});

module.exports = router;
