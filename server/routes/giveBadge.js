const express = require("express");
const router = express.Router();
const Repository = require('../repository/repository');

router.use(express.json());

router.post('/', async (req, res) => {
    const data = req.body;
    const user_id = data.user_id;

    const repo = await Repository.getRepoInstance();
    const userRocksCount = repo.getUserRocksCount(user_id);
    const t_badge_id = (userRocksCount / 10) + 2;
    try {
        if (userRocksCount === 1) {
            repo.giveBadgeToUser(user_id, 1);
            res.status(200).json({ message: '1st Badge given to User' });
        } else if (userRocksCount === 5) {
            repo.giveBadgeToUser(user_id, 2);
            res.status(200).json({ message: '2nd Badge given to User' });
        } else if (userRocksCount === 10) {
            repo.giveBadgeToUser(user_id, 3);
            res.status(200).json({ message: '3rd Badge given to User' });
        } else if (userRocksCount % 10 === 0) {
            repo.giveBadgeToUser(user_id, t_badge_id);
            res.status(200).json({ message: '4th and upwards Badge given to User' });
        }
    } catch (error) {
        console.error('Error giving User badge:', error);
        res.status(500).json({ error: 'Failed to give User badge' });
    }
})
module.exports = router;
