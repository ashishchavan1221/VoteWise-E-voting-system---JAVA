package backend.src;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class AuthHandler implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();
        String path = exchange.getRequestURI().getPath();

        // CORS headers
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");

        if ("OPTIONS".equals(method)) {
            exchange.sendResponseHeaders(204, -1);
            return;
        }

        if ("POST".equals(method)) {
            InputStream is = exchange.getRequestBody();
            String body = new String(is.readAllBytes());
            
            if (path.equals("/api/auth/login")) {
                handleLogin(exchange, body);
            } else if (path.equals("/api/auth/register")) {
                handleRegister(exchange, body);
            } else {
                sendResponse(exchange, 404, "Not Found");
            }
        } else {
            sendResponse(exchange, 405, "Method Not Allowed");
        }
    }

    private void handleLogin(HttpExchange exchange, String body) throws IOException {
        String voterId = extractJsonValue(body, "voterId");
        String password = extractJsonValue(body, "password");

        try (Connection conn = Database.getConnection()) {
            String query = "SELECT * FROM users WHERE voter_id = ? AND password = ?";
            PreparedStatement pstmt = conn.prepareStatement(query);
            pstmt.setString(1, voterId);
            pstmt.setString(2, password);
            ResultSet rs = pstmt.executeQuery();

            if (rs.next()) {
                String response = "{\"status\": \"success\", \"voterId\": \"" + voterId + "\"}";
                sendResponse(exchange, 200, response);
            } else {
                sendResponse(exchange, 401, "Invalid Voter ID or Password");
            }
        } catch (Exception e) {
            e.printStackTrace();
            sendResponse(exchange, 500, "Server Error: " + e.getMessage());
        }
    }

    private void handleRegister(HttpExchange exchange, String body) throws IOException {
        String name = extractJsonValue(body, "name");
        String voterId = extractJsonValue(body, "voterId");
        String college = extractJsonValue(body, "college");
        String email = extractJsonValue(body, "email");
        String ageStr = extractJsonValue(body, "age");
        String password = extractJsonValue(body, "password");

        int age = 18;
        try { age = Integer.parseInt(ageStr); } catch(Exception e) {}

        if (age < 18) {
            sendResponse(exchange, 400, "Voter must be at least 18 years old.");
            return;
        }

        try (Connection conn = Database.getConnection()) {
            String query = "INSERT INTO users (name, voter_id, college, email, age, password) VALUES (?, ?, ?, ?, ?, ?)";
            PreparedStatement pstmt = conn.prepareStatement(query);
            pstmt.setString(1, name);
            pstmt.setString(2, voterId);
            pstmt.setString(3, college);
            pstmt.setString(4, email);
            pstmt.setInt(5, age);
            pstmt.setString(6, password);
            pstmt.executeUpdate();

            sendResponse(exchange, 201, "{\"status\": \"success\"}");
        } catch (java.sql.SQLException dup) {
            if(dup.getMessage() != null && dup.getMessage().toLowerCase().contains("unique")) {
                sendResponse(exchange, 400, "Voter ID already registered");
            } else {
                dup.printStackTrace();
                sendResponse(exchange, 500, "Server Error: " + dup.getMessage());
            }
        } catch (Exception e) {
            e.printStackTrace();
            sendResponse(exchange, 500, "Server Error: " + e.getMessage());
        }
    }

    private String extractJsonValue(String json, String key) {
        String search = "\"" + key + "\":";
        int index = json.indexOf(search);
        if (index == -1) return "";
        int start = json.indexOf("\"", index + search.length()) + 1;
        int end = json.indexOf("\"", start);
        return json.substring(start, end);
    }

    private void sendResponse(HttpExchange exchange, int statusCode, String response) throws IOException {
        exchange.sendResponseHeaders(statusCode, response.getBytes().length);
        OutputStream os = exchange.getResponseBody();
        os.write(response.getBytes());
        os.close();
    }
}
