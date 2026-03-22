# VoteWise Backend API Contract

This document outlines the required backend REST APIs that need to be developed by the backend team to make the `frontend` fully functional. 
The frontend is currently hooked up to make these exact calls. Whenever an endpoint is built, simply remove the mock Javascript implementations in the `.html` files (look for the `BACKEND TEAM INSTRUCTIONS` comments) to connect the real live data!

---

## 1. Authentication Endpoints

### 1.1 Login
*   **Method:** `POST`
*   **Path:** `/api/auth/login`
*   **Request Body (JSON):**
    ```json
    {
      "voterId": "12345678",
      "password": "mypassword"
    }
    ```
*   **Response (200 OK):**
    ```json
    {
      "voterId": "12345678",
      "token": "optional-jwt-token"
    }
    ```
*   **Error Response (401 Unauthorized / 400 Bad Request):**
    Return a plain text string `Invalid Credentials` OR `{"error": "Invalid Credentials"}`

### 1.2 Register
*   **Method:** `POST`
*   **Path:** `/api/auth/register`
*   **Request Body (JSON):**
    ```json
    {
      "name": "John Doe",
      "voterId": "12345678",
      "college": "LPU",
      "email": "john@example.com",
      "age": "20",
      "password": "mypassword"
    }
    ```
*   **Response (201 Created):**
    ```json
    {
      "status": "success"
    }
    ```

---

## 2. Voting & Candidates Endpoints

### 2.1 Fetch Candidates List
*   **Method:** `GET`
*   **Path:** `/api/candidates`
*   **Response (200 OK) - JSON Array:**
    ```json
    [
      {
        "id": 1,
        "name": "Rahul Sharma",
        "party_or_group": "Student Union",
        "manifesto": "Better hostal policies."
      },
      ...
    ]
    ```

### 2.2 Cast a Vote
*   **Method:** `POST`
*   **Path:** `/api/vote`
*   **Request Body (JSON):**
    ```json
    {
      "voterId": "12345678",
      "candidateId": 1
    }
    ```
*   **Response (201 Created):**
    ```json
    {
      "status": "success"
    }
    ```
*   **Error Response (400 Bad Request - If already voted):**
    ```json
    {
      "error": "Vote already cast. Cannot vote twice."
    }
    ```

### 2.3 Check Vote Status (Did User Vote?)
*   **Method:** `POST`
*   **Path:** `/api/vote/check`
*   **Request Body (JSON):**
    ```json
    {
      "voterId": "12345678"
    }
    ```
*   **Response (200 OK):**
    ```json
    {
      "voted": true
    }
    ```

### 2.4 Fetch Live Results (Election Data)
*   **Method:** `GET`
*   **Path:** `/api/vote/results`
*   **Response (200 OK) - JSON Array:** (Must be ordered by votes descending)
    ```json
    [
      {
        "id": 1,
        "name": "Rahul Sharma",
        "votes": 1420
      },
      {
        "id": 2,
        "name": "Priya Patel",
        "votes": 890
      }
    ]
    ```

### Notes for the Backend Dev:
* Ensure **CORS** headers are enabled so the frontend can retrieve data without browser cross-origin blocking!
* Run your server on `http://localhost:8080`, as that is the port configured in the frontend files. If you use a different port, update the `API_URL` variable at the top of the `<script>` blocks in `dashboard.html` and `results.html`, and update the `fetch` URLs in `login.html` and `register.html`.
