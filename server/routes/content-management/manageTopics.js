const express = require("express")
const multer = require("multer")
const Repository = require("../../repository/repository")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images/rocks")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
    }
)

const upload = multer({storage: storage})

router = express.Router()

router.post("/addTopic",upload.single("topic_image"), async (req, res) => {
    try {
        const topic = {
            title: req.body.title,
            description: req.body.text,
            imageUri: req.file.originalname,
            metaTitle: req.body.metatitle,
            metaDescription: req.body.metadesc
        }

        const repo = await Repository.getRepoInstance();
        const newTopic = await repo.addTopic(topic);
        return res.status(201).json({next: "/topic/" + newTopic.topic_id});
    } catch (e) {console.error(e); }
})

module.exports = router;