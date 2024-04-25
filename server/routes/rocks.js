const express = require("express");
const router = express.Router();
const Repository = require('../repository/repository');

router.get("/", async (req, res) => {
    try {
        const repo = await Repository.getRepoInstance();
        const rocks = await repo.getAllRocks();
        res.json(rocks);
    } catch (error) {
        console.error('Error fetching rocks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const repo = await Repository.getRepoInstance();
        const { id } = req.params;
        const rock = await repo.getRock(id);
        if (!rock) {
            return res.status(404).json({ error: 'Rock not found' });
        }
        res.json(rock);
    } catch (error) {
        console.error('Error fetching rock:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
