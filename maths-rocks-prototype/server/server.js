const express = require("express");
const db_client = require("./db_client");
const mathsRouter = require("./routes/maths");


db_client;
const app = express();
app.use("/maths", mathsRouter);
app.listen(5000, () => {console.log("Server started on port 5000.")});