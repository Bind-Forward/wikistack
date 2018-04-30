const express = require("express");
const models = require('../models');
const router = express.Router();
const Page = models.Page;
const User = models.User;

//router.get('/', function (req, res, next) {
//    Page.findAll({}).then(function (pagesFound) {
//        res.render("index", {
//            pages: pagesFound
//        })
//    })
//});

//express always looks in our "views" dir for templates

router.post('/', function (req, res, next) {
    //    const page = Page.build({
    //        title: req.body.title,
    //        content: req.body.content
    //    });\
    //add to your model according to what you want the keys to match up to
    // or if you formatting the post to be like our model simply do this: 

    //if you arent allowing empty fields and the form post is with empty fields you might get an error. 
    const builtPage = Page.build(req.body);
    // ANY INTERACTION WITH SEQUELIZE RETURNS A PROMISE.
    //take what I just built and add it to my database. 
    //returns promise
    builtPage.save()
        .then((result) => {

            res.redirect(builtPage.route)

        })
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
        //the page in our template now refers to an object that we can loop over now.
        //this key always has to match the variable we use in our template. 

        //First param is template in our views dirr second is the locals object required. 
        res.render("wikipage", {
            //use view engine to add data
            page: pagesFound

        })
    })
})


module.exports = router;
