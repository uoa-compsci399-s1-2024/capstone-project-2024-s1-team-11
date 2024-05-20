const express = require("express");
const bcrypt = require("bcrypt");
const Repository = require("../repository/repository");
const router = express.Router()

router.use(express.json());

router.post('/', async (req, res) => {
    const data = req.body;
    const user_id = data.user_id;
    const rock_id = data.rock_id;

    const repo = await Repository.getRepoInstance();
    try {
        await repo.addRockToUserCollection(user_id, rock_id);
        return res.status(200).json({ message: 'Rock added to collection successfully' });
    } catch (error) {
        console.error('Error adding rock to collection:', error);
        return res.status(500).json({ error: 'Failed to add rock to collection' });
    }
})

module.exports = router;