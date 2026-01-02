@echo off
echo Starting Spendture Frontend and Backend...

start "Frontend" cmd /k "cd /d %~dp0 && npm run dev"
start "Backend" cmd /k "cd /d %~dp0backend && npm run dev"

echo Both servers are starting...
echo Frontend: http://localhost:5173
echo Backend: http://localhost:3002
pause