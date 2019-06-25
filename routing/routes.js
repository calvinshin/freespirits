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
    res.render("index")
});

router.get("/search", function(req, res) {
    res.render("search-page")
});

router.get("/search-results", function(req, res) {
    orm.Read("trips", function(trips) {
        res.render("search-results", {trips: trips})
    });
});

router.get("/create-trip", function(req, res) {
    res.render("create-trip")
});

router.post("/confirmation-trip", function(req, res) {
    orm.Create("trips", req.body, function(result) {
        console.log(result)
        res.redirect("/individual-trip/" + result)
    });
});

router.get("/create-profile", function(req, res) {
    res.render("create-profile")
});

router.post("/confirmation-profile", function(req, res) {
    orm.Create("profiles", req.body, function(result) {
        res.render("view-profile", result)
    });
});

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

router.get("/api/trips", function(req, res) {
    connection.query("SELECT * FROM trips", function (err, trips) {
        // res.send("/api/trips")
    res.render("search-results", {trips: trips})
    });
});

router.get ("/api/profiles", function(req, res) {
    connection.query("SELECT * FROM profiles", function (err, profiles) {
        // res.send("/api/trips")
    res.render("all-profiles", {profiles: profiles})
    }) 
});



router.get("*", function(req, res) {
    res.send("This is working!");
})

module.exports = router;