package com.votewise.ui;

import javax.swing.*;
import java.awt.*;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import org.json.JSONObject;
import org.json.JSONArray;

/**
 * HTTP client to communicate with the VoteWise backend API.
 * Handles registration, login, voting, and results.
 */
public class ApiClient {

    private static final String BASE_URL = "http://localhost:8888";
    private static final HttpClient client = HttpClient.newHttpClient();

    // ─── Current user session ───
    private static String currentVoterId = null;
    private static String currentToken = null;
    private static String currentUserName = null;

    public static void setSession(String voterId, String token, String name) {
        currentVoterId = voterId;
        currentToken = token;
        currentUserName = name;
    }

    public static String getCurrentVoterId() { return currentVoterId; }
    public static String getCurrentToken() { return currentToken; }
    public static String getCurrentUserName() { return currentUserName; }

    public static void clearSession() {
        currentVoterId = null;
        currentToken = null;
        currentUserName = null;
    }

    // ─── Registration ───
    public static JSONObject register(String voterId, String aadharCard, String name,
                                       String password, String college, String email, int age) throws Exception {
        JSONObject body = new JSONObject();
        body.put("voterId", voterId);
        body.put("aadharCard", aadharCard);
        body.put("name", name);
        body.put("password", password);
        body.put("college", college);
        body.put("email", email);
        body.put("age", age);
        return post("/api/auth/register-init", body);
    }

    // ─── Get CAPTCHA ───
    public static JSONObject getCaptcha() throws Exception {
        return getJson("/api/auth/captcha");
    }

    // ─── Login ───
    public static JSONObject login(String voterId, String aadharCard, String password,
                                    String captchaId, String captchaAnswer) throws Exception {
        JSONObject body = new JSONObject();
        body.put("voterId", voterId);
        body.put("aadharCard", aadharCard);
        body.put("password", password);
        body.put("captchaId", captchaId);
        body.put("captchaAnswer", captchaAnswer);
        return post("/api/auth/login", body);
    }

    // ─── Get Candidates ───
    public static JSONArray getCandidates() throws Exception {
        String resp = get("/api/candidates");
        return new JSONArray(resp);
    }

    // ─── Cast Vote ───
    public static JSONObject vote(String voterId, int candidateId) throws Exception {
        JSONObject body = new JSONObject();
        body.put("voterId", voterId);
        body.put("candidateId", candidateId);
        return post("/api/vote", body);
    }

    // ─── Check Vote Status ───
    public static boolean hasVoted(String voterId) throws Exception {
        JSONObject body = new JSONObject();
        body.put("voterId", voterId);
        JSONObject resp = post("/api/vote/check", body);
        return resp.optBoolean("voted", false);
    }

    // ─── Get Results ───
    public static JSONArray getResults() throws Exception {
        String resp = get("/api/vote/results");
        return new JSONArray(resp);
    }

    // ─── HTTP helpers ───
    private static String get(String path) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + path))
                .GET().build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        return response.body();
    }

    private static JSONObject getJson(String path) throws Exception {
        return new JSONObject(get(path));
    }

    private static JSONObject post(String path, JSONObject body) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + path))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(body.toString()))
                .build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        return new JSONObject(response.body());
    }
}
