var express = require("express");

// Require the ORM
var orm = require("../config/orm");

// Initialize the router for express
router = express.Router();

// Shows all valid routes below
router.get("/", function(req, res) {
    res.render("index")
})

router.get("/search", function(req, res) {
    res.render("search-page")
    
});
// Example of what an original connection.query would look like. 
        // Note how the orm requires only one input, not two.

// router.get("/search-results", function(req, res) {
//     connection.query("SELECT * FROM trips", function (err, trips) {
//         // res.send("/api/trips")
//     res.render("search-results", {trips: trips})
//     })
// })

router.get("/search-results", function(req, res) {
    orm.Read("trips", function(trips) {
        res.render("search-results", {trips: trips})
    })
})

router.get(
    "/individual-trip/:id",
    function(req, res) {
        orm.Read("trips", function(trips) {
            res.render("individual-trip", trips[0]);
        },
            "id",[req.params.id]
        );
    },
);

router.get("*", function(req, res) {
    res.send("This is working!");
})

module.exports = router;