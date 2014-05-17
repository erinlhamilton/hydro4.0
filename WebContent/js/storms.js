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
		    	console.log(data);
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

function determineEnd(stream, precip){
	
	if(stream[stream.length-1].date < precip[precip.length-1].date){
		
		return "'" + precip[precip.length-1].date +"'";
		
	}else{
		return "'" + stream[stream.length-1].date +"'";
	}
	
}