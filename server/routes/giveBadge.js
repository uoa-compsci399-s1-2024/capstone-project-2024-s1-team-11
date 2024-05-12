const express = require("express");
const router = express.Router();
const Repository = require('../repository/repository');

router.use(express.json());

router.post('/', async (req, res) => {
    const data = req.body;
    const user_id = data.user_id;

    const repo = await Repository.getRepoInstance();
    try {
        const userRocksCount = await repo.getUserRocksCount(user_id);
        const t_badge_id = (userRocksCount / 10) + 2;
        if (userRocksCount === 1) {
            await repo.giveBadgeToUser(user_id, 1);
            res.status(200).json({ message: '1st Badge given to User' });
        } else if (userRocksCount === 5) {
            await repo.giveBadgeToUser(user_id, 2);
            res.status(200).json({ message: '2nd Badge given to User' });
        } else if (userRocksCount === 10) {
            await repo.giveBadgeToUser(user_id, 3);
            res.status(200).json({ message: '3rd Badge given to User' });
        } else if (userRocksCount % 10 === 0) {
            await repo.giveBadgeToUser(user_id, t_badge_id);
            res.status(200).json({ message: '4th and upwards Badge given to User' });
        } else {
            res.status(201).json({ message: 'User ineligible for badges rn' });
        }
    } catch (error) {
        console.error('Error giving User badge:', error);
        res.status(500).json({ error: 'Failed to give User badge' });
    }
})
module.exports = router;
