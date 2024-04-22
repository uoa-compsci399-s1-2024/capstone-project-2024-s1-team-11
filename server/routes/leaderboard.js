const express = require('express');
const { User, Users_Rocks } = require('../models'); 

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    
    const users = await User.findAll();

    
    const usersWithRockCount = [];

    
    for (const user of users) {
      
      let rocksCount = 0;

      const userRocks = await Users_Rocks.findAll({
        where: {
          user_id: user.user_id
        }
      });

      rocksCount = userRocks.length;

      usersWithRockCount.push({
        user_id: user.user_id,
        username: user.username,
        rock_count: rocksCount
      });
    }

    
    usersWithRockCount.sort((a, b) => b.rock_count - a.rock_count);

    res.json(usersWithRockCount); 
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

