const express = require("express")
const multer = require("multer")
const Repository = require("../../repository/repository")


const upload = multer()
router = express.Router()


router.post("/editRock",upload.none(), async (req, res) => {
    try {
        const updated_rock = {
            rock_id: req.body.rock_id.valueOf(),
            rock_name: req.body.newRockName,
            topic_id: !isNaN(Number.parseInt(req.body.newTopicId)) ? Number.parseInt(req.body.newTopicId) : null,
            product_key: req.body.newProductKey
        }

        console.log(typeof(req.body.newTopicId.valueOf()));
        console.log(typeof("1".valueOf()));
        const repo = await Repository.getRepoInstance();
        const rock = await repo.getRock(updated_rock.rock_id);
        for (let key in updated_rock){
            rock[key] = updated_rock[key];
        }
        await rock.save();
        return res.status(201).json({next: "/rocks/" + updated_rock.rock_id});
    } catch (e) {console.error(e); }
})

module.exports = router;