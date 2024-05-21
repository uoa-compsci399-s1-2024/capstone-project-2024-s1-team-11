const express = require("express")
const multer = require("multer")
const { Page } = require("../../models");
const authenticate = require("../auth/authenticate");
const {authorize} = require("../auth/authorization");

const upload = multer()

router = express.Router()

router.post("/editPage",upload.none(), authenticate, authorize, async (req, res) => {
    try {
        console.log("hi")
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