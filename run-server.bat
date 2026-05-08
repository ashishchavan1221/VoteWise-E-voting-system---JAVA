@echo off
title VoteWise - Starting Backend Server
echo ============================================
echo     VoteWise Backend Server
echo ============================================
echo.
echo Starting backend server on http://localhost:8080 ...
echo.
cd /d "%~dp0backend"
call ".maven\apache-maven-3.9.6\bin\mvn.cmd" compile exec:java -Dexec.mainClass="com.votewise.Main"
pause
