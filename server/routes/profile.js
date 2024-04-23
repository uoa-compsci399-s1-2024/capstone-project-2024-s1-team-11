const express = require('express');
const { User, Users_Rocks, Users_Badges, Rock, Badge} = require('../models'); 
const Repostitory = require('../repository/repository');

const router = express.Router();

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

module.exports = router;
