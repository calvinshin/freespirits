var mysql = require("mysql");
var express = require("express");

var PORT = process.env.PORT || 8080;

var app = express();

// we're going to write a POST request to "/signup" 
// It will follow a similar convention to app.get!
// SO, here it is

app.post("/signup", function(req, res){

});

// We also need something here to start our server!

var path = require("path");

app.get("/signup", function(req, res){

    res.sendFile(path.join(__dirname, "./sample.html"));
});


app.post("/signup", function(req, res){
    console.log("Success!", req.body);
    


});


// We also need something here to start our server!
// Listen for the app
app.listen(PORT, function() {
    console.log("Listening on PORT " + PORT)
})