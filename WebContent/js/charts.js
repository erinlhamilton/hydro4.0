/**
 * 
 */




/**
 * Make an ajax call to retrieve gauge data from the server
 * when returns, calls function to create chart to display data
 * @param: (gaugeID)
 */
function retrieveData(gaugeID){
	var streamData;
	//first retrieve streamflow data
	$.ajax({
	    url: serverlocation + "rest/services/Streamflow/" + gaugeID,
	    type: 'GET',
	    crossDomain: true,
	    dataType: 'json',
	    success: function(data) { 
	    	 streamData = data;
	    	 
			//second retrieve precipitation data
	    	$.ajax({
	    	    url: serverlocation + "rest/services/Precipitation/" + gaugeID,
	    	    type: 'GET',
	    	    crossDomain: true,
	    	    dataType: 'json',
	    	    success: function(precipData) { 
	    	    	
	    	    	//if both datasets are not null, populate the graph
	    	    	//with both datasets
	    	    	if (streamData != null & precipData != null){
	    		    	
	    				$("#Precipitation").attr("disabled", false);
	    				$("#Precipitation").prop('checked', true);
	    				$("#Streamflow").attr("disabled", false);
	    				$("#Streamflow").prop('checked', true);
	    				
	    				generateChartData(streamData, precipData);
	    				   				
	    			//if streamflow data is not null, but precipitation data is
	    			//only display streamflow data
	    	    	}else if(streamData != null){

	    				$("#Streamflow").attr("disabled", false);
	    				$("#Streamflow").prop('checked', true);
	    	    		//Disable the data checkbox if data does not return
	    	    		$("#Precipitation").attr("disabled", true);
	    	    		$("#Precipitation").prop('checked', false);
	    	    		generateSingleChart(streamData, "Streamflow", gaugeID);
    	    		//if precipitation data is not null, but streamflow data is
	    			//only display precipitation data
	    	    	}else{
	    	    		
	    				$("#Precipitation").attr("disabled", false);
	    				$("#Precipitation").prop('checked', true);
	    				//Disable the data checkbox if data does not return
	    				$("#Streamflow").attr("disabled", true);
	    				$("#Streamflow").prop('checked', false);
	    				generateSingleChart(precipData, "Precipitation", gaugeID);

	    	    	}
	    	    },
	    	    error: function(e) { console.log(e); },
	    	});
	    },
	    error: function(e) { console.log(e); },
	});
	
}

/**
 * If both datasets return as not null, we must combine them into
 * one object which shares the same date in order to populate the graph
 * @param: (stream) the streamflow data object
 * @param: (precip) the precipitation data object
 * @param: (gaugeID) the id of the gauge the data came from
 */
function generateChartData(stream, precip, gaugeID){
	var chartData = [];// the new array of objects
	
	//first add streamflow data to the object array
	for(var i = 0; i < stream.length; i++){
		chartData[stream[i].date] = new Object();
		chartData[stream[i].date].date = stream[i].date;
		chartData[stream[i].date].stream = stream[i].value;
		chartData[stream[i].date].precip = null;
	}
	
	//next add the precipitation data to the array of objects,
	//checking to first see if a date already exists
	for(var i = 0; i < precip.length; i++){
		
		if(chartData[precip[i].date]){
			chartData[precip[i].date].precip = precip[i].value;
		}else{
			chartData[precip[i].date] = new Object();
			chartData[precip[i].date].date = precip[i].date;
			chartData[precip[i].date].precip = precip[i].value;
			chartData[precip[i].date].stream = null;
		}
	}
	var chartData2 = [];
	for(var key in chartData){
		chartData2.push(chartData[key]);
	}
	
	//with new data object, create the chart!
	generateDoubleChart(chartData2, gaugeID);
}



function generateSingleChart(chartData, dataType, gID){
	var lineColor;
	if (dataType == "Streamflow"){
		lineColor = "#FF6600";
	}else{
		lineColor = "#1b9e77";
	}
	chart = AmCharts.makeChart("chart", {
	    "type": "serial",
	    "theme": "none",
	    "pathToImages": "http://www.amcharts.com/lib/3/images/",
	    "dataProvider": chartData,
	    "valueAxes": [{
	        "axisAlpha": 0.2,
	        "dashLength": 1,
	        "position": "left"
	    }],
	    "graphs": [{
	        "id":"g1",
	        "balloonText": "<span style='font-size:14px;'>" + dataType +": <b>[[value]]</b> </span>",
	        "bullet": "round",
	        "bulletBorderAlpha": 1,
	        "lineColor": lineColor,
			"bulletColor":"#FFFFFF",
	        "hideBulletsCount": 50,
	        "title": dataType,
	        "valueField": "value",
			"useLineColorForBulletBorder":true
	    }],
	    "chartScrollbar": {
	        "autoGridCount": true,
	        "graph": "g1",
	        "scrollbarHeight": 40
	    },
	    "chartCursor": {
	        "cursorPosition": "mouse"
	    },
	    "categoryField": "date",
	    "categoryAxis": {
	        "parseDates": true,
	        "axisColor": "#DADADA",
	        "dashLength": 1,
	        "minorGridEnabled": true
	    },
		"exportConfig":{
		  menuRight: '20px',
	      menuBottom: '30px',
	      menuItems: [{
	      icon: 'http://www.amcharts.com/lib/3/images/export.png',
	      format: 'png'	  
	      }]  
		}
	});

}



function generateDoubleChart(chartData, gaugeID){

	chart = AmCharts.makeChart("chart", {
	    "type": "serial",
	    "theme": "none",
	    "pathToImages": "http://www.amcharts.com/lib/3/images/",
	    "legend": {
	        "useGraphSettings": true
	    },
	    "dataProvider": chartData,
	    "valueAxes": [{
	        "id":"v1",
	        "axisColor": "#FF6600",
	        "axisThickness": 2,
	        "gridAlpha": 0,
	        "axisAlpha": 1,
	        "position": "left"
	    }, {
	        "id":"v2",
	        "axisColor": "#1b9e77",
	        "axisThickness": 2,
	        "gridAlpha": 0,
	        "axisAlpha": 1,
	        "offset": 50,
	        "position": "left"
	    }],
	    "graphs": [{
	    	"id": "g1",
	        "valueAxis": "v1",
	        "lineColor": "#FF6600",
	        "connect": false,
	        "balloonText": "<span style='font-size:14px;'>Streamflow: <b>[[stream]]</b></span>",
	        "title": "Streamflow",
	        "valueField": "stream",
			"fillAlphas": 0
	    }, {
	        "valueAxis": "v2",
	        "lineColor": "#1b9e77",
	        "connect": false,
	        "balloonText": "<span style='font-size:14px;'>Precipitation: <b>[[precip]]</b> in</span>",
	        "title": "Precipitation",
	        "valueField": "precip",
			"fillAlphas": 0
	    }],
	    "chartScrollbar": {
	        "autoGridCount": true,
	        "graph": "g1",
	        "scrollbarHeight": 40
	    },
	    "chartCursor": {
	        "cursorPosition": "mouse"
	    },
	    "categoryField": "date",
	    "categoryAxis": {
	        "parseDates": true,
	        "axisColor": "#DADADA",
	        "minorGridEnabled": true
	    }
	});
}
