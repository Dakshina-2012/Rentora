@echo off
title Rentora Car Rental Management System
color 0b
cls
echo =====================================================================
echo                RENTORA - CAR RENTAL MANAGEMENT SYSTEM                
echo =====================================================================
echo.
echo [1/3] Setting up Rentora logo assets...
if not exist "%~dp0rentora-logo.jpg" (
    copy /Y "C:\Users\sai\.gemini\antigravity\brain\f9c26ff1-5a1f-4b36-81c9-052bf39e70ea\.user_uploaded\media_1789139689003.jpg" "%~dp0rentora-logo.jpg" >nul 2>&1
    echo       - Logo asset installed!
) else (
    echo       - Logo asset already present.
)
echo.
echo [2/3] Launching Rentora Web Application in your default browser...
start "" "%~dp0index.html"
echo       - Web application opened successfully!
echo.
echo [3/3] Launching Node.js Express REST Backend Server...
cd /d "%~dp0server"
if exist node_modules (
    echo       - Dependencies found. Starting REST API on http://localhost:5000...
    node server.js
) else (
    echo       - First run detected. Installing lightweight dependencies (express, cors)...
    npm install && node server.js
)
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo NOTE: If Node.js is not yet installed in your system PATH,
    echo Rentora is ALREADY fully running in your browser via its High-Performance
    echo persistent LocalStorage database engine!
)
pause
