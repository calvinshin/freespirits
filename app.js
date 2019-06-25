// Connect to internal files
var connection = require("./config/connection.js");
var orm = require("./config/orm");
var routes = require("./routing/routes");

// Node modules
var express = require("express");
var exphbs = require("express-handlebars");

// Express initialize
var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.static("public"));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//is this file going to exist?
// var routes = require("./controllers/tripController.js");

// app.use(routes);

// app.get("/added", function(req, res) {
//     res.render("confirmation-page",)
// })

// app.get ("/tripID", function (req, res) {
//     res.render("individual-trip", {singleTrip: singleTrip})
// })

    // connection.query(
    //     // console.log(res);
        
    //     "INSERT INTO trips 
    //     // (title, destination, starting_date, end_date, duration, primary_language, travel_philosophy, description, budget_day, currency, group_size, creator_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
    //     // [req.body]
    //     // [req.body.tripName, req.body.destination, req.body.startDate, req.body.endDate, req.body.duration, req.body.destLanguage, req.body.philosophy, req.body.description, req.body.budget, req.body.currency, req.body.groupSize, req.body.authorId],
    // )
    


// Routing for the app
app.use(routes);


// Listen for the app
app.listen(PORT, function() {
    console.log("Listening on PORT " + PORT)
});