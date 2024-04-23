const express = require("express")
const router = express.Router()
const Repository = require('../repository/repository');


router.get("/", async(req, res) => {
    console.log(req.session);
    repo = await Repository.getRepoInstance();
    repo.getAllTopics().then((topics) => { 
        res.json(Object.fromEntries(topics)); 
    });
})

router.get("/:id", async(req, res) => {
    repo = await Repository.getRepoInstance();
    let { id } = req.params;
    id = Number.parseInt(id);
    repo.getTopic(id).then((topic) => {;
        res.json(topic);
    });
})

module.exports = router
