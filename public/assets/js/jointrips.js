
$(".form").on("submit", function(submit) {
    submit.preventDefault();

    // Set up the object to send over
    var data = {
        trip_id: document.getElementsByName("trip_id")[0].value,
        relationship_type: "committed",
        profile_id: parseInt(document.getElementsByName("profile_id")[0].value),
    }

    // Check if the object has valid attributes
    if(data.profile_id === "" || isNaN(data.profile_id)) {
        var div = document.createElement("div")
        div.classList = "notification is-fs-orange"
        div.innerText = "Please add your user ID."
        div.addEventListener("click", function() {
            this.remove();
        })
        this.append(div)

    }
    // If valid, proceed to post the data function
    else {
        $.ajax("/added-to-trip", {
            type: "POST",
            data: data
        }).then(
            function(data) {
                    // Create a notification of the data;
                    // Data from the post contains test of whether the relation was created or not.
                    var div = document.createElement("div")
                    div.classList = "notification is-fs-orange"
                    div.innerText = data;
                    div.addEventListener("click", function() {
                        this.remove();
                    })
                    document.getElementsByClassName("form")[0].append(div)
            }
        );
    }

})


