@echo off
title VoteWise - Swing GUI Client
echo ============================================
echo     VoteWise Swing GUI Client
echo ============================================
echo.
echo Make sure the backend server is running first!
echo Starting VoteWise GUI...
echo.
cd /d "%~dp0backend"
call ".maven\apache-maven-3.9.6\bin\mvn.cmd" compile exec:java -Dexec.mainClass="com.votewise.ui.VoteWiseApp"
pause
