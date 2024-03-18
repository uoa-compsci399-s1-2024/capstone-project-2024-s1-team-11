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

console.log("Initializing database...")

// Create tables
db_client.query("CREATE TABLE maths_topic (topic_id SERIAL PRIMARY KEY, title VARCHAR(255), content VARCHAR(255));");
db_client.query("CREATE TABLE members (user_id SERIAL PRIMARY KEY, username VARCHAR(255), user_pw VARCHAR(255), user_email VARCHAR(255));");

// Add examples
db_client.query("INSERT INTO maths_topic (title, content) VALUES ('Number 1', '1 is the loneliest number.');")
db_client.query("INSERT INTO maths_topic (title, content) VALUES ('Number 2', '2 can be as bad as 1.');")
db_client.query("INSERT INTO maths_topic (title, content) VALUES ('Number 3', 'This is number 3.');")

console.log("Database initialized!")