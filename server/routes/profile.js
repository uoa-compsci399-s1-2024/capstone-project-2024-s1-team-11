const express = require('express');
const bcrypt = require("bcrypt");
const { User, Users_Rocks, Users_Badges, Rock, Badge, Avatar} = require('../models');
const authenticate = require("./auth/authenticate");
const Repository = require('../repository/repository');

const router = express.Router();

router.use(express.json());

// Authenticate the users before they could access their profile page.
router.use(authenticate);

// Route for fetching user data, to render profile page.
router.post('/', async (req, res) => {
    try {
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

        let avatar_imageUri = "default_avatar.jpg";
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

// Route for changing users' alias.
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
        return res.status(201).json({ message: "Alias is updated!" });
    } catch (error) {
        console.error('Error updating username:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Route for changing users' email.
router.put('/setEmail', async (req, res) => {
    try {
        const { user_id, newEmail, password } = req.body;

        const repo = await Repository.getRepoInstance();

        const existingEmail = await repo.getUserByEmail(newEmail);
        if (existingEmail) {
            return res.status(400).json({ error: 'This email is already registered.' });
        }
        const user = await repo.getUser(user_id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (isPasswordCorrect){
            user.email = newEmail;
            await repo.updateUser(user);
            return res.status(201).json({ message: "Email is updated!" });
        }
        else{
            return res.status(403).json({ error: "Incorrect password."})
        }
    }catch (error) {
        console.error('Error updating email:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Route for changing user's password.
router.put('/setPassword', async (req, res) => {

    //Helper method for validating password strength.
    function validate_password(password){
        const SPECIAL_CHAR = /[!@#$%^&*()_+<>?]/;
        const DIGITS = /[0123456789]/;
        const LOWERCASE = /[abcdefghijklmnopqrstuvwxyz]/;
        const UPPERCASE =  /[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/;

        return SPECIAL_CHAR.test(password) && DIGITS.test(password) && LOWERCASE.test(password) && UPPERCASE.test(password) && password.length >= 8;
    }

    try {
        const { user_id, oldPassword, newPassword, newPasswordRetype } = req.body;

        const repo = await Repository.getRepoInstance();
        const user = await repo.getUser(user_id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (newPassword !== newPasswordRetype) {
            return res.status(403).json({ error: 'The new password you have retyped does not match the new password.' });
        }

        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
        if (isPasswordCorrect){
            if (validate_password(newPassword)) {
                const salt = await bcrypt.genSalt(10)
                user.password = await bcrypt.hash(newPassword, salt);
                user.salt = salt;
                await repo.updateUser(user);
                return res.status(201).json({message: "Password updated successfully!"});
            }else{
                return res.status(403).json(
                    { error: 'New password must contains digits, uppercase, lowercase and special characters.' }
                );
            }
        }
        else{
            return res.status(403).json({ error: "Incorrect old password."})
        }

    }catch (error) {
        console.error('Error updating password:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Route for changing user's avatar.
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

// Route for deleting user's account.
router.delete('/deleteAccount', async (req, res) => {
    const repo = await Repository.getRepoInstance();
    try{
        const {user_id, password} = req.body
        const user = await repo.getUser(Number.parseInt(user_id));
        if (user === null){
            return res.status(404).json({error: "User not found."})
        }
        if (await bcrypt.compare(password, user.password)) {
            await repo.deleteUser(user_id);
            return res.status(201).json({message: "Account deleted."})
        } else{
            return res.status(403).json({error: "Incorrect password"})
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router;
