
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
	    				$("#Precipitation").attr("disabled", false);
	    				$('#Precipitation').prop('checked', true);
	    				loadAmChart(data);
	    				//loadChart(precipDate, precipValue);
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
	    		$("#Precipitation").attr("disabled", true);
	    	}
	    },//add geojson to map
	    error: function(e) { console.log(e); },
	});
	
}


function loadChart(xAxis, yAxis){
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

function loadAmChart(chartData){
AmCharts.makeChart("chart",
	{
		"type": "serial",
		"pathToImages": "http://cdn.amcharts.com/lib/3/images/",
		"categoryField": "date",
		"dataDateFormat": "YYYY-MM-DD",
		"categoryAxis": {
			"parseDates": true
		},
		"chartCursor": {},
		"chartScrollbar": {},
		"trendLines": [],
		"graphs": [
			{
				"bullet": "none",
				"id": "AmGraph-1",
				"title": "Precipitation(in)",
				"valueField": "value"
			}//,
//			{
//				"bullet": "square",
//				"id": "AmGraph-2",
//				"title": "graph 2",
//				"valueField": "column-2"
//			}
		],
		"guides": [],
		"valueAxes": [
			{
				"id": "ValueAxis-1",
				"title": ""
			}
		],
		"allLabels": [],
		"balloon": {},
		"legend": {
			"useGraphSettings": true
		},
		"titles": [
			{
				"id": "Title-1",
				"size": 15,
				"text": "Stream Gauges"
			}
		],
		"dataProvider": chartData
	});
}