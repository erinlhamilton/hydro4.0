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
	    "weight": 0,
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



function loadAllGauges(){
	
	var geojsonMarkerOptions = {
		    radius: 8,
		    fillColor: "#ff7800",
		    color: "#000",
		    weight: 1,
		    opacity: 1,
		    fillOpacity: 0.8
		};

	//make ajax request to the server
	$.ajax({
	    url: serverlocation+ 'rest/services/GaugeGeoJSON',
	    type: 'GET',
	    crossDomain: true,
	    dataType: 'json',
	    success: function(data) { 
	    	populateDropdown(data);
	    	L.geoJson(data, {
	    	    pointToLayer: function (feature, latlng) {
	    	        return L.circleMarker(latlng, geojsonMarkerOptions);
	    	    },
	    	    onEachFeature: function (feature, layer) {
	    	        layer.bindPopup(feature.properties.gaugeid + ": " + feature.properties.name);
	    	    }
	    	}).addTo(map);},//add to the map on success
	    error: function(e) { console.log(e); },
	});
	
}

function populateDropdown(json){
	
	var select = document.getElementById("gaugeDropdown"); 
	var obj = json.features;
	for(var i = 0; i < obj.length; i++ ){
		var el = document.createElement("option");
	    el.textContent = obj[i].properties.gaugeid + " - " + obj[i].properties.name;
	    el.value = obj[i].properties.gaugeid;
	    select.appendChild(el);
	}
}



