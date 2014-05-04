/**
 * 
 */

/*The section is for creating the proportional symbol markers.*/
	//set original style for each marker symbol
function gaugeStyle(feature) {
	return {
		fillColor: 'yellow',
		color: '#484848',
		fillOpacity: 0.5
	};
}

function onEachFeature(feature, layer){
	var popupText = layer.feature.properties.gaugeid  + ": " + layer.feature.properties.name;
	layer.bindPopup(popupText, {
		offset: new L.Point(0, -10)
	});
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: selectGauge
    });
}

function selectGauge(e){
	var layer = e.target;
	retrieveLocation(layer.feature.properties.gaugeid);
}

function resetHighlight(e) {
    var layer = e.target;
	layer.setStyle({
		 weight: 0,
		 fillOpacity: 0.8
	    });
}


function highlightFeature(e) {
	
    var layer = e.target;
    layer.openPopup();
    layer.setStyle({
    	weight: 5,
        fillOpacity: 1
    });
    
    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
}

function dropDownHighlight(inSite){

		console.log(inSite);
	gauges.eachLayer(function(layer){
		if (layer.feature.properties.gaugeid == inSite){
			layer.openPopup();
		}
	});

}

function retrieveLocation(inSite){
	
	if(inSite != "null"){
		gauges.eachLayer(function(layer){
			if (layer.feature.properties.gaugeid == inSite){
				layer.setStyle({radius: 10, fillColor: 'red' });
				layer.openPopup();
				layer.bringToFront();
			}else{
				layer.setStyle({radius: 5, fillColor: "#ff7800"});
			}
		});
	}else{
		gauges.eachLayer(function(layer){
			layer.setStyle({radius: 6, fillColor: "#ff7800"});
			layer.closePopup();
		});
	}
}
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
	    	//L.geoJson(data, {style: myStyle}).addTo(map);
	    	},//add to the map on success
	    error: function(e) { console.log(e); },
	});
	
}





function loadAllGauges(){
	

	//make ajax request to the server
	$.ajax({
	    url: serverlocation+ 'rest/services/GaugeGeoJSON',
	    type: 'GET',
	    crossDomain: true,
	    dataType: 'json',
	    success: function(data) { 
	    	populateGaugeDropdown(data);//--> sidePanel.js
	    	gauges = L.geoJson(data, {
	    		  pointToLayer: function (feature, latlng) {
		    	        return L.circleMarker(latlng, {
		    			    radius: 6,
		    			    fillColor: "#ff7800",
		    			    color: 'red',
		    			    weight: 0,
		    			    opacity: 1,
		    			    fillOpacity: 0.8
		    			});
		    	    },
	    	    onEachFeature: onEachFeature
	    	  
	    	});
	    	gauges.addTo(map);},//add geojson to map
	    error: function(e) { console.log(e); },
	});
	
}

function loadCatchment(gaugeID){
	//make ajax request to the server
	$.ajax({
	    url: serverlocation+ 'rest/services/GaugeGeoJSON',
	    type: 'GET',
	    crossDomain: true,
	    dataType: 'json',
	    success: function(data) { 
	    	populateGaugeDropdown(data);//--> sidePanel.js
	    	gauges = L.geoJson(data, {
	    		  pointToLayer: function (feature, latlng) {
		    	        return L.circleMarker(latlng, {
		    			    radius: 6,
		    			    fillColor: "#ff7800",
		    			    color: 'red',
		    			    weight: 0,
		    			    opacity: 1,
		    			    fillOpacity: 0.8
		    			});
		    	    },
	    	    onEachFeature: onEachFeature
	    	  
	    	});
	    	gauges.addTo(map);},//add geojson to map
	    error: function(e) { console.log(e); },
	});
	
	
}







