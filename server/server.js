const express = require("express");
const cors = require("cors");
const session = require("express-session");
const topicsRouter = require("./routes/topics");
const registrationRouter = require("./routes/registration");
const loginRouter = require("./routes/login");
const leaderboardRouter = require("./routes/leaderboard");
const profileRouter = require("./routes/profile");
const rocksRouter = require("./routes/rocks")
const Repository = require("./repository/repository");

async function start_server(){
    await Repository.getRepoInstance(); // Sync the database.
    const app = express();
    app.use(cors());
    app.use(session({ 
        secret: 'secret',
        saveUninitialized: false,
        resave: false,
    }));
    app.use("/topics", topicsRouter);
    app.use("/leaderboard", leaderboardRouter);
    app.use("/profile", profileRouter);
    app.use("/registration", registrationRouter);
    app.use("/login", loginRouter)
    app.use("/rocks", rocksRouter)
    app.listen(5000, () => {console.log("Server started on port 5000.")});
}

start_server();
