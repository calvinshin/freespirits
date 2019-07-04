
$(".form").on("submit", function(submit) {
    submit.preventDefault();


    var data = {
        trip_id: document.getElementsByName("trip_id")[0].value,
        relationship_type: "committed",
        profile_id: parseInt(document.getElementsByName("profile_id")[0].value),
    }
    console.log(data);
    console.log(isNaN(data.profile_id));

    if(data.profile_id === "" || isNaN(data.profile_id)) {
        var div = document.createElement("div")
        div.classList = "notification is-fs-orange"
        div.innerText = "Please add your user ID."
        div.addEventListener("click", function() {
            this.remove();
        })
        this.append(div)

    }
    else {
        $.ajax("/added-to-trip", {
            type: "POST",
            data: data
        }).then(
            function(data) {
                console.log(data);
                    var div = document.createElement("div")
                    div.classList = "notification is-fs-orange"
                    div.innerText = "Joined!"
                    div.addEventListener("click", function() {
                        this.remove();
                    })
                    document.getElementsByClassName("form")[0].append(div)
            }
        );
    }
    // if(data.profile_id)

    // $.ajax("/added-to-trip", {
    //     type: "POST",
    //     data: data
    //   }).then(
    //     function() {
    //       console.log("created new cat");
    //       // Reload the page to get the updated list
    //       location.reload();
    //     }
    //   );
})


