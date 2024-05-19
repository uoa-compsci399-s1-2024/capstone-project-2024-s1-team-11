const express = require("express");
const router = express.Router();
const Repository = require('../repository/repository');


router.use(express.json());

router.get('/', async (req, res) => {
    try {
        const repo = await Repository.getRepoInstance();
        const avatars = await repo.getAllAvatars();
        return res.json(avatars);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:avatar_id', async (req, res) => {
    try {
        const repo = await Repository.getRepoInstance();
        const {avatar_id} = req.params;
        const avatar = await repo.getAvatar(Number.parseInt(avatar_id));
        return res.json(avatar);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;