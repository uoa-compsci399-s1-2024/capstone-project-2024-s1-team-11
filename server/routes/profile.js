const express = require('express');
const { User, Users_Rocks, Users_Badges, Rock, Badge} = require('../models'); 
const { authenticate } = require("./authentication/login");
const Repostitory = require('../repository/repository');


const router = express.Router();

router.use(authenticate);

router.get('/', async (req, res) => {
    try {
        const repo = Repostitory.getRepoInstance();
        const user_id = req.body.user_id;
        const user = await repo.getUser(user_id);
        if (!user) { return res.status(404).json({ error: 'User not found' });}
        const user_rocks = await repo.getUserRocks();
        const user_badges = await repo.getUserBadges();

        const rockId_name_map = new Map();
        for (const [rock_id, rock] of user_rocks) {
            rockId_name_map.set(rock_id, rock.rock_name);
        }

        const badgeId_title_map = new Map();
        for (const [badge_id, badge] of user_badges) {
            badgeId_title_map.set(badge_id, badge.badge_title);
        }

        return res.json({
            user_id: user.user_id,
            username: user.username,
            alias: user.alias,
            email: user.email,
            district: user.district,
            rocks: rockId_name_map,
            badges: badgeId_title_map,
            rock_count: user_rocks.length,
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
