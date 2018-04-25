const express = require("express");
const models = require('../models');
const router = express.Router();
const Page = models.Page;
const User = models.User;

router.get('/', function (req, res, next) {
    res.redirect('/');
});

//express always looks in our "views" dir for templates

router.post('/', function (req, res, next) {

    // STUDENT ASSIGNMENT:
    // add definitions for `title` and `content`
    console.log(req)

    const page = Page.build({
        title: req.body.title,
        content: req.body.content
    });

    // STUDENT ASSIGNMENT:
    // make sure we only redirect *after* our save is complete!
    // note: `.save` returns a promise or it can take a callback.
    page.save()
        .then((result) => res.json(req.body))

});

router.get('/add', function (req, res, next) {
    res.render("addpage")
});

module.exports = router;
