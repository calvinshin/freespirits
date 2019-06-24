var connection = require("./config/connection.js");

var express = require("express");

var app = express();

var PORT = process.env.PORT || 3300;

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

app.get("/create-trip", function(req, res) {
    res.render("create-trip")
})

app.get("/create-profile", function(req, res) {
    res.render("create-profile")
})

app.get("/search", function(req, res) {
    res.render("search-page")
    
});

app.get("/api/trips", function(req, res) {
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

app.get ("/search-results", function(req, res) {
    connection.query("SELECT * FROM trips WHERE destination = ? starting_date = ? primary_language = ?", 
    [req.params.destination, req.params.traveldate, req.params.language],
    function (err, trips) {
        // res.send("/api/trips")
    res.render("search-results", {trips: trips})
    })
    //index.handlebars file. 
})

app.get ("/api/profiles", function(req, res) {
    connection.query("SELECT * FROM profiles", function (err, profiles) {
        // res.send("/api/trips")
    res.render("all-profiles", {profiles: profiles})
    })
    
})

app.get("/added", function(req, res) {
    res.render("confirmation-page")
})

// app.get ("/tripID", function (req, res) {
//     res.render("individual-trip", {singleTrip: singleTrip})
// })


app.get("*", function(req, res) {
    res.send("This is working!");
})

app.post("/confirmation-trip", function(req, res) {
    connection.query(
        // console.log(res);
        "INSERT INTO trips (title, destination, starting_date, end_date, duration, primary_language, travel_philosophy, description, budget_day, currency, group_size, authorId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
    [req.body.tripName, req.body.destination, req.body.startDate, req.body.endDate, req.body.duration, req.body.destLanguage, req.body.philosophy, req.body.description, req.body.budget, req.body.currency, req.body.groupSize, req.body.authorId],
    function(err, result) {
        if (err) {
            return res.status(500).end();
        }  
    }
    )
    res.render("confirmation-trip")
})

app.post("/confirmation-profile", function(req, res) {
    connection.query(
        // console.log(res)
        "INSERT INTO profiles (fname, lname, picture, gender, primary_language, travel_philosophy, email) VALUES (?, ?, ?, ?, ?, ?, ?)", 
    [req.body.fname, req.body.lname, req.body.photo, req.body.gender, req.body.languages, req.body.philosophy, req.body.email],
    function(err, result) {
        if (err) {
            return res.status(500).end();
        }
        
    }
    
    )
    res.render("confirmation-profile")
})

// Listen for the app
app.listen(PORT, function() {
    console.log("Listening on PORT " + PORT)
})


