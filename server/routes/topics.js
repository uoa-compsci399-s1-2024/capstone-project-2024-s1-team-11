const express = require("express")
const router = express.Router()
const PSQLRepo = require('../repository/psql-repository/psql-repo');


router.get("/", async(req, res) => {
    repo = await PSQLRepo.getRepoInstance();
    repo.getAllMathsTopics().then((topics) => { 
        res.json(Object.fromEntries(topics)); 
    });
})

router.get("/:id", async(req, res) => {
    repo = await PSQLRepo.getRepoInstance();
    let { id } = req.params;
    id = Number.parseInt(id);
    repo.getMathsTopic(id).then((topic) => {;
        res.json(topic);
    });
})

module.exports = router
