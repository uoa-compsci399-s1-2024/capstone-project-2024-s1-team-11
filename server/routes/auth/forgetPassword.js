const bcrypt = require("bcrypt");
const express = require("express");
const Repository = require("../../repository/repository");

const router = express.Router()

router.use(express.json());

function validate_password(password){
  const SPECIAL_CHAR = /[!@#$%^&*()_+<>?]/;
  const DIGITS = /[0123456789]/;
  const LOWERCASE = /[abcdefghijklmnopqrstuvwxyz]/;
  const UPPERCASE =  /[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/;

  return SPECIAL_CHAR.test(password) && DIGITS.test(password) && LOWERCASE.test(password) && UPPERCASE.test(password) && password.length >= 8;
}

router.post('/', async (req, res) => {
  const { username, email } = req.body;
  const repo = await Repository.getRepoInstance();
  const user = await repo.getUserByUsername(username);
  if (user && user.email === email) {
    res.status(200).json({ message: "Input your new password" })
  } else {
    console.error('Error fetching user information:', error);
    res.status(500).json({ error: 'username or email is error' });
  }
});

router.post('/toChangePassword', async (req, res) => {
  const { username, newPassword } = req.body;

  //check password strength.
  if (!validate_password(newPassword)){
    return res.status(400).send({message: 'Registration failed: Invalid password.\n' +
            'Password must contains digits, uppercase, lowercase and special characters, and at least 8 characters.'});
  }

  const repo = await Repository.getRepoInstance();
  repo.getUserByUsername(username).then(async (user) => {
    const salt = await bcrypt.genSalt(10)
    repo.updateUserPassword(username, bcrypt.hashSync(newPassword, salt)).then(() => {
        res.status(200).json({ message: 'Password updated successfully' });
    }).catch(error => {
        console.error('Error updating user password:', error);
        res.status(500).json({ error: 'Failed to update user password' });
    });
  }).catch(error => {
      console.error('Error fetching user information:', error);
      res.status(500).json({ error: 'Failed to fetch user information' });
  });
});

module.exports = router;
