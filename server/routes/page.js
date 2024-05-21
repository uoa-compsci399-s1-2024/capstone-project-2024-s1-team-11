const express = require("express");
const router = express.Router();
const { Page } = require('../models');

router.get("/:pagename", async (req, res) => {
    try {
        let {pagename} = req.params;
        const pageData = await Page.findByPk(pagename);
        return res.json(pageData);
    }catch (e){
        console.error(e);
        return res.status(404).json({error: "Page is not found."})
    }
});

module.exports = router;