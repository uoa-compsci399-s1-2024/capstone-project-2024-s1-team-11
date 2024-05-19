const express = require('express');
const { User, Users_Rocks, Users_Badges, Rock, Badge, Avatar} = require('../models'); 
const authenticate = require("./auth/authenticate");
const Repository = require('../repository/repository');

const router = express.Router();

router.use(express.json());
router.use(authenticate);

router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const user_id = req.body.user_id;
        const repo = await Repository.getRepoInstance();
        const user = await repo.getUser(user_id.valueOf());
        if (!user) { return res.status(404).json({ error: 'User not found' });}
        const user_rocks = await repo.getUserRocks(user_id);
        const user_badges = await repo.getUserBadges(user_id);
        const user_avatar = await repo.getUserAvatar(user_id);

        const rocks_list = [];
        for (const [rock_id, rock] of user_rocks) {
            rocks_list.push(rock);
        }

        const badges_list = [];
        for (const [badge_id, badge] of user_badges) {
            badges_list.push(badge);
        }

        let avatar_imageUri = "avatar-00.jpg";
        if (user_avatar !== null) {
            avatar_imageUri = user_avatar.imageUri;
        }

    return res.json({
        user_id: user.user_id,
        username: user.username,
        alias: user.alias,
        email: user.email,
        district: user.district,
        rocks: rocks_list,
        badges: badges_list,
        rock_count: rocks_list.length,
        avatar_imageUri: avatar_imageUri
    });

    } catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/setAlias', async (req, res) => {
    try {
        const { user_id, alias } = req.body;
        const repo = await Repository.getRepoInstance();
        const user = await repo.getUser(user_id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.alias = alias;
        await repo.updateUser(user);
        return res.json({ success: true });
    } catch (error) {
        console.error('Error updating username:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/email', async (req, res) => {
    try {
        const { user_id, newEmail } = req.body;
        const existingEmail = await User.findOne({ where: { email: newEmail } });
        if (existingEmail) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.email = newEmail;
        await user.save();

        res.json({ success: true });
        } catch (error) {
            console.error('Error updating email:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
});

router.put('/setAvatar', async (req, res) => {
    const repo = await Repository.getRepoInstance();
    try{
        const {user_id, avatar_id} = req.body
        const user = await repo.getUser(Number.parseInt(user_id));
        user.avatar_id = avatar_id;
        await repo.updateUser(user);
        return res.status(201).json({message: "Avatar Updated!"})
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: 'Internal server error' });
    }
})
module.exports = router;
