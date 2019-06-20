

$(".search-trips").on("click", function(event) {
    event.preventDefault();
    
    $.ajax({
        type: "GET",
        url: "/searchResults"
        
    }).then(function(response) {
        console.log(response)
    });

    // app.get ("/api/trips", function(req, res) {
    //     createConnection.query("SELECT * FROM trips", function (err, result) {
            
    //     })
    //     //index.handlebars file. 
    //     res.render("index", trips)
    // })
        
    

});

// $(function() {
    
// });