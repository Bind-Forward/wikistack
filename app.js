//require in Express 
var express = require("express");
//require in nunjucks templating
var nunjucks = require("nunjucks");
//initialize an instance of express
const app = express();
//require in routes in our routes/index.js file, remember express using this file name as the default
//makes vars based on the keys in the export object in routes
const router = require("./routes");

const morgan = require("morgan");
const models = require("/models");
const bodyParser = require("body-parser");
// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment 
// instance, which we'll want to use to add Markdown support later.


//NUNJUCKS BOILERPLATE =======================================================
// point nunjucks to the directory containing templates and turn off caching; 
//configure returns an Environment instance, which we'll want to use to add Markdown support later.
const env = nunjucks.configure("views", {
	noCache: true
});
// have res.render work with html files
app.set("view engine", "html");
// when res.render works with html files, have it use nunjucks to do so
app.engine("html", nunjucks.render);

//============================================================================

//FOR FORMS
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
//my Logger
app.use(morgan("dev"));
//go to routes for all paths
app.use("/", router);

//serves public files.
app.use(express.static("public"));

//ERROR HANDLING, NEEDS 4 ARGS
//How does it know which is which?
app.use(function (err, req, res ){
	res.status(500).send(err.message);
});

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


//Create tables in our DB
models.db.sync({
	//Drop all tables and create new ones whenver we make a change to our model. 
	force: false
})
	.then(function () {
		console.log("All tables created!");
		console.log("WIKISTACK DB listening on port 5432");
		app.listen(3000, function () {
			console.log("Server is listening on port 3000!");
		});
	})
	.catch(console.error.bind(console));