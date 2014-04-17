/**
 * 
 */



/*Set the height of the map to half the size of the current window*/
$(window).on("resize", function() {
    $("#map").height($(window).height()/2);
}).trigger("resize");