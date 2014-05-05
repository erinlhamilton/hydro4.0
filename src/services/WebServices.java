package services;


import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import geom.OtherVector;
import geom.Gauge;

@Path("/services")
public class WebServices {
	
	
	/*
	 * GET RestFull web service. Based on the gauge ID sent in the request
	 * returns the related gauge point.
	 * 
	 * @param: (id) the id of the gauge
	 * @return: The gauge point (as GeoJSON)
	 * */
	@GET
	@Path("/GaugeGeoJSON")
	@Produces("application/json")
	public String returnAllGauges(){
		Gauge g = new Gauge();
		String allGauges = g.getAllGaugesGeoJSON();
		return allGauges;
	}
	
	
	/*
	 * GET RestFull web service. Based on the gauge ID sent in the request
	 * returns the related catchment geometry.
	 * 
	 * @param: (id) the id of the gauge
	 * @return: The gauge polygon (as GeoJSON)
	 * */
	@GET
	@Path("/catchment/{id}")
	@Produces("text/javascript")
	public String returnCatchment(@PathParam("id") String cID){
		Gauge g = new Gauge();
		g.setID(cID);//set the id to current id
		String catchment = g.getCatchmentArea();
		return catchment;
	}
	
	/*
	 * GET RestFull web service. Based on the gauge ID sent in the request
	 * returns the related gauge point.
	 * 
	 * @param: (id) the id of the gauge
	 * @return: The gauge point (as GeoJSON)
	 * */
	@GET
	@Path("/GaugePoint/{id}")
	@Produces("text/javascript")
	public String returnGauge(@PathParam("id") String ID){
		Gauge g = new Gauge();
		g.setID(ID);//set id to current id
		String gauge = g.getGaugePoint();
		return gauge;
	}
	
	/*
	 * GET RestFull web service. Based on the gauge ID sent in the request
	 * returns the precipitation data for given gauge
	 * 
	 * @param: (id) the id of the gauge
	 * @return: JSON string of gauge data
	 * */
	@GET
	@Path("/Precipitation/{id}")
	@Produces("text/javascript")
	public String returnPrecipData(@PathParam("id") String ID){
		Gauge g = new Gauge();
		g.setID(ID);//set id to current id
		String precip = g.getGaugeData("precipitation");
		return precip;
	}
	
	/*
	 * GET RestFull web service. Based on the gauge ID sent in the request
	 * returns the streamflow data
	 * 
	 * @param: (id) the id of the gauge
	 * @return: JSON string of gauge data
	 * */
	@GET
	@Path("/Streamflow/{id}")
	@Produces("text/javascript")
	public String returnStreamflowData(@PathParam("id") String ID){
		Gauge g = new Gauge();
		g.setID(ID);//set id to current id
		String streamflow = g.getGaugeData("streamflow");
		return streamflow;
	}
	
	/*
	 * GET RestFull web service. Based on the gauge ID sent in the request
	 * returns the turbidity data for gauge.
	 * 
	 * @param: (id) the id of the gauge
	 * @return: JSON string of gauge data
	 * */
	@GET
	@Path("/Turbidity/{id}")
	@Produces("text/javascript")
	public String returnGaugeData(@PathParam("id") String ID){
		Gauge g = new Gauge();
		g.setID(ID);//set id to current id
		String turbidity = g.getGaugeData("turbidity");
		return turbidity;
	}
	
	/*
	 * GET RestFull web service. Based on the key, returns a geojson
	 * 
	 * @param: (id) the id of the gauge
	 * @return: The gauge point (as GeoJSON)
	 * */
	@Path("/geojson/{id}")
	@GET
	@Produces("application/json")
	public String returnVector(@PathParam("id") int ID){
		OtherVector vectorData = new OtherVector(ID);
		String geojson = vectorData.getVectorGeom();
		return geojson;
	}
	

}
