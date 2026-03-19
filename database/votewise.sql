-- =========================================================
-- VoteWise Database Schema Setup
-- Secured E-Voting System for MCA Project
-- =========================================================

-- Create Databse and Use it
CREATE DATABASE IF NOT EXISTS votewise;
USE votewise;

-- Drop tables in reverse order to avoid foreign key constraints during resets
DROP TABLE IF EXISTS votes;
DROP TABLE IF EXISTS candidates;
DROP TABLE IF EXISTS users;

-- 1. Users Table (Voters & Admins)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    voter_id VARCHAR(50) UNIQUE NOT NULL,
    college VARCHAR(100),
    email VARCHAR(100),
    age INT NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('voter', 'admin') DEFAULT 'voter',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Candidates Table
CREATE TABLE candidates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    party_or_group VARCHAR(100),
    manifesto TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Votes Table (To record encrypted or plain votes)
CREATE TABLE votes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    candidate_id INT NOT NULL,
    voted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE,
    UNIQUE KEY unique_vote (user_id) -- Critical: Ensures 1 user can cast only 1 vote
);

-- =========================================================
-- Seed Data / Mock Data for Testing
-- =========================================================

-- Insert Sample Candidates
INSERT INTO candidates (name, party_or_group, manifesto) VALUES 
('Rahul Sharma', 'Student Union', 'Better campus facilities and flexible hostel timings.'),
('Priya Patel', 'Tech Innovators', '24/7 dedicated computer labs and sponsored hackathons.'),
('Amit Singh', 'Cultural Council', 'Organizing nationwide university fests and events.');

-- Insert Default System Admin
INSERT INTO users (name, voter_id, college, email, password, role) 
VALUES ('System Admin', 'ADMIN_001', 'Administration', 'admin@votewise.lpu.in', 'admin123', 'admin');

-- Insert Sample User Profile / Creator
INSERT INTO users (name, voter_id, college, email, password, role) 
VALUES ('Ashish Chavan', '12504059', 'Lovely Professional University', 'ashish@example.com', '123456', 'voter');

-- Note: The Java backend connects to this schema. Run this script in your MySQL Workbench or PHPMyAdmin.