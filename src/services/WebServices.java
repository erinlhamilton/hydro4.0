package services;


import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import geom.OtherVector;

@Path("/services")
public class WebServices {
	

	/*
	 * GET RestFull web service. Based on the gauge ID sent in the request
	 * returns the related catchment geometry.
	 * 
	 * @param: (id) the id of the gauge
	 * @return: The gauge polygon (as GeoJSON)
	 * */
	@GET
	@Path("/hello")
	@Produces("application/json")
	public String sayHello(){
		//TODO: implement this
		return "Hello There!";
	}
	
	
	/*
	 * GET RestFull web service. Based on the gauge ID sent in the request
	 * returns the related catchment geometry.
	 * 
	 * @param: (id) the id of the gauge
	 * @return: The gauge polygon (as GeoJSON)
	 * */
	@Path("/catchment/{id}")
	@GET
	@Produces("text/plain")
	public String returnCatchment(@PathParam("id") int ID){
		//TODO: implement this
		return "";
	}
	
	/*
	 * GET RestFull web service. Based on the gauge ID sent in the request
	 * returns the related gauge point.
	 * 
	 * @param: (id) the id of the gauge
	 * @return: The gauge point (as GeoJSON)
	 * */
	@Path("/gauge/{id}")
	@GET
	@Produces("text/javascript")
	public String returnGauge(@PathParam("id") int ID){
		//TODO: implement this
		return "";
	}
	
	/*
	 * GET RestFull web service. Based on the gauge ID sent in the request
	 * returns the related gauge point.
	 * 
	 * @param: (id) the id of the gauge
	 * @return: The gauge point (as GeoJSON)
	 * */
	@Path("/geojson/{id}")
	@GET
	@Produces("text/plain")
	public String returnVector(@PathParam("id") int ID){
		OtherVector vectorData = new OtherVector(ID);
		String geojson = vectorData.getVectorGeom();
		return geojson;
	}
	

}
