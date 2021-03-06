var express = require("express");

// Require the ORM
var orm = require("../config/orm");

// Initialize the router for express
router = express.Router();

// Example of what an original connection.query would look like. 
        // Note how the orm requires only one input, not two.

// router.get("/search-results", function(req, res) {
//     connection.query("SELECT * FROM trips", function (err, trips) {
//         // res.send("/api/trips")
//     res.render("search-results", {trips: trips})
//     })
// })

// Shows all valid routes below
router.get("/", function(req, res) {
    res.render("index", {layout: "front"})
});

router.get("/search", function(req, res) {
    res.render("search-page")
});

router.get("/search-results", function(req, res) {
    // If coming from a request
    if(req) {
        // Strip all of the blank properties that are coming through on req.query so SQL works in variable obj
        let obj = req.query
        for (var propName in obj) { 
            if (obj[propName] === "") {
            delete obj[propName];
            }
        }
        if(Object.keys(obj).length === 0) {
            orm.Read("trips", function(trips) {
                res.render("search-results", {trips: trips})
            });
        }
        else {
            orm.Read("trips", function(trips) {
                // Check if the value of trips is greater than 1
                if(trips.length > 0) {
                    res.render("search-results", {trips: trips})
                }
                else {
                    res.render("no-results")
                }
            }, obj);    
        }
        // Run obj through the ORM to display the results
    }
    // Show all results
    else {
        orm.Read("trips", function(trips) {
            res.render("search-results", {trips: trips})
        });    
    }
});

router.get("/create-trip", function(req, res) {
    res.render("create-trip")
});

router.post("/confirmation-trip", function(req, res) {
    orm.Create("trips", function(result) {
        
        res.redirect("/individual-trip/" + result)
    }, req.body);
});

router.get("/create-profile", function(req, res) {
    res.render("create-profile")
});

router.post("/confirmation-profile", function(req, res) {
    orm.Create("profiles", function(result) {
        res.redirect("view-profile/" + result)
    }, req.body);
});

router.post("/added-to-trip", function(req, res) {
    // Before creating a new relationship, check to make sure that the trip is open
    orm.Read("trips", function(result) {
        console.log(result[0].status);
        if(result[0].status !== "Open") {
            res.send("This trip is not open and cannot be joined.")
        }
        else{

            // Before creating a new relationship, check to see if this relationship already exists
            orm.Read("relations", function(result) {
                if(result.length === 0) {
                    res.send("This person has already joined the trip!")
                }
                else {

                    // create the relations
                    orm.Create("relations", function(result) {
                        res.send("Joined!")
                    }, req.body);
                }
            }, req.body)
        }
    }, 'id', req.body.trip_id)


    
});

router.get(
    "/individual-trip/:id",
    function(req, res) {
        orm.Read("trips", function(trips) {
            orm.futureFriends(req.params.id, function(relations) {
                if(relations === []) {
                    trips[0].people = ["Be the first to join this trip"]
                }
                else {
                    var travelers = [];
                    for (var i = 0; i < relations.length; i++) {
                        travelers.push(relations[i].fname);
                    }
                    travelersString = travelers.join(", ")
                    trips[0].people = travelersString;
                }
                // Check if a trip exists or not
                if(trips.length === 0) {
                    res.render("missing-trip");
                }
                else{
                    // connection.query("SELECT * FROM 'relations' WHERE 'trip_id' = ?")
                    res.render("individual-trip", trips[0]);
                }
            })
        },
            "id",[req.params.id]
        );
    },

);

router.get(
    "/view-profile/:id",
    function(req, res) {
        orm.Read("profiles", function(profiles) {
            res.render("view-profile", profiles[0]);
        },
            "id",[req.params.id]
        );
    },
);

router.get("/api/trips", function(req, res) {
    orm.Read("trips", function(trips) {
        res.send(trips);
        // res.render("search-results", {trips: trips})
    })
});

router.get ("/api/profiles", function(req, res) {
    orm.Read("profiles", function (profiles) {
        res.send(profiles);
    }) 
});

router.get("/api/destinations", function(req, res) {
    orm.SpecificTripsColumn("destination", function(result) {
        res.json(result)
    })
    
})


router.get("*", function(req, res) {
    res.send("This is working!");
})



module.exports = router;