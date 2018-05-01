const express = require("express");
const router = express.Router();
const User = require("../models").User;
const Page = require("../models").Page;

router.get('/', function (req, res, next) {
    User.findAll().then((users) => {
        res.render("user", {
            //Explain
            users: users
        })
    })
});





router.get('/:author', function (req, res, next) {
    //NEED STEP BY STEP EXPLANATION OF WTF IS GOING ON HERE!
    let author = req.params.author;
    User.find({
        where: {
            id: author
        }
    }).then((author) => {
        Page.findAll({
            where: {
                authorId: author.id
            }
        }).then((data) => {
            res.render("userLanding", {
                author: author,
                email: author.email,
                users: data
            })
        })
    })
});


//FULLSTACK SOLUTIOM


//Even though we're altering the nature of the association at the model level, nothing actually has to
//change on the tables themselves (the pages table already has an authorId column!). hasMany will
//put a new foreign key column on the target model (Page in this case) unless it already exists 
//though, and since we gave users an alias of 'author' when we first associated the two, 
//it would be easy to mistakenly give the pages table a userId column in addition to authorId 
//at this point. To avoid this, we'll need to specify that the foreign key used should be 
//authorId. Once you feel like you understand what needs to be done, define a new association 
//between User and Page in models/index.js.

//USE KEY DEFINED B4 AS KEY TO JOIN
//User.hasMany(Page, { foreignKey: 'authorId' });



//router.get('/:userId', function (req, res, next) {
//    User.findById(req.params.userId, {
//        include: [Page]
//    })
//    .then(function (user) {
//        res.render('userpages', {
//            pages: user.pages,
//            user
//        });
//    })
//    .catch(next);
//});



module.exports = router;


//    res.render("userLanding", {
//            users: arr
//        })
