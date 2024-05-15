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
const {router: authorizationRouter} = require("./routes/auth/authorization")
const usersReportRouter = require("./routes/content-management/usersReport")


const Repository = require("./repository/repository");

async function start_server(){
    await Repository.getRepoInstance(); // Sync the database.
    const app = express();
    app.use(cors());
    app.use(session({secret: 'secret', saveUninitialized: false, resave: false}));
    app.use("/api/images", express.static('images'));
    app.use("/api/topics", topicsRouter);
    app.use("/api/leaderboard", leaderboardRouter);
    app.use("/api/profile", profileRouter);
    app.use("/api/registration", registrationRouter);
    app.use("/api/login", loginRouter);
    app.use("/api/rocks", rocksRouter);
    app.use("/api/user", userRouter);
    app.use("/api/addRock", addRockRouter);
    app.use("/api/checkCollection", checkCollectionRouter);
    app.use("/api/giveBadge", giveBadgeRouter);

    app.use("/api/authorization", authorizationRouter);
    app.use("/api/usersReport", usersReportRouter)
    app.listen(5000, () => {console.log("Server started on port 5000.")});
}

start_server();
