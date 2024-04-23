const express = require("express");
const cors = require("cors");
const topicsRouter = require("./routes/topics");
const leaderboardRouter = require("./routes/leaderboard");
const profileRouter = require("./routes/profile");
const Repository = require("./repository/repository");

async function start_server(){
    await Repository.getRepoInstance(); // Sync the database.
    const app = express();
    app.use(cors());
    app.use("/topics", topicsRouter);
    app.use("/leaderboard", leaderboardRouter);
    app.listen(5000, () => {
        console.log("Server started on port 5000.")
    });
}
    app.use("/profile", profileRouter);

start_server();
