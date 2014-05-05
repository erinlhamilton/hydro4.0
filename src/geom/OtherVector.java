package geom;

import dbAccess.RetrieveData;

public class OtherVector {
	
	private int vectorID;
	private String vectorGeom;
	private String vectorName;
	private RetrieveData db = new RetrieveData();
	
	
	public OtherVector(int vectorID) {
		this.vectorID = vectorID;
	}
	
	public int getVectorID() {
		return this.vectorID;
	}
	
	public String getVectorGeom() {
		String sql = "SELECT ST_AsGeoJSON(geom) FROM vectorpolys WHERE gid = " + this.vectorID;
		vectorGeom = db.getGeoJSON(sql);
		return vectorGeom;
	}

	public String getVectorName() {
		String sql = "SELECT name FROM vectorpolys WHERE gid = " + this.vectorID;
		vectorName = db.getGeoJSON(sql);
		return vectorName;
	}


	


}
