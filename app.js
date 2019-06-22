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

// Routing for the app
app.use(routes);

// Listen for the app
app.listen(PORT, function() {
    console.log("Listening on PORT " + PORT)
});