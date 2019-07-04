// $(".join-trip").click(function() {
//     alert("Hey!")
// })


// orm.SpecificTripsColumn("destination", function(result) {
//     console.log(result);
// })

// function autocomplete(inp, arr) {
//     var currentFocus; //???

//     $("#destination-box").change(function(e) {
//         var a, b, i, val = this.value;
//         closeAllLists();
//         if (!val) {return false;}
//         currentFocus = -1;

//         var aitems = $("<div>");
//         aitems.setAttribute("id", this.id + "autocomplete-list");
//         aitems.setAttribute("class", "autocomplete-items");
//         this.append(items);
//         for (var i = 0; i<arr.length; i++) {
//             if (arr[i].substr(0, val.lenght).toUpperCase() == val.toUpperCase()) {
//                 var bmatch = $("<div>");
//                 bmatch.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
//                 bmatch.innerHTML += arr[i].substr(val.length);
//                 bmatch.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
//                     $(b).on("click", function(e) {
//                         inp.value = this.$("input")[0].val;
//                     })
//             }
//         }


//     });

// }

$(".form").on("submit", function(submit) {
    submit.preventDefault();

    var data = {
        trip_id: document.getElementsByName("trip_id")[0].value,
        relationship_type: "committed",
        profile_id: document.getElementsByName("profile_id")[0].value,
    }

    if(data.profile_id === "") {
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
            function() {
            console.log("created new cat");
            // Reload the page to get the updated list
            location.reload();
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


