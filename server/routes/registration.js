const express = require("express");
const bcrypt = require("bcrypt");
const Repository = require("../repository/repository");
const router = express.Router()

router.use(express.json());

function validate_password(password){
    const special_chars = /[!@#$%^&*()_+<>?]/;
    const digits = /[0123456789]/;
    const lowercase = /[abcdefghijklmnopqrstuvwxyz]/;
    const uppercase =  /[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/;

    if ( special_chars.test(password) && digits.test(password) && lowercase.test(password) && uppercase.test(password) && password.length >=8 ){
        return true;
    } return false;
    
}

router.post('/', async (req, res) => {
    const data = req.body;
    const username = data.username;
    const email = data.email;
    const district = data.district;
    const alias = username;
    const plain_pw = data.password;

    try{
        const repo = await Repository.getRepoInstance();

        //check whether the email is already registered.
        let email_record = await repo.getUserByEmail(email);
        if (email_record !== null){
            return res.status(403).send({message: 'Registration failed: An account had already been registered with the same email address.'});
        }

        //check whether the username is already registered.
        let username_record = await repo.getUserByUsername(username);
        if (username_record !== null){
            return res.status(403).send({message: 'Registration failed: An account had already been registered with the same username.'});
        }

        //check password strength.
        if (!validate_password(plain_pw)){
            return res.status(403).send({message: 'Registration failed: Password must contains digits, uppercase, lowercase characters and special characters, and has at least 8 characters.'});
        }

        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(plain_pw, salt);

        const user = {
            username: username, 
            password: password,
            email: email,
            salt: salt,
            district: district,
            alias: alias
        };

        await repo.addUser(user);
        return res.status(201).send({message: 'Account Created!'});

    }catch(error){
        console.log(error);
        return res.status(403).send({message: 'Registration Failed'});
    }
})

module.exports = router;