var connection = require("./connection");

var orm = {
    // Create item

    // Read item
    Read : function(table, displayFunction, column, parameter) {
        // Create the querystring based on what values are returned from Read
        if(column && parameter) {
            var queryString = "SELECT * FROM ? WHERE ? = ?";
            connection.query(queryString, [table, column, parameter], function(err, result) {
                if (err) throw err;
                displayFunction(result);
            });
        }
        else if(column) {
            var queryString = "SELECT * FROM ? WHERE ? IS NOT NULL";
            connection.query(queryString, [table, column], function(err, result) {
                if (err) throw err;
                displayFunction(result);
            });
        }
        else {
            var queryString = "SELECT * FROM ?"
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