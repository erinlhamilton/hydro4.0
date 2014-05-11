/**
 * 
 */


/**
 * Make an ajax call to retrieve gauge data from the server
 * @param: (dataType) 
 * @param: (gaugeID)
 */
function retrieveChartData(dataType, gaugeID){
	console.log(dataType);
	$.ajax({
	    url: serverlocation + "rest/services/" + dataType + "/" + gaugeID,
	    type: 'GET',
	    crossDomain: true,
	    dataType: 'json',
	    success: function(data) { 
	    	//if the data does not return as null, populate the graph
	    	if (data != null){
	    		
	    		//determine the type of data returned
				$("#"+ dataType).attr("disabled", false);
				$("#"+ dataType).prop('checked', true);
				loadAmChart(data, gaugeID);
	    	}else{
	    		//Disable the data checkbox if data does not return
	    		$("#"+ dataType).attr("disabled", true);
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

function loadAmChart(chartData, gID){
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
				"text": "Streamgauge " + gID
			}
		],
		"dataProvider": chartData
	});
}