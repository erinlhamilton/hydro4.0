/**
 * 
 */

/*global variables*/
var map;
var gauges;
var foxwolf;
var chart;
var columnArray;
var yAxis;
var catchment = new Object();
var serverlocation = "http://localhost:8080/hydro4.0/";

function initialize(){
	/*use strict*/
	//retrieveChartData("Precipitation", "'04072150'");
	setBaseMap();
	loadAllGauges();
	loadFoxWolf();
	
	
}


$(initialize);

/*Set the height of the map to half the size of the current window*/
$(window).on("resize", function() {
    $("#map").height($(window).height() * 0.65);
    $("#chart").height($(window).height()* 0.35);
}).trigger("resize");