const express = require("express");
const cors = require("cors");
const session = require("express-session");
const topicsRouter = require("./routes/topics");
const registrationRouter = require("./routes/auth/register");
const loginRouter = require("./routes/auth/login");
const leaderboardRouter = require("./routes/leaderboard");
const profileRouter = require("./routes/profile");
const rocksRouter = require("./routes/rocks");
const userRouter = require("./routes/user");
const addRockRouter = require("./routes/addRock");
const checkCollectionRouter = require("./routes/checkCollection");
const giveBadgeRouter = require("./routes/giveBadge");
const getUserBadges = require("./routes/getBadges");
const {router: authorizationRouter} = require("./routes/auth/authorization")
const usersReportRouter = require("./routes/content-management/usersReport")


const Repository = require("./repository/repository");

async function start_server(){
    await Repository.getRepoInstance(); // Sync the database.
    const app = express();
    app.use(cors());
    app.use(session({secret: 'secret', saveUninitialized: false, resave: false}));
    app.use("/topics", topicsRouter);
    app.use("/leaderboard", leaderboardRouter);
    app.use("/profile", profileRouter);
    app.use("/registration", registrationRouter);
    app.use("/login", loginRouter);
    app.use("/rocks", rocksRouter);
    app.use("/user", userRouter);
    app.use("/addRock", addRockRouter);
    app.use("/checkCollection", checkCollectionRouter);
    app.use("/giveBadge", giveBadgeRouter);
    app.use("/getBadges", getUserBadges);

    app.use("/authorization", authorizationRouter);
    app.use("/usersReport", usersReportRouter)
    app.listen(5000, () => {console.log("Server started on port 5000.")});
}

start_server();
