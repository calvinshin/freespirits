var connection = require("./connection");

// Create a list of all tables and all columns so that no sql injection from a query is possible;

var objectToString = function(object) {
    var string = ""
    Object.keys(object).forEach(function(item) {
        string += "`" + item + "` = '";
        string += object[item] + "' AND "
    })
    return string;
}

var orm = {
    futureFriends: function(trip_id, displayFunction) {
        connection.query("SELECT profiles.fname FROM relations LEFT JOIN  profiles ON relations.profile_id = profiles.id WHERE trip_id=" + trip_id + " AND relationship_type='committed'", function(err, result) {
            if(err) throw (err);
            displayFunction(result)
        });
    },

    // Create item
    Create : function(table, displayFunction, object) {
        // connection.query("SELECT * FROM relations WHERE ?;", object, function(err, result) {
        //     if (err) throw err;
        //     console.log(result);
        // })

        let queryString = "INSERT INTO `" + table + "` SET ?";
        connection.query(queryString, object, function(err, result) {
            if (err) throw err;
            // If creating a new trip, create a new line in the relations tab;
            if(table === "trips") {
                let trip_id = result.insertId;
                let creator_id = object.creator_id;
                let queryStringTwo = "INSERT INTO relations (profile_id, trip_id, relationship_type) VALUES  (" + creator_id + "," + trip_id + ",'creator');";
                connection.query(queryStringTwo, function(error, resultTwo) {
                    if (error) throw error;
                });
            }
            // Return the result into the displayFunction
            displayFunction(result.insertId);
        });
    },
    // Read item
    Read : function(table, displayFunction, column, parameter) {
        // Create the querystring based on what values are returned from Read
        // Note for the functions below that column and parameter are optional fields.
// Add into queries where NOT DELETED;
        // Currently this could be affected by SQL injections
        if(typeof column === "object") {
            connection.query("SELECT * FROM `" + table + "` WHERE " + objectToString(column) + " status <> 'deleted';", function(err, result) {
                if (err) throw err;
                displayFunction(result)
            })
        }
        else if(column && parameter) {
            var queryString = "SELECT * FROM `" + table + "` WHERE `" + column + "` = ? AND status <> 'deleted';";
            connection.query(queryString, [parameter], function(err, result) {
                if (err) throw err;
                displayFunction(result);
            });
        }
        else if(column) {
            var queryString = "SELECT * FROM " + table + "WHERE `" + column + "` IS NOT NULL AND status <> 'deleted';";
            connection.query(queryString, function(err, result) {
                if (err) throw err;
                connection.query(queryString, )
                displayFunction(result);
            });
        }
        else {
            var queryString = "SELECT * FROM " + table + " WHERE status <> 'deleted';";
            connection.query(queryString, table, function(err, result) {
                if (err) throw err;
                displayFunction(result);
            });
        }
    },

    // Update item
    Update : function(table, displayFunction, id, object) {
        connection.query("UPDATE ?? set ? WHERE id = ?", [table, object, id], function(err, res, fields) {
            if (err) throw err;
            displayFunction(res);
        });
    },

    // Destroy item ---- to create this, need status for accounts
    // Delete : function(table, displayFunction, id, object) {
    //     connection.query("UPDATE ?? set ? WHERE id = ?", [table, object, id], function(err, res, fields) {
    //         if (err) throw err;
    //         displayFunction(res);
    //     });
    // },

    SpecificTripsColumn : function(column, displayFunction) {
        connection.query("SELECT ?? FROM trips WHERE status <> 'deleted'", [column], function(err, result) {
            if (err) throw err;
            let columnArray = result.map(a => a.destination)
            displayFunction(columnArray);
        });
    }
};


module.exports = orm;