package geom;

import dbAccess.RetrieveData;

public class Gauge {
	
	private String gaugeID;
	private String gaugeName;
	private String gaugePoint;
	private String catchmentPoly;
	private String precipData;
	private String streamData;
	private String turbidityData;
	private String allGauges;
	//private String startDate;
	//private String endDate;
	private RetrieveData db = new RetrieveData();

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
	 * Returns a text string of the precipitation data
	 * @returns: text string for given gauge
	 */
	public String getPrecip(){
		String sql = "SELECT precipitation.colldate, precipitation.pvalue "
				+ "FROM gauges "
				+ "INNER JOIN precipitation ON "
				+ "gauges.gaugeid = precipitation.gaugeid "
				+ "WHERE gauges.gaugeid = " + this.gaugeID
			    + " ORDER BY precipitation.colldate ASC";
		precipData = db.getStringData(sql);
		return precipData;
	}
	
	/* 
	 * Returns a text string of the streamflow data
	 * @returns: text string for given gauge
	 */
	public String getStreamflow(){
		String sql = "SELECT streamflow.colldate, streamflow.svalue "
				+ "FROM gauges "
				+ "INNER JOIN streamflow ON "
				+ "gauges.gaugeid = streamflow.gaugeid "
				+ "WHERE gauges.gaugeid = " + this.gaugeID;
		streamData= db.getStringData(sql);
		return streamData;
	}
	
	/* 
	 * Returns text string for turbidity data
	 * @returns: text string for given gauge
	 */
	public String getTurbidity(){
		String sql = "SELECT turbidity.colldate, turbidity.tvalue "
				+ "FROM gauges "
				+ "INNER JOIN turbidity ON "
				+ "gauges.gaugeid = turbidity.gaugeid "
				+ "WHERE gauges.gaugeid = " + this.gaugeID;
		turbidityData= db.getStringData(sql);
		return turbidityData;
	}
	
	public String calcStartDate(){

		return "";
	}
	
	public String calcEndDate(){
		
		return "";
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
