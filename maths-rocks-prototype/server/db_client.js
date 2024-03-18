const prompt = require("prompt-sync")({ sigint: true });
const Pool = require("pg").Pool;

username = prompt("Enter your username: ");
password = prompt("Enter your password: ");
const db_client = new Pool({
    user: username,
    password: password,
    host: "localhost",
    port: "5432",
    database: "maths_rocks"
})

module.exports = db_client