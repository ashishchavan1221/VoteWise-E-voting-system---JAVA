@echo off
echo ==============================================
echo      Starting VoteWise System (Java + GUI)
echo ==============================================
echo.
echo [1/2] Starting Backend Server...
start "VoteWise Server" cmd /c "run-server.bat"

echo Waiting for server to initialize...
timeout /t 3 /nobreak > nul

echo [2/2] Starting Swing GUI Client...
start "VoteWise GUI" cmd /c "run-gui.bat"

echo.
echo Both systems have been launched in separate windows!
echo You can safely close this launcher window.
pause
