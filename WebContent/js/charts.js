
function retrieveChartData(dataType, gaugeID){
	
	$.ajax({
	    url: serverlocation + "rest/services/" + dataType + "/" + gaugeID,
	    type: 'GET',
	    crossDomain: true,
	    dataType: 'json',
	    success: function(data) { 
	    	//if the data does not return as null, populate the graph
	    	if (data != null){
	    		//determine the type of data returned
	    		switch (dataType){
	    			case "Precipitation":
	    				var precipValue = new Array();
	    				precipValue.push("'Precipitation'");
	    				var precipDate = new Array();
	    				precipValue.push("'Date'");
	    				for (var i = 0; i < data.length; i++){
	    					precipDate.push(data[i].date);
	    					if(data[i].value ==''){
	    						precipValue.push(null);
	    					}else{
	    						var num = Math.round(data[i].value * 100) / 100;
	    						precipValue.push(num);
	    					}
	    				}
	    				loadChart(dataType, precipDate, precipValue);
		    			break;
	    			case "Streamflow":
	    				var streamflowValue = new Array();
	    				var streamflowDate = new Array();
	    				for (var i = 0; i < data.length; i++){
	    					streamflowValue.push(data[i].value);
			    			var dt = new Date(data[i].date);
			    			var d = Date.UTC(dt.getFullYear(),dt.getMonth(),dt.getDay());
			    			streamflowDate.push(d);
	    				}
	    				loadChart(streamflowDate, streamflowValue);
		    			break;
	    			case "Turbidity":
	    				var turbidityValue = new Array();
	    				var turbidityDate = new Array();
	    				for (var i = 0; i < data.length; i++){
			    			turbidityValue.push(data[i].value);
			    			var dt = new Date(data[i].date);
			    			var d = Date.UTC(dt.getFullYear(),dt.getMonth(),dt.getDay());
			    			turbidityDate.push(d);
	    				}
	    				loadChart(turbidityDate, turbidityValue);
		    			break;
		    		default:
		    			console.log(dataType + " is not a valid data type.");
		    			break;
	    			}
	    	}else{
	    		//Disable the data checkbox if data does not return
	    		$("\"#"+dataType+"\"").attr("disabled", true);
	    	}
	    	loadChart();
	    },//add geojson to map
	    error: function(e) { console.log(e); },
	});
	
}


function loadChart(dataType, xAxis, yAxis){
	columnArray = [xAxis, yAxis];
chart = c3.generate({
	
    data: {
	     x: xAxis[0],
	     columns: columnArray
	     },
	axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%Y-%m-%d'
            }
        }
	}
});
}