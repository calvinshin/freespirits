This goes in orm.js line 22:

 // if(table === "relations") {
            //     let profile_id = object.id;
            //     let trip_id = result.id;
            //     let queryStringThree = "INSERT INTO relations (profile_id, trip_id, relationship_type) VALUES (" + profile_id + ", " + trip_id + ", 'committed');";
            //     console.log("-------");
            //     console.log("profile id: ");
            //     console.log(profile_id);
            //     console.log("trip id");
            //     console.log(trip_id);
            //     console.log("query string");
            //     console.log(queryStringThree);
            //     console.log("------")

            //     connection.query(queryStringThree, function(error, resultThree) {
            //         if (error) throw error;
                // })
                
            // }