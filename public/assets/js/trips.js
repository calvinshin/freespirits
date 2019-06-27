orm.SpecificTripsColumn("destination", function(result) {
    console.log(result);
})

function autocomplete(inp, arr) {
    var currentFocus; //???

    $("#destination-box").change(function(e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) {return false;}
        currentFocus = -1;

        var aitems = $("<div>");
        aitems.setAttribute("id", this.id + "autocomplete-list");
        aitems.setAttribute("class", "autocomplete-items");
        this.append(items);
        for (var i = 0; i<arr.length; i++) {
            if (arr[i].substr(0, val.lenght).toUpperCase() == val.toUpperCase()) {
                var bmatch = $("<div>");
                bmatch.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                bmatch.innerHTML += arr[i].substr(val.length);
                bmatch.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                    $(b).on("click", function(e) {
                        inp.value = this.$("input")[0].val;
                    })
            }
        }


    });

}

