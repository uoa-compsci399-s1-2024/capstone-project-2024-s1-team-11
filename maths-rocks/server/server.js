const express = require("express");
const MemRepoAdapter = require("./repository/mem-repository/mem-repo-adapter");
const topicsRouter = require("./routes/topics");
const MathsTopic = require("./domain/maths-topic");
let repo  = require("./repository/repository")

topic = new MathsTopic(1, "Number 1", "This is number 1.")
repo.addMathsTopic(topic);
console.log(repo.getMathsTopic(1))

const app = express();

app.use("/topics", topicsRouter);

app.listen(5000, () => {console.log("Server started on port 5000.")});