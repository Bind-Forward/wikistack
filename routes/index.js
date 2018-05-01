const express = require("express");
const router = express.Router();
const userRouter = require("./user.js");
const wikiRouter = require("./wiki.js");
const Page = require("../models").Page;

//GOT HERE FROM APP.JS


router.get("/", function (req, res, next) {
    Page.findAll().then((pages) => {
        res.render('index', {
            pages: pages
        })
    })
})

//FOR THE PATHS USE CODE FROM REQUIRED IN FILES


router.use('/wiki/', wikiRouter);
router.use('/users', userRouter);



module.exports = router;
