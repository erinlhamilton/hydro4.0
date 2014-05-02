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
	private String startDate;
	private String endDate;
	private RetrieveData db = new RetrieveData();

	/*
	 * Constructor for gauge.
	 */
	public Gauge(String gaugeID){
		this.gaugeID = gaugeID;
	}
	
	private void determineData(){
		
	}
	
	/*getter method
	 * @returns: returns the ID of the catchment Area
	 */
	public String getID(){
		return this.gaugeID;
	}
	
	/*
	 *  Returns the name of the gauge by calling the database
	 * @returns: returns the name of the catchment
	 */
	public String name(){
		String sql = "SELECT name FROM gauges WHERE gaugeid = " + this.gaugeID;
		gaugeName = db.getStringData(sql);
		return gaugeName;
	}
	
	/* 
	 * Returns the xy point of the gauge as a geojson
	 * @returns: the the gauge point as a geojson
	 */
	public String point(){
		String sql = "SELECT ST_AsGeoJSON(geom) FROM gauges WHERE gaugeid = " + this.gaugeID;
		gaugePoint = db.getStringData(sql);
		return gaugePoint;
	}
	
	
	/* 
	 * Returns the geojson of the catchment related to the gauge
	 * @returns: the the catchment polygon as a geojson
	 */
	public String catchment(){
		String sql = "SELECT ST_AsGeoJSON(geom) FROM catchment WHERE gaugeid = " + this.gaugeID;
		catchmentPoly = db.getStringData(sql);
		return catchmentPoly;
	}
	
	/* 
	 * Returns a text string of the precipitation data
	 * @returns: text string for given gauge
	 */
	public String precip(){
		String sql = "SELECT gauges.gaugeid, gauges.name, precipitation.colldate, precipitation.pvalue "
				+ "FROM gauges "
				+ "INNER JOIN precipitation ON "
				+ "gauges.gaugeid = precipitation.gaugeid "
				+ "WHERE gauges.gaugeid = " + this.gaugeID;
		precipData = db.getStringData(sql);
		return precipData;
	}
	
	/* 
	 * Returns a text string of the streamflow data
	 * @returns: text string for given gauge
	 */
	public String streamflow(){
		String sql = "SELECT gauges.gaugeid, gauges.name, streamflow.colldate, streamflow.svalue "
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
	public String turbidity(){
		String sql = "SELECT gauges.gaugeid, gauges.name, turbidity.colldate, turbidity.tvalue "
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
	
}
