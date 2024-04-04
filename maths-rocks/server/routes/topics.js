const express = require("express")
const router = express.Router()
let repo  = require("../repository/repository")

router.get("/", async(req, res) => {
    repo.getAllMathsTopics().then((topics) => { 
        res.json(Object.fromEntries(topics)); 
    });
})

router.get("/:id", async(req, res) => {
    let { id } = req.params;
    id = Number.parseInt(id);
    repo.getMathsTopic(id).then((topic) => {;
        res.json(topic);
    });
})

module.exports = router