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
var routes = require("./controllers/tripController.js");

app.use(routes);

app.get("*", function(req, res) {
    res.send("This is working!");
})

// Listen for the app
app.listen(PORT, function() {
    console.log("Listening on PORT " + PORT)
})