const express = require('express');
const { User, Users_Rocks, Avatar } = require('../models'); 

const router = express.Router();

router.get('/monthly', async (req, res) => {
  try {
    const users = await User.findAll();
    const usersWithRockCount = await getUsersWithRockCount(users);

    usersWithRockCount.sort((a, b) => b.rock_count - a.rock_count);
    const top20 = usersWithRockCount.slice(0, 20);

    res.json(top20); 
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    const usersWithRockCount = await getUsersWithRockCount(users);

    usersWithRockCount.sort((a, b) => b.rock_count - a.rock_count);
    const top20 = usersWithRockCount.slice(0, 20);

    res.json(top20); 
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

async function getUsersWithRockCount(users) {
  const usersWithRockCount = [];
  
  for (const user of users) {
    let rocksCount = 0;

    const userRocks = await Users_Rocks.findAll({
      where: {
        user_id: user.user_id
      }
    });

    const userAvatar = await Avatar.findByPk(user.avatar_id);
    const avatarImageUri = userAvatar ? userAvatar.imageUri : null;

    rocksCount = userRocks.length;

    usersWithRockCount.push({
      user_id: user.user_id,
      username: user.username,
      rock_count: rocksCount,
      avatar: avatarImageUri
    });
  }

  return usersWithRockCount;
}

router.get('/avatars', async (req, res) => {
  try {
      const avatars = await Avatar.findAll({
          attributes: ['avatar_id', 'imageUri']
      });
      return res.json(avatars);
  } catch (error) {
      console.error('Error fetching avatars:', error);
      return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
