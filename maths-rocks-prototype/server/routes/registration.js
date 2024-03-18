const express = require("express")
const router = express.Router()
const db_client = require("../db_client")

router.get("/:id", async(req, res) => {
    const { id } = req.params;
    const topic = await db_client.query("SELECT * FROM maths_topic WHERE topic_id = $1", [id]);
    res.json(topic.rows[0]);
})

module.exports = router