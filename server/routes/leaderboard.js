const express = require('express');
const { User, Users_Rocks } = require('../models');
const Repository = require("../repository/repository");
const Sequelize = require("sequelize");


const router = express.Router();

router.get('/monthly', async (req, res) => {
  try {
    const top20Users = await getUsersWithRockCount(true);
    return res.json(top20Users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const top20Users = await getUsersWithRockCount(false);
    return res.json(top20Users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Helper method for retrieving users and their rocks count.
async function getUsersWithRockCount(isMonthly) {
  const repo = await Repository.getRepoInstance();

  let usersRocksCount;

  if (isMonthly) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const year_month = `${currentYear}-${currentMonth}`;

    // Retrieve every user's user id and the number of rocks they have collected within the current month.
    // This result is ordered in descending order.
     usersRocksCount = await Users_Rocks.findAll({
      attributes: ['user_id', [repo.sequelize.fn('COUNT', repo.sequelize.col('user_id')), 'rocks_count']],
      where: {collectedAt: {[Sequelize.Op.substring]: `%${year_month}`}},
      group: 'user_id',
      order: [['rocks_count', 'DESC']]
    });
  } else{
    // Retrieve every user's user id and the number of rocks they have collected of all time.
    usersRocksCount = await Users_Rocks.findAll({
      attributes: ['user_id', [repo.sequelize.fn('COUNT', repo.sequelize.col('user_id')), 'rocks_count']],
      group: 'user_id',
      order: [['rocks_count', 'DESC']]
    });
  }

  // Extract the first 20 user ids from the above query.
  const top20_users_ids = []
  for (let i = 0; i < 20 && i < usersRocksCount.length; i++){
    top20_users_ids.push(usersRocksCount[i].user_id);
  }

  // Convert the userRocksCount list into a map.
  const usersRocksCountMap = new Map();
  usersRocksCount.map((userRocksCount) =>
      usersRocksCountMap.set(userRocksCount.user_id, userRocksCount.get("rocks_count"))
  )

  // Retrieve the top 20 users. Note, the query result might not be sorted.
  const top20_users_list = await User.findAll({
    attributes: ['user_id', 'alias', 'avatar_id'],
    where: {
      user_id: top20_users_ids
    }
  });

  // Convert the top 20 users into a map.
  const top20_users_map = new Map();
  top20_users_list.map((user) => top20_users_map.set(user.user_id, user));

  // Sort the users from the map into a list.
  const sorted_top20_users_list = [];
  top20_users_ids.map((id) => {
    const user = top20_users_map.get(id);
    let userJson = {
      user_id: user.user_id,
      alias: user.alias,
      avatar_id: user.avatar_id,
      rock_count: usersRocksCountMap.get(id)
    }
    sorted_top20_users_list.push(userJson);
  });

  return sorted_top20_users_list;
}

module.exports = router;
