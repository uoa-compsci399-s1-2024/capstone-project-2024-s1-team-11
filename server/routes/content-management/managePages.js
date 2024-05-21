const express = require("express")
const multer = require("multer")
const { Page } = require("../../models");

const upload = multer()

router = express.Router()

router.post("/editPage",upload.none(), async (req, res) => {
    try {
        const page_name = req.body.page_name;
        const content = req.body.content;
        const page = await Page.findByPk(page_name);
        if (page !== null) {
            page.content = content;
            await page.save();
            return res.status(201).json({message: "Page updated!"});
        } else{
            return res.status(404).json({error: "Page not found."});
        }
    } catch (e) {console.error(e); }
})

module.exports = router;