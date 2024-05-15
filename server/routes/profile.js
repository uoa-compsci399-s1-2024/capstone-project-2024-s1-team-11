const express = require('express');
const { User, Users_Rocks, Users_Badges, Rock, Badge, Avatar, Topic} = require('../models'); 
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
        const user2 = await User.findByPk(user_id);

        if (!user2) {
            return res.status(404).json({ error: 'User not found' });
        }
        const user = await repo.getUser(user_id.valueOf());
        if (!user) { return res.status(404).json({ error: 'User not found' });}
        const user_rocks = await repo.getUserRocks(user_id);
        const user_badges = await repo.getUserBadges(user_id);

        const rocks_list = [];
for (const [rock_id, rock] of user_rocks) {
    
    const topic = await Topic.findByPk(rock.topic_id);

    rock.topicImageUri = topic ? topic.imageUri : null;

    rocks_list.push(rock);
}

        const badges_list = [];
        for (const [badge_id, badge] of user_badges) {
            badges_list.push(badge);
        }

        const userAvatar = await Avatar.findByPk(user.avatar_id);
        const avatarImageUri = userAvatar ? userAvatar.imageUri : null;

        return res.json({
            user_id: user.user_id,
            username: user.username,
            alias: user.alias,
            email: user.email,
            district: user.district,
            avatar: avatarImageUri,
            rocks: rocks_list,
            badges: badges_list,
            rock_count: rocks_list.length
        });

        

    } catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/username', async (req, res) => {
  try {
    const { user_id, newUsername } = req.body;

    const repo = await Repository.getRepoInstance();

  
    const existingUser = await repo.getUserByUsername(newUsername);
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const user = await repo.getUser(user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.username = newUsername;
    await repo.updateUser(user);

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating username:', error);
    res.status(500).json({ error: 'Internal server error' });
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
      res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/avatar', async (req, res) => {
  try {
    const { user_id, selectedAvatar } = req.body;
    
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.avatar_id = selectedAvatar;
    await user.save();

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating avatar:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;
