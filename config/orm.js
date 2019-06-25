var connection = require("./connection");

// Create a list of all tables and all columns so that no sql injection from a query is possible;

var orm = {
    // Create item
    Create : function(table, displayFunction, object) {
        console.log(object);
        let queryString = "INSERT INTO `" + table + "` SET ?";
        connection.query(queryString, object, function(err, result) {
            if (err) throw err;
            // If creating a new trip, create a new line in the relations tab;
            // if(table === "trips") {
            //     let trip_id = result.insertId;
            //     let creator_id = object.creator_id;
            //     connection.query("INSERT INTO relations (profile_id, trip_id, relationship_type) VALUES  (" + creator_id + ",", trip_id + ",creator);", function(error, resultTwo) {
            //         if (error) throw error;
            //     });
            // }
            // Return the result into the displayFunction
            console.log(result.insertId);
            displayFunction(result.insertId);
        });
    },
    // Read item
    Read : function(table, displayFunction, column, parameter) {
        // Create the querystring based on what values are returned from Read
        // Note for the functions below that column and parameter are optional fields.
        
        // Currently this could be affected by SQL injections
        if(column && parameter) {
            var queryString = "SELECT * FROM `" + table + "` WHERE `" + column + "` = ?;";
            connection.query(queryString, [parameter], function(err, result) {
                if (err) throw err;
                displayFunction(result);
            });
        }
        else if(column) {
            var queryString = "SELECT * FROM " + table + "WHERE `" + column + "` IS NOT NULL;";
            connection.query(queryString, function(err, result) {
                if (err) throw err;
                displayFunction(result);
            });
        }
        else {
            var queryString = "SELECT * FROM " + table + ";";
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