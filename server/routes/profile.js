const express = require('express');
const { User, Users_Rocks, Users_Badges, Rock, Badge } = require('../models'); 
const Repostitory = require('../repository/repository');

const router = express.Router();

router.use(express.json());

router.get('/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userRocks = await Users_Rocks.findAll({
      where: {
        user_id: user_id
      }
    });

    const rocksPromises = userRocks.map(userRock =>
      Rock.findByPk(userRock.rock_id)
    );

    const userBadges = await Users_Badges.findAll({
        where: {
          user_id: user_id
        }
      });

    const badgesPromises = userBadges.map(userBadge =>
        Badge.findByPk(userBadge.badge_id)
      );

    const rocks = await Promise.all(rocksPromises);
    const badges = await Promise.all(badgesPromises);

    res.json({
        user_id: user.user_id,
        username: user.username,
        alias: user.alias,
        email: user.email,
        district: user.district,
        rocks: rocks.map(rock => ({
          rock_id: rock.rock_id,
          name: rock.rock_name,
        })),
        badges: badges.map(badge => ({
          badge_id: badge.badge_id,
          name: badge.badge_title,
        })),
        rock_count: rocks.length, 
      });
    } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:user_id/username', async (req, res) => {
  try {
    const { user_id } = req.params;
    const { username } = req.body;

    const existingUser = await User.findOne({ where: { username: username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.username = username;
    await user.save();

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating username:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:user_id/email', async (req, res) => {
  try {
    const { user_id } = req.params;
    const { email } = req.body;

    const existingEmail = await User.findOne({ where: { email: email } });
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.email = email;
    await user.save();

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

