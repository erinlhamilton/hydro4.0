package dbAccess;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class RetrieveData {
	
	private String result;
	
	public RetrieveData(){
	}

	public String getStringData(String sqlStatement){
		
		Connection  conn;                     // holds database connection 
		Statement   stmt;                     // holds SQL statement 
		try {
			Class.forName("org.postgresql.Driver"); //Load the JDBC driver 			
			/*
			 * Establish connection to the database nyc at localhost with the port as 5432
			 * with the username as postgres, password as admin
			 */
			String url = "jdbc:postgresql:";
			conn = DriverManager.getConnection(url, "", ""); 
			
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
}
