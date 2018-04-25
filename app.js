//require in Express 
var express = require("express");
//require in nunjucks templating
var nunjucks = require('nunjucks')
//initialize an instance of express
const app = express();
//require in routes in our routes/index.js file, remember express using this file name as the default
//makes vars based on the keys in the export object in routes
const router = require('./routes');

const morgan = require("morgan");
const models = require('./models');
const bodyParser = require("body-parser");
// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment 
// instance, which we'll want to use to add Markdown support later.
const env = nunjucks.configure('views', {
    noCache: true
});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);
//FOR FORMS
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(morgan("dev"))
//serves public files.


app.get("/", function (req, res, next) {
    res.render("index")
    next()
})

app.use("/", router)

app.use(express.static('public'))


//**SYNCING MODELS HERE**
// **USED DB TO INCLUDE ALL OF OUR TABLES**
// models.User.sync()
//     .then((result) => {
//         console.log('User table created.');
//         return models.Page.sync();
//     })
//     .then((result) => {
//         console.log('Page table created.')
//     })
//     .catch((error) => console.error(error));
//

models.db.sync({
        force: true
    })
    .then(function () {
        console.log('All tables created!');
        app.listen(3000, function () {
            console.log('Server is listening on port 3000!');
        });
    })
    .catch(console.error.bind(console));

//MOVED THIS TO TABLES SYNC, USING PROMISES
//listen on port 30000
// app.listen(3000, () => console.log('Server listening on port 3000!'))
