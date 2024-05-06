const express = require("express");
const bcrypt = require("bcrypt");
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

router.post('/', async (req, res, next) => {
    try{
        const username = req.body.username;
        const email = req.body.email;
        const district = req.body.district;
        const plain_pw = req.body.password;
        const repo = await Repository.getRepoInstance();

        //check whether the email is already registered.
        let email_record = await repo.getUserByEmail(email);
        if (email_record !== null){
            return res.status(400).send({message: 'Registration failed: An account had already been registered with the same email address.'});
        }

        //check whether the username is already registered.
        let username_record = await repo.getUserByUsername(username);
        if (username_record !== null){
            return res.status(400).send({message: 'Registration failed: An account had already been registered with the same username.'});
        }

        //check password strength.
        if (!validate_password(plain_pw)){
            return res.status(400).send({message: 'Registration failed: Invalid password.\n' +
                    'Password must contains digits, uppercase, lowercase and special characters, and at least 8 characters.'});
        }

        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(plain_pw, salt);

        const user = {
            username: username, 
            password: password,
            email: email,
            salt: salt,
            district: district,
            alias: username
        };

        await repo.addUser(user);
        return res.status(201).send({message: 'Account Created!'});

    }catch(error){
        console.log(error);
        return res.status(403).send({message: 'Registration Failed'});
    }
})

module.exports = router;