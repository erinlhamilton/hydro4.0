/**
 * 
 */


/*
 * Populate the gauge dropdown based on the gauge geojson properties
 * @param: geojson from loadAllGauges
 */

function populateGaugeDropdown(json){
	var gaugeName;
	var select = document.getElementById("gaugeDropdown"); //access gaugeDropdown DOM element
	var obj = json.features;
	for(var i = 0; i < obj.length; i++ ){
		var el = document.createElement("option");
		gaugeName = toTitleCase(obj[i].properties.name);
	    el.textContent = obj[i].properties.gaugeid + " - " + gaugeName;
	    el.value = obj[i].properties.gaugeid;
	    select.appendChild(el);
	}
}


/*
 * Populate the gauge dropdown based on the gauge geojson properties
 * @param: geojson from loadAllGauges
 */

function populateStormMetadata(json){
	var gaugeName;
	var select = document.getElementById("gaugeDropdown"); //access gaugeDropdown DOM element
	var obj = json.features;
	for(var i = 0; i < obj.length; i++ ){
		var el = document.createElement("option");
		gaugeName = toTitleCase(obj[i].properties.name);
	    el.textContent = obj[i].properties.gaugeid + " - " + gaugeName;
	    el.value = obj[i].properties.gaugeid;
	    select.appendChild(el);
	}
}



/*
 * Populate the gauge dropdown based on the storm json
 * @param: (obj) json of all storm events
 */

function populateStormDropdown(obj){
	var select = document.getElementById("stormDropdown"); //access gaugeDropdown DOM element
	for(var i = 0; i < obj.length; i++ ){
		var el = document.createElement("option");
	    el.textContent = "Start Date: " + obj[i].startdate + " Precipitation: " + obj[i].precip_in + " in";
	    el.value = obj[i].stid;
	    select.appendChild(el);
	}
}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

$("#gaugeDropdown").change(function() {
	var n = $(this).val();
	retrieveLocation(n);
});

$("#stormDropdown").change(function() {

	for(var key in storms) {
	    if(storms.hasOwnProperty(key)) {
	        if($(this).val() == storms[key].stid ){
	        	stormMetadata(key);
	        }
	    }
	}
});

$("#mtriDropdown").change(function() {
	console.log($(this).val());
	console.log(endStormDate);
	var n = $(this).val();
	addMTRI(n, endStormDate);
});
	
function stormMetadata(key){
	
	$("#stormStart").html(storms[key].startdate);
	$("#stormEnd").html(storms[key].enddate);
	//$("#stormDuration").append(storms[key].startdate);
	$("#stormPrecip").html(storms[key].precip_in + " in");
	modifyDate(storms[key].enddate);
	addStorm(storms[key].name);
	ia_wms.setOpacity(0.5);
}



$("#gaugeDropdown").mouseover(function(e) {
	var $target = $(e.target);
	if($target.is('option')){
		dropDownHighlight($target.val());
	}
	
});

$('#foxWolf').click(function() {
	if(this.checked){
	    foxwolf.setStyle({
	        fillOpacity: 0.30
	    });
	    foxwolf.bringToBack();
	}else{
	    foxwolf.setStyle({
	        fillOpacity: 0
	    });
	}
});

function modifyDate(inDate){

	endStormDate = inDate.replace(/-/g, "");
}

