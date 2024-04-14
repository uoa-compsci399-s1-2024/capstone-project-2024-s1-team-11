const express = require("express");
const topicsRouter = require("./routes/topics");
const Repository = require("./repository/repository");



async function start_server(){
    await Repository.getRepoInstance(); // Sync the database.
    const app = express();
    app.use("/topics", topicsRouter);
    app.listen(5000, () => {console.log("Server started on port 5000.")});
}


start_server();