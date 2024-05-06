const express = require("express");
const router = express.Router();
const Repository = require('../repository/repository');

router.get("/", async(req, res) => {
    console.log(req.session);
    repo = await Repository.getRepoInstance();
    repo.getAllUsers().then((users) => { 
        res.json(Object.fromEntries(users)); 
    });
});

router.get("/:username", async (req, res) => {
    repo = await Repository.getRepoInstance();
    let { username } = req.params;
    repo.getUserByUsername(username).then((user) => {
        res.json(user);
    }).catch(error => {
        console.error('Error fetching user information:', error);
        res.status(500).json({ error: 'Failed to fetch user information' });
    });
});

module.exports = router;
