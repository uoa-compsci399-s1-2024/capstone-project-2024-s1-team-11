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
    let { rock_id } = req.params;
    rock_id = Number.parseInt(rock_id);
    repo.getRock(rock_id).then((rock) => {
        res.json(rock);
    });
});

router.post("/:rock_id/add-to-collection", async (req, res) => {
    const { user_id, rock_id } = req.body;
    try {
        repo = await Repository.getRepoInstance();
        await Repository.addRockToUserCollection(user_id, rock_id);
        res.status(200).json({ message: 'Rock added to collection successfully' });
    } catch (error) {
        console.error('Error adding rock to collection:', error);
        res.status(500).json({ error: 'Failed to add rock to collection' });
    }
});

module.exports = router;
