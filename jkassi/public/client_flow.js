
// Pseudocoding

// 1. Create frontend for signup and signin 
// - Make input fields for username, email, and password 

// 2. Write frontend JS for a post request to post the user in the database

// 3. Write backend routes for posting and getting users


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
        $("#signup-form").after(res);
    })

});

// we're going to write a POST request to "/signup" 
// It will follow a similar convention to app.get!
// SO, here it is

$("#submit-login").on("click", function(event) {
    event.preventDefault();
    // prevents it from refreshing the page when submit button is clicked
    
    var newUser = {
        username: $("#login-username").val().trim(),
        // email: $("#signup-email").val().trim(),
        password: $("#login-password").val()
    }

    // console.log(newUser);
    // uncomment this out for testing later ^
    
    $.ajax({
        url:"/login",
        method: "POST",
        data: newUser
    }).then(function(res){
        $("#login-form").after(res);
    })

});

    
});

// We want to run our test application through testserver.JS, so, we want to navigate into /jkassi, and then type the command "node testserver.js"
// 