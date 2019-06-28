var mysql = require("mysql");
var express = require("express");
var session = require("express-session");
var bodyParser = require('body-parser');
var path = require("path");
var bcrypt = require("bcrypt");

var PORT = process.env.PORT || 8080;
var app = express();

// create session and parse html body
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(express.static("./public"));

// connect to mysql
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'kassiPassw0rd',
	database : 'freespirits_accounts'
});

connection.connect(function(err){
    if (err) throw (err);
    console.log("Connected");
}

)

// this is the signup page
app.post("/signup", function(req, res){
    username = req.body.username;
    email = req.body.email;
    password = req.body.password;
    if (username && email && password) { // create new user
        bcrypt.hash(password, 8, function(err, hash) {
            // Store hash in your password DB.
            var hashedPassword = hash;
            connection.query("INSERT INTO accounts (username, password, email) VALUES (?, ?, ?)", [username, hashedPassword, email], function(error, results, fields){
                console.log(results);
                if (results.length > 0) {
                    console.log("created user " + username);
                    res.send("<h1>Account Created</h1>");
                } else {
                    res.send('<h1>Incorrect username, email or password!</h1>');
                }			
                res.end();
            });
          });
    } else {
        res.send("Please enter a valid username, email and password");
        res.end();
    }
});
app.get("/signup", function(req, res){
    res.sendFile(path.join(__dirname, "./signup.html"));
});

// this is the login page
app.post("/login", function(req, res){
    username = req.body.username;
    password = req.body.password;
    if (username && password) { // login user
        connection.query("SELECT * FROM accounts WHERE username = ?", [username], function(error, results, fields){
            // console.log(results);

            bcrypt.compare(password, results[0].password).then(function(authRes) {
                // authRes == true
                if (authRes) {
                    req.session.loggedin = true; // TODO: auth etc
                    req.session.username = username;
                    console.log("user logged in: " + username);
                    res.redirect("/home"); // TODO: CHANGE ME TO PRE-RESULTS SEARCH READY PAGE
                } else {
                    res.send('Incorrect username and/or password!');
                }			
                res.end();
            });


        });
    } else {
        res.send("Please enter a valid username and password");
        res.end();
    }
});
app.get("/login", function(req, res){
    res.sendFile(path.join(__dirname, "./login.html"));
});

// something to test our login against, can redirect to something else later
app.get('/home', function(req, res) {
	if (req.session.loggedin) {
		res.send('Welcome back, ' + req.session.username + '!');
	} else {
		res.send('Please login to view this page!');
	}
	res.end();
});

// Listen for the app
app.listen(PORT, function() {
    console.log("Listening on PORT " + PORT)
})