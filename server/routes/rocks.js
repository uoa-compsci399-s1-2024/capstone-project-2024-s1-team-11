const express = require("express");
const router = express.Router();
const Repository = require('../repository/repository');

router.get("/", async(req, res) => {
    console.log(req.session);
    repo = await Repository.getRepoInstance();
    repo.getAllRocks().then((rocks) => { 
        res.json(Object.fromEntries(rocks)); 
    });
});

router.get("/:rock_id", async (req, res) => {
    repo = await Repository.getRepoInstance();
    const { rock_id } = req.params;
    rock_id = Number.parseInt(rock_id);
    repo.getRock(rock_id).then((rock) => {
        res.json(rock);
    });
});

module.exports = router;
