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

    User.findOrCreate({
            //look for instances in our query
            where: {
                name: req.body.name,
                email: req.body.email
            }
        })
        .then(function (values) {
            //returns an array
            //the instance.

            const user = values[0];
            //WHY DONT WE HAVE TO USE THE BOOL AT values[1]?
            //build our page
            const page = Page.build(req.body);
            //Saves the instance to our db, then grabs that page
            // and uses setAuthor to associate the user to the page
            // uses a one to one connect. 
            return page.save().then(function (page) {
                //associate
                return page.setAuthor(user);
            });

        })
        .then(function (page) {
            //finally redirect. 
            res.redirect(page.route);
        })
        .catch(next);
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
