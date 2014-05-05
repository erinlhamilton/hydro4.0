package geom;

import java.util.ArrayList;

import dbAccess.RetrieveData;

public class Gauge {
	
	private String gaugeID;
	private String gaugeName;
	private String gaugePoint;
	private String catchmentPoly;
	private String allGauges;
	private RetrieveData db = new RetrieveData();//new database object

	/*
	 * Constructor for gauge.
	 */
	public Gauge(){
	}

	/*
	 * Setter for gaugeID.
	 * @param: (gaugeID) the input gaugeID
	 */
	public void setID(String gaugeID){
		this.gaugeID = gaugeID;
	}
	
	/*getter method for gaugeID
	 * @returns: returns the ID of the gauge
	 */
	public String getID(){
		return this.gaugeID;
	}
	
	/*
	 *  Returns the name of the gauge by sending SQL to the database
	 * @returns: returns the name of the gauge
	 */
	public String getName(){
		String sql = "SELECT name FROM gauges WHERE gaugeid = " + this.gaugeID;
		gaugeName = db.getStringData(sql);
		return gaugeName;
	}
	
	/* 
	 * Returns the xy point of the gauge as a geojson
	 * @returns: the the gauge point as a geojson
	 */
	public String getGaugePoint(){
		String sql = "SELECT ST_AsGeoJSON(geom) FROM gauges WHERE gaugeid = " + this.gaugeID;
		gaugePoint = db.getStringData(sql);
		return gaugePoint;
	}
	
	
	/* 
	 * Returns the geojson of the catchment related to the gauge
	 * @returns: the the catchment polygon as a geojson
	 */
	public String getCatchmentArea(){
		String sql = "SELECT ST_AsGeoJSON(geom) FROM catchment WHERE gaugeid = " + this.gaugeID;
		catchmentPoly = db.getStringData(sql);
		return catchmentPoly;
	}
	
	/* 
	 * Returns a json string of the gauge data
	 * @param: precipitation, streamflow, or turbidity
	 * @returns: text string for given gauge
	 */
	public String getGaugeData(String gaugeType){
		String json_string ="";
		if(gaugeType.equals("precipitation") || gaugeType.equals("streamflow") || gaugeType.equals("turbidity")){
			ArrayList<ArrayList> gaugeData = db.getStreamGuageData(this.gaugeID, gaugeType);
			json_string = "[";
			for (ArrayList<String> s : gaugeData){
				json_string = json_string.concat("{\"" + s.get(0) + "\":\"" + s.get(1) + "\"},");
			}
			json_string = json_string.substring(0, json_string.length()-1); //remove the extra comma at the end
			json_string = json_string.concat("]");
			return json_string;
		}else{
			
			return json_string;
		}
		
	}
	
	/* 
	 * Returns a GEOJSON of all of the gauges including id and name
	 * @returns: all geojson gauges
	 */
	public String getAllGaugesGeoJSON(){
		String sql = "SELECT row_to_json(fc) " +
		 "FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features " +
				 "FROM (SELECT 'Feature' As type " +
				    ", ST_AsGeoJSON(lg.geom)::json As geometry " +
				    ", row_to_json((SELECT l FROM (SELECT gaugeID, name) As l " +
				      ")) As properties " +
				   "FROM gauges As lg   ) As f )  As fc";
		allGauges = db.getStringData(sql);
		return allGauges;
	}

	
}
