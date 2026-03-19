package backend.src;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.ResultSet;

public class Database {
    // Stores the database file locally in the backend folder
    private static final String URL = "jdbc:sqlite:votewise.db";

    static {
        try {
            // Load SQLite driver
            Class.forName("org.sqlite.JDBC");
            initDatabase();
        } catch (Exception e) {
            System.err.println("Fatal Error loading SQLite driver: " + e.getMessage());
        }
    }

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL);
    }

    private static void initDatabase() {
        try (Connection conn = getConnection(); Statement stmt = conn.createStatement()) {
            
            // 1. Create Users Table
            stmt.execute("CREATE TABLE IF NOT EXISTS users (" +
                "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                "name TEXT NOT NULL, " +
                "voter_id TEXT UNIQUE NOT NULL, " +
                "college TEXT, " +
                "email TEXT, " +
                "age INTEGER NOT NULL, " +
                "password TEXT NOT NULL, " +
                "role TEXT DEFAULT 'voter', " +
                "created_at DATETIME DEFAULT CURRENT_TIMESTAMP" +
            ");");

            // 2. Create Candidates Table
            stmt.execute("CREATE TABLE IF NOT EXISTS candidates (" +
                "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                "name TEXT NOT NULL, " +
                "party_or_group TEXT, " +
                "manifesto TEXT, " +
                "created_at DATETIME DEFAULT CURRENT_TIMESTAMP" +
            ");");

            // 3. Create Votes Table
            stmt.execute("CREATE TABLE IF NOT EXISTS votes (" +
                "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                "user_id INTEGER NOT NULL, " +
                "candidate_id INTEGER NOT NULL, " +
                "voted_at DATETIME DEFAULT CURRENT_TIMESTAMP, " +
                "FOREIGN KEY(user_id) REFERENCES users(id), " +
                "FOREIGN KEY(candidate_id) REFERENCES candidates(id), " +
                "UNIQUE(user_id)" +
            ");");

            // 4. Automatically Seed Candidates if the DB is freshly created
            ResultSet rs = stmt.executeQuery("SELECT count(*) AS c FROM candidates");
            if (rs.next() && rs.getInt("c") == 0) {
                System.out.println("SQLite: Fresh Database detected. Seeding mock candidates and admin...");
                stmt.execute("INSERT INTO candidates (name, party_or_group, manifesto) VALUES " +
                    "('Rahul Sharma', 'Student Union', 'Better campus facilities and flexible hostel timings.'), " +
                    "('Priya Patel', 'Tech Innovators', '24/7 dedicated computer labs and sponsored hackathons.'), " +
                    "('Amit Singh', 'Cultural Council', 'Organizing nationwide university fests and events.');"
                );
                
                // Seed Admin User
                stmt.execute("INSERT INTO users (name, voter_id, college, email, age, password, role) " +
                    "VALUES ('System Admin', 'ADMIN_001', 'Admin', 'admin@votewise.lpu.in', 30, 'admin123', 'admin');"
                );
            }
        } catch (SQLException e) {
            System.err.println("Database initialization failed: " + e.getMessage());
        }
    }
}
