const express = require("express");
const router = express.Router();
const userRouter = require("./user.js");
const wikiRouter = require("./wiki.js");


router.use('/wiki/', wikiRouter);
router.use('/user', userRouter);



module.exports = router;
