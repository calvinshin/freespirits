var connection = require("./connection");

var orm = {
    // Create item

    // Read item
    Read : function(table, displayFunction, column, parameter) {
        // Create the querystring based on what values are returned from Read
        // Note for the functions below that column and parameter are optional fields. 
        if(column && parameter) {
            console.log("both exist");
            var queryString = "SELECT * FROM " + table + " WHERE " + column + " = ?;";
            connection.query(queryString, [parameter], function(err, result) {
                if (err) throw err;
                displayFunction(result);
            });
        }
        else if(column) {
            console.log("one exists");
            var queryString = "SELECT * FROM " + table + " IS NOT NULL;";
            connection.query(queryString, [column], function(err, result) {
                if (err) throw err;
                displayFunction(result);
            });
        }
        else {
            console.log("none exist");
            var queryString = "SELECT * FROM " + table + ";";
            console.log(queryString);
            connection.query(queryString, table, function(err, result) {
                if (err) throw err;
                displayFunction(result);
            });
        }
    },

    // Update item

    // Destroy item
};


module.exports = orm;