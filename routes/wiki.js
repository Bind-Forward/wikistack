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
    //builds a represention of a table
    //    const page = Page.build({
    //        title: req.body.title,
    //        content: req.body.content
    //    });
    const builtPage = Page.build(req.body);


    // make sure we only redirect *after* our save is complete!
    // note: `.save` returns a promise or it can take a callback.

    //  ANY INTERACTION WITH SEQUELIZE RETURNS A PROMISE.


    //take what I just built and add it to my database. 
    //returns promise

    builtPage.save()
        .then((result) => res.json(req.body))
        //HOW DOES THIS NEXT GO TO OUR ERROR HANDLING MIDDLEWARE?
        .catch(function (err) {
            next(err)
        })

});

router.get('/add', function (req, res, next) {
    res.render("addpage")
});

router.get("/:urlTitle", function (req, res, next) {
    var urlTitleOfPage = req.params.urlTitle;
    //the model
    Page.find({
        where: {
            urlTitle: urlTitleOfPage
        }
    }).then(function (pagesFound) {
        if (pagesFound === null) {
            return next(new Error("Page was not found"))
        }
        res.render("wikipage", {
            //use view engine to add data
            page: pagesFound

        })
    })
})


module.exports = router;
