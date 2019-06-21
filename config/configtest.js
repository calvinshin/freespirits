var orm = require("./orm");

// orm.Read("users", function(response) {
//     console.log(response);
// })

// var connection = require("./connection");

// var queryString = "SELECT * FROM " + "profiles" + ";"
// connection.query(queryString, function(err, result) {
//     if (err) throw err;
//     console.log(result);
// });

console.log("\n\n\n");

orm.Read("profiles", function(result) {
    console.log(result);
}, "fname", "Octoman")