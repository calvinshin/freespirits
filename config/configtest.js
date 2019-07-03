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

// console.log("\n\n\n");

// orm.Read("profiles", function(result) {
//     console.log(result[0].fname);
// }, "fname", "Octoman");

// orm.Read("trips", function(result) {
//     console.log(result);
// })

// orm.Read("trips", function(result) {
//     console.log(result);}, {creator_id: 2}
// )

// orm.SpecificTripsColumn("destination", function(result) {
//     console.log(result);
// })

// orm.Update("trips", function(response) {
//     console.log(response)
// }, 3, {status: 'deleted'});

var destinations;

orm.SpecificTripsColumn("destination", function(result) {
    destinations = result;
    console.log(destinations);
})