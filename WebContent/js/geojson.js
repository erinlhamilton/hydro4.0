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
	var popupText ="<b>USGS Water Gauge</b><br> <b>ID: </b>"+ layer.feature.properties.gaugeid  + "<br><b>Name: </b>" + layer.feature.properties.name;
	layer.bindPopup(popupText, {
		offset: new L.Point(0, -5)
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
    	weight: 2,
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
	var gaugeSite = "'" + inSite + "'";
	
	if(inSite != "null"){
		 loadCatchment(inSite);
		gauges.eachLayer(function(layer){
			if (layer.feature.properties.gaugeid == inSite){
				layer.setStyle({radius: 10, fillColor: "#ff7800" });
				layer.openPopup();
				layer.bringToFront();
			}else{
				layer.setStyle({radius: 5, fillColor: "#1f78b4" });
			}
		});
		 retrieveChartData("Precipitation", gaugeSite);
		// retrieveChartData('Streamflow', inSite);
	}else{
		gauges.eachLayer(function(layer){
			layer.setStyle({radius: 6, fillColor: "#1f78b4"});
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
	    "color": "#b2df8a",
	    "weight": 0,
	    "fillOpacity": 0.5,
	};
	//make ajax request to the server
	$.ajax({
	    url: serverlocation+ 'rest/services/geojson/' + id,
	    type: 'GET',
	    crossDomain: true,
	    dataType: 'json',
	    success: function(data) { 
	    	
	    	foxwolf = L.geoJson(data, {style: myStyle});
	    	foxwolf.addTo(map);
	    	foxwolf.bringToBack();
	    	$('#foxWolf').prop('checked', true);
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
		    			    fillColor: "#1f78b4",
		    			    color: "#ff7800",
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

function loadCatchment(gID){
	
//	if ( $.inArray( '06/04/2012', bank_holidays ) > -1 ){
//		
//		catchment[gID].
//		
//	}
	
	var gaugeID = "\'" + gID + "\'";
	console.log(gaugeID);
	var myStyle = {
		    "color": 'blue',
		    "weight": 0,
		    "opacity": 0.8,
		};
	var catchment;
	//make ajax request to the server
	$.ajax({
	    url: serverlocation+ "rest/services/catchment/" + gaugeID,
	    type: 'GET',
	    crossDomain: true,
	    dataType: 'json',
	    success: function(data) { 
	    	
	    	catchment = L.geoJson(data, {style: myStyle});
	    	catchment.addTo(map);
	    	
	    	},
	    error: function(e) { console.log(e); },
	});
	
	
}







