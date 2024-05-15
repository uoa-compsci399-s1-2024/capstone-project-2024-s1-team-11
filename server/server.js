// Import external libraries.
const express = require("express");
const cors = require("cors");
const session = require("express-session");

// Import content-related routes.
const topicsRouter = require("./routes/topics");
const leaderboardRouter = require("./routes/leaderboard");
const profileRouter = require("./routes/profile");
const rocksRouter = require("./routes/rocks");
const userRouter = require("./routes/user");
const addRockRouter = require("./routes/addRock");
const checkCollectionRouter = require("./routes/checkCollection");
const giveBadgeRouter = require("./routes/giveBadge");

// Import authentication-related routes.
const registrationRouter = require("./routes/auth/register");
const loginRouter = require("./routes/auth/login");
const {router: authorizationRouter} = require("./routes/auth/authorization")

// Import content-management-system-related routes.
const usersReportRouter = require("./routes/content-management/usersReport")

// Import repository.
const Repository = require("./repository/repository");
const populateDb = require("./database-utils/populate-db")


// Entry point of the server script.
async function start_server(){
    const repo = await Repository.getRepoInstance(); // Sync the database.
    await populateDb(repo);

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
