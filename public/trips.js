$(function() {
    $(".search-trips").on("submit", function(event) {
        event.preventDefault();

        app.get ("/api/trips", function(req, res) {
            res.render("index", data)
        })
            
        



    })








})