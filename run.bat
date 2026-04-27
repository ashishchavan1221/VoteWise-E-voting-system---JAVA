@echo off
echo ==============================================
echo      Building and Starting VoteWise E-Voting
echo ==============================================

echo [1/2] Building React Frontend...
cd frontend-react
call npm install
call npm run build
cd ..

echo [2/2] Starting Pure Java Backend...
echo - Frontend is integrated and served directly by the Java backend!
echo - Access your website at: http://localhost:8090
cd backend
title VoteWise Server
powershell -ExecutionPolicy Bypass -File start-server.ps1

pause
