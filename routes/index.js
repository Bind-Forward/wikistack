const express = require("express");
const router = express.Router();
const userRouter = require("./user.js");
const wikiRouter = require("./wiki.js");
const Page = require("../models").Page;

//GOT HERE FROM APP.JS

//FOR THE PATHS USE CODE FROM REQUIRED IN FILES

router.get("/", function (req, res, next) {
    Page.findAll().then((pages) => {
        res.render('index', {
            pages: pages
        })
    })
})



router.use('/wiki/', wikiRouter);
router.use('/user', userRouter);



module.exports = router;
