
// Pseudocoding

// 1. Create frontend for signup and signin 
// - Make input fields for username, email, and password 

// 2. Write frontend JS for a post request to post the user in the database

// 3. Write backend routes for posting and getting users

// hello moiz is here see? hi I see

$(document).ready(function() {

$("#submit-signup").on("click", function(event) {
    event.preventDefault();
    // prevents it from refreshing the page when submit button is clicked
    
    var newUser = {
        username: $("#signup-username").val().trim(),
        email: $("#signup-email").val().trim(),
        password: $("#signup-password").val()
    }

    console.log(newUser);
    
    $.ajax({
        url:"/signup",
        method: "POST",
        data: newUser
    }).then(function(res){
        $("#signup-form").after("<h1>Account Created</h1>");
    })

});

// we're going to write a POST request to "/signup" 
// It will follow a similar convention to app.get!
// SO, here it is



    
});

// We want to run our test application through testserver.JS, so, we want to navigate into /jkassi, and then type the command "node testserver.js"
// 