const express = require("express")
const multer = require("multer")
const Repository = require("../../repository/repository")


// This is for handling image upload.
const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./images/rocks")
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`)
        }
    }
)
const upload = multer({storage: storage})

router = express.Router()

router.post("/addRock",upload.single("rock_image"), async (req, res) => {
    try {
        const new_rock = {
            rock_name: req.body.rockName,
            topic_id: !isNaN(Number.parseInt(req.body.topicId)) ? Number.parseInt(req.body.topicId) : null,
            product_key: req.body.productKey,
            imageUri: req.file !== undefined ? req.file.filename : "placeholder.jpg"
        }

        const repo = await Repository.getRepoInstance();
        const rock = await repo.addRock(new_rock);
        return res.status(201).json({next: "/rocks/" + rock.rock_id});
    } catch (e) {console.error(e); }
})

router.post("/editRock",upload.single("rock_image"), async (req, res) => {
    try {
        const updated_rock = {
            rock_id: req.body.rock_id.valueOf(),
            rock_name: req.body.newRockName,
            topic_id: !isNaN(Number.parseInt(req.body.newTopicId)) ? Number.parseInt(req.body.newTopicId) : null,
            product_key: req.body.newProductKey,
            imageUri: req.file !== undefined ? req.file.filename : "placeholder.jpg"
        }

        const repo = await Repository.getRepoInstance();
        const rock = await repo.getRock(updated_rock.rock_id);
        for (let key in updated_rock){
            rock[key] = updated_rock[key];
        }
        await rock.save();
        return res.status(201).json({next: "/rocks/" + updated_rock.rock_id});
    } catch (e) {console.error(e); }
})

router.post("/deleteRock", upload.none(), async (req, res) => {
    try {
        const rock_id = req.body.rock_id;
        const repo = await Repository.getRepoInstance();
        await repo.deleteRock(Number.parseInt(rock_id));
        return res.status(201).json();
    } catch (e) {console.error(e); }
})

module.exports = router;