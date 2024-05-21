const bcrypt = require("bcrypt");
const express = require("express");
const SECRET_KEY = require("../../utils/secretKeyGenerator");


async function authenticate(req, res, next) {
    try {
        if (req.body !== undefined && req.body.username !== undefined && req.body.signature !== undefined) {
            const [username, user_id, signature] = [req.body.username, req.body.user_id, req.body.signature];
            if (await bcrypt.compare(username + user_id + SECRET_KEY, signature)) {
                next();
            } else{ return res.status(401).send({message: 'Unauthorized: Authentication failed.'}); }
        } else{ return res.status(401).send({message: 'Unauthorized: Authentication failed.'}); }
    } catch (e) {
        console.log(e);
        return res.status(500).send({message: 'Unauthorized: Internal server error.'});
    }
}

module.exports = authenticate;