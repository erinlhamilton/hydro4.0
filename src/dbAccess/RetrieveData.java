package dbAccess;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class RetrieveData {
	
	private String result;

	
	public RetrieveData(){
	}

	public String getGeoJSON(String sqlStatement){
		
		Connection  conn;                     // holds database connection 
		Statement   stmt;                     // holds SQL statement 
		try {
			Class.forName("org.postgresql.Driver"); //Load the JDBC driver 			
			/*
			 * Establish connection to the database nyc at localhost with the port as 5432
			 * with the username as postgres, password as admin
			 */
			String url = "jdbc:postgresql:" + serverLocation;
			conn = DriverManager.getConnection(url, dbOwner, dbPass); 
			
			//SQL statement passed to method
			String sql = sqlStatement;
			
			/*
			 * Create a statement and execute a select query
			 */
			stmt = conn.createStatement(); 
			ResultSet res = stmt.executeQuery(sql); //send the query to the database

			if (res != null){  // Making decision use if statement
				while(res.next()){   // Loop all the results
					result = res.getString(1); 
				}
			}
			/*
			 * After finishing query, close connection
			 */
			res.close(); 
			stmt.close(); 
			conn.close(); 	    

		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}   // load database interface 
		catch (SQLException e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	
/*
 * Retrieves gauge data for a given stream gauge as an arraylist
 * @param: (String) the gaugeID
 * @param: (String) the type of gauge data ("precipitation", "streamflow", or "turbidity")
 * @return: (ArrayList) the stream gauge data value pares
 */
public ArrayList getStreamGuageData(String gaugeID, String dataType){
	
	Connection  conn;                     // holds database connection 
	Statement   stmt;                     // holds SQL statement
	ArrayList<ArrayList> results = new ArrayList<ArrayList>();
	try {
		Class.forName("org.postgresql.Driver"); //Load the JDBC driver 			
		/*
		 * Establish connection to the database nyc at localhost with the port as 5432
		 * with the username as postgres, password as admin
		 */
		String url = "jdbc:postgresql:" + serverLocation;
		conn = DriverManager.getConnection(url, dbOwner, dbPass); 
		String sql = "";
		
		//SQL statements based on the gauge data type passed into the method
		switch(dataType){
		case "precipitation":
			sql = "SELECT "+dataType+".colldate, precipitation.pvalue "
					+ "FROM gauges "
					+ "INNER JOIN precipitation ON "
					+ "gauges.gaugeid = precipitation.gaugeid "
					+ "WHERE gauges.gaugeid = " + gaugeID
					+ "ORDER BY precipitation.colldate ASC";
			break;
		case "streamflow":
			sql = "SELECT "+dataType+".colldate, streamflow.svalue "
					+ "FROM gauges "
					+ "INNER JOIN streamflow ON "
					+ "gauges.gaugeid = streamflow.gaugeid "
					+ "WHERE gauges.gaugeid = " + gaugeID
					+ "ORDER BY streamflow.colldate ASC";
			break;
		case "turbidity":
			sql = "SELECT "+dataType+".colldate, turbidity.tvalue "
					+ "FROM gauges "
					+ "INNER JOIN turbidity ON "
					+ "gauges.gaugeid = turbidity.gaugeid "
					+ "WHERE gauges.gaugeid = " + gaugeID
					+ "ORDER BY turbidity.colldate ASC";
			break;
		
		}
		
		/*
		 * Create a statement and execute a select query
		 */
		stmt = conn.createStatement(); 
		ResultSet res = stmt.executeQuery(sql); //send the query to the database
		//put results into an arraylist
		if (res != null){  // Making decision use if statement
			while(res.next()){   // Loop all the results
				ArrayList<String> a = new ArrayList<String>();
				a.add(res.getString(1));
				a.add(res.getString(2));
				results.add(a); 
			}
		}
		/*
		 * After finishing query, close connection
		 */
		res.close(); 
		stmt.close(); 
		conn.close(); 	    

	} catch (ClassNotFoundException e) {
		e.printStackTrace();
	}   // load database interface 
	catch (SQLException e) {
		e.printStackTrace();
	}
	
	return results;
}



/*
 * Retrieves a json of storm events between two dates, based on dates passed in
 * @param: (startDate) the start of the date range to check
 * @param: (endDate) the end of the date range to check
 * @return: (JSON) of storm events
 */
public String getStormData(String startDate, String endDate){
	
	Connection  conn;                     // holds database connection 
	Statement   stmt;                     // holds SQL statement
	try {
		Class.forName("org.postgresql.Driver"); //Load the JDBC driver 			
		/*
		 * Establish connection to the database nyc at localhost with the port as 5432
		 * with the username as postgres, password as admin
		 */
		String url = "jdbc:postgresql:" + serverLocation;
		conn = DriverManager.getConnection(url, dbOwner, dbPass); 

		//This query takes a start date and end date and returns a JSON of
		//storm events that fall within those date ranges
		String sql = "SELECT array_to_json(array_agg(row_to_json(t))) FROM " +
					"(SELECT startdate,starttime,enddate,endtime,precip_in FROM stormevents " +
					"WHERE startdate > " + startDate + " AND startdate < " + endDate + ") as t";
		
		/*
		 * Create a statement and execute a select query
		 */
		stmt = conn.createStatement(); 
		ResultSet res = stmt.executeQuery(sql); //send the query to the database

		if (res != null){  // Making decision use if statement
			while(res.next()){   // Loop all the results
				result = res.getString(1); 
			}
		}
		/*
		 * After finishing query, close connection
		 */
		res.close(); 
		stmt.close(); 
		conn.close(); 	    

	} catch (ClassNotFoundException e) {
		e.printStackTrace();
	}   // load database interface 
	catch (SQLException e) {
		e.printStackTrace();
	}
	
	return result;
}

}
