/**
 * 
 */

function getStormJSON(startDate, endDate){
		//make ajax request to the server
		$.ajax({
		    url: serverlocation+ "rest/services/storms/" + startDate + "/" + endDate,
		    type: 'GET',
		    crossDomain: true,
		    dataType: 'json',
		    success: function(data) { 
		    	storms = data;
		    	populateStormDropdown(data);
		    	},
		    error: function(e) { console.log(e); },
		});

}

function determineStart(stream, precip){
	
	if(stream[0].date < precip[0].date){
		
		return "'" + stream[0].date +"'";
		
	}else{
		
		return "'" + precip[0].date +"'";
	}
	
	
}

function addStorm(event){
	
	ia_wms = new L.tileLayer.wms(mapWebServer,
			{
				map: "ntp_kgrb_large_wms",
				crs: L.CRS.EPSG4326,
				layers: event,
				bbox: "-91.0,41.5,-85.0,47.5",
				width:"600",
				height:"600",
				transparent: true,
				styles: "default",
				format: 'image/png'
			}
		).addTo(map);
}

function determineEnd(stream, precip){
	
	if(stream[stream.length-1].date < precip[precip.length-1].date){
		
		return "'" + precip[precip.length-1].date +"'";
		
	}else{
		return "'" + stream[stream.length-1].date +"'";
	}
	
}