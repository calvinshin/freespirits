var connection = require("./config/connection.js");

var express = require("express");

var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.static("public"));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//is this file going to exist?
// var routes = require("./controllers/tripController.js");

// app.use(routes);

app.get("/", function(req, res) {
    res.render("index")
})

app.get("/search", function(req, res) {
    res.render("search-page")
    
});

app.get("/search-results", function(req, res) {
    connection.query("SELECT * FROM trips", function (err, trips) {
        // res.send("/api/trips")
    res.render("search-results", {trips: trips})
    })
})

app.get("/individual-trip/:id", function(req, res) {
    console.log(req.params);
    connection.query("SELECT * FROM trips WHERE id = ?", [req.params.id], function (err, trips) {
        // res.send("/api/trips")
        console.log(trips)
    res.render("individual-trip", trips[0])
    
    })
})

app.get ("/api/trips", function(req, res) {
    connection.query("SELECT * FROM trips", function (err, trips) {
        // res.send("/api/trips")
    res.render("search-results", {trips: trips})
    })
    //index.handlebars file. 
})

// app.get ("/tripID", function (req, res) {
//     res.render("individual-trip", {singleTrip: singleTrip})
// })


app.get("*", function(req, res) {
    res.send("This is working!");
})


// Listen for the app
app.listen(PORT, function() {
    console.log("Listening on PORT " + PORT)
})


