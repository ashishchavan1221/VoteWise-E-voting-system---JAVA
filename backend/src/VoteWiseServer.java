package backend.src;

import com.sun.net.httpserver.HttpServer;
import java.net.InetSocketAddress;
import java.io.FileInputStream;
import java.util.Properties;

public class VoteWiseServer {
    public static void main(String[] args) throws Exception {
        int port = 8080;
        try {
            Properties props = new Properties();
            FileInputStream in = new FileInputStream("config.properties");
            props.load(in);
            in.close();
            port = Integer.parseInt(props.getProperty("server.port", "8080"));
        } catch (Exception e) {
            System.err.println("Could not load config.properties. Using default port.");
        }

        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
        server.createContext("/api/auth", new AuthHandler());
        server.setExecutor(null);
        server.start();
        System.out.println("VoteWise Backend Server started successfully on http://localhost:" + port);
        System.out.println("Running in SQLite Zero-Install Mode. 'votewise.db' will handle your data locally.");
    }
}
