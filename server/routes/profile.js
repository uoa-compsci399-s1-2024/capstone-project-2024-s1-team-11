const express = require('express');
const { User, Users_Rocks, Users_Badges, Rock, Badge} = require('../models'); 
const authenticate = require("./auth/authenticate");
const Repository = require('../repository/repository');


const router = express.Router();
router.use(express.json());
router.use(authenticate);

router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const repo = await Repository.getRepoInstance();
        const user_id = req.body.user_id;
        const user = await repo.getUser(user_id.valueOf());
        if (!user) { return res.status(404).json({ error: 'User not found' });}
        const user_rocks = await repo.getUserRocks(user_id);
        const user_badges = await repo.getUserBadges(user_id);

        const rocks_list = [];
        for (const [rock_id, rock] of user_rocks) {
            rocks_list.push(rock);
        }

        const badges_list = [];
        for (const [badge_id, badge] of user_badges) {
            badges_list.push(badge);
        }

        return res.json({
            user_id: user.user_id,
            username: user.username,
            alias: user.alias,
            email: user.email,
            district: user.district,
            rocks: rocks_list,
            badges: badges_list,
            rock_count: user_rocks.length,
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
