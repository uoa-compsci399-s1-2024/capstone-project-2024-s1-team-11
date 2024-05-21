const express = require("express")
const multer = require("multer")
const Repository = require("../../repository/repository")
const authenticate = require("../auth/authenticate");
const {authorize} = require("../auth/authorization");


// This is for handling image upload.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images/topics")
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
    }
)
const upload = multer({storage: storage})

router = express.Router()
router.post("/addTopic",upload.single("topic_image"), authenticate, authorize, async (req, res) => {
    try {
        const topic = {
            title: req.body.title !== "" ? req.body.title : "Topic Title Not Yet Assigned",
            description: req.body.text,
            imageUri: req.file !== undefined ? req.file.filename : "placeholder.jpg",
            metaTitle: req.body.metatitle,
            metaDescription: req.body.metadesc
        }

        const repo = await Repository.getRepoInstance();
        const newTopic = await repo.addTopic(topic);
        return res.status(201).json({next: "/topic/" + newTopic.topic_id});
    } catch (e) {console.error(e); }
})

router.post("/editTopic",upload.single("topic_image"), authenticate, authorize, async (req, res) => {
    try {
        const updated_topic = {
            topic_id: req.body.topic_id,
            title: req.body.title !== "" ? req.body.title : null,
            description: req.body.text !== "" ? req.body.text : null,
            imageUri: req.file !== undefined ? req.file.originalname : null,
            metaTitle: req.body.metatitle !== "" ? req.body.metatitle: null,
            metaDescription: req.body.metadesc !== "" ? req.body.metadesc: null
        }

        const repo = await Repository.getRepoInstance();
        const topic = await repo.getTopic(updated_topic.topic_id.valueOf());
        for (let key in updated_topic){
            if (updated_topic[key] !== null){
                topic[key] = updated_topic[key];
            }
        }
        await topic.save();
        return res.status(201).json({next: "/topic/" + updated_topic.topic_id});
    } catch (e) {console.error(e); }
})

router.post("/deleteTopic", upload.none(), authenticate, authorize, async (req, res) => {
    try {
        const topic_id = req.body.topic_id;
        console.log(topic_id)
        const repo = await Repository.getRepoInstance();
        await repo.deleteTopic(topic_id.valueOf());
        return res.status(201).json();
    } catch (e) {console.error(e); }
})

module.exports = router;