const express = require("express");
const topicsRouter = require("./routes/topics");



async function start_server(){
    const app = express();
    app.use("/topics", topicsRouter);
    app.listen(5000, () => {console.log("Server started on port 5000.")});
}


start_server();