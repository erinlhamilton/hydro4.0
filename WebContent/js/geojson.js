/**
 * 
 */



/**
 * Add the foxwolf watershed geojson to the 
 * map by making an ajax web service request
 */
function loadFoxWolf(){
	var id = 1;//the postgres pkey of the foxwolf layer
	//set the geojson style
	var myStyle = {
	    "color": "#ff7800",
	    "weight": 1,
	    "opacity": 0.65,
	};
	//make ajax request to the server
	$.ajax({
	    url: serverlocation+ 'rest/services/geojson/' + id,
	    type: 'GET',
	    crossDomain: true,
	    dataType: 'json',
	    success: function(data) { 
	    	L.geoJson(data, {style: myStyle}).addTo(map);},//add to the map on success
	    error: function(e) { console.log(e); },
	});
	
}

function addGauges(){
	
	
	
}

