/**
 * 
 */

/*global variables*/
var map;
var serverlocation = "http://localhost/hydro4.0/";

function initialize(){
	/*use strict*/
	setBaseMap();
}


$(initialize);

/*Set the height of the map to half the size of the current window*/
$(window).on("resize", function() {
    $("#map").height($(window).height() * 0.65);
    $("#chart").height($(window).height()* 0.35);
}).trigger("resize");