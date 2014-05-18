/**
 * 
 */

/*global variables*/
var map;
var gauges;
var foxwolf;
var chart;
var storms;
var gaugeDate = new Object();
var columnArray;
var yAxis;
var ia_wms;
var endStormDate;
var catchment = new Object();
var mapWebServer ="http://maps.aqua.wisc.edu/cgi-bin/mapserv.exe";
var serverlocation = "http://localhost:8080/hydro4.0/";

function initialize(){

	setBaseMap();
	loadAllGauges();
	loadFoxWolf();
	$("[data-slider]").bind("slider:ready slider:changed", function (event, data) {
		ia_wms.setOpacity(data.value.toFixed(2));
	  $(this).nextAll("span").html(data.value.toFixed(2));
	});
	
}


$(initialize);

/*Set the height of the map to half the size of the current window*/
$(window).on("resize", function() {
    $("#map").height($(window).height() * 0.65);
    $("#chart").height($(window).height()* 0.35);
}).trigger("resize");