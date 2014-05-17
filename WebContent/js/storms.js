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