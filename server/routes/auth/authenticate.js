const bcrypt = require("bcrypt");
const express = require("express");
const SECRET_KEY = require("../../utils/secretKeyGenerator");

async function authenticate(req, res, next) {
    try {
        console.log(req.body);
        if (req.body !== undefined && req.body.username && req.body.signature) {
            const username = req.body.username;
            const user_id = req.body.user_id;
            const signature = req.body.signature
            console.log(req.body);
            if (await bcrypt.compare(signature, username + user_id + SECRET_KEY)) {
                console.log("Successful authentication.")
                next();
            } else{ return res.status(401).send({message: 'Unauthorized: Authentication failed.'}); }
        } else{ return res.status(401).send({message: 'Unauthorized: Authentication failed.'}); }
    } catch (e) {
        console.log(e);
        return res.status(500).send({message: 'Unauthorized: Internal server error.'});
    }
}

module.exports = authenticate;