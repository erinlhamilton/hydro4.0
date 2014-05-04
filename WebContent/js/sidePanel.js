/**
 * 
 */


/*
 * Populate the gauge dropdown based on the gauge geojson properties
 * @param: geojson from loadAllGauges
 */

function populateGaugeDropdown(json){
	
	var select = document.getElementById("gaugeDropdown"); //access gaugeDropdown DOM element
	var obj = json.features;
	for(var i = 0; i < obj.length; i++ ){
		var el = document.createElement("option");
	    el.textContent = obj[i].properties.gaugeid + " - " + obj[i].properties.name;
	    el.value = obj[i].properties.gaugeid;
	    select.appendChild(el);
	}
}

$("#gaugeDropdown").change(function() {
	var n = $(this).val();
	retrieveLocation(n);
	
});

$("#gaugeDropdown").mouseover(function(e) {
	var $target = $(e.target);
	if($target.is('option')){
		dropDownHighlight($target.val());
	}
	
});

$('#foxWolf').click(function() {
	if(this.checked){
	    foxwolf.setStyle({
	        fillOpacity: 0.30
	    });
	    foxwolf.bringToBack();
	}else{
	    foxwolf.setStyle({
	        fillOpacity: 0
	    });
	}
});