@echo off
setlocal
cd /d "%~dp0"
echo ==============================================
echo Student Management System - starting services
echo ==============================================
where java >nul 2>nul || (echo ERROR: Java 21 is not installed or not in PATH.& pause & exit /b 1)
where node >nul 2>nul || (echo ERROR: Node.js is not installed or not in PATH.& pause & exit /b 1)
where npm >nul 2>nul || (echo ERROR: npm is not installed or not in PATH.& pause & exit /b 1)
if not exist "studentmanagement\mvnw.cmd" (echo ERROR: Backend Maven wrapper is missing.& pause & exit /b 1)
if not exist "student-management-frontend\package.json" (echo ERROR: Angular frontend folder is missing.& pause & exit /b 1)
if not exist "student-management-frontend\node_modules" (
  echo Installing Angular packages. Internet connection is required for first setup...
  pushd "student-management-frontend"
  call npm install
  if errorlevel 1 (popd & echo npm install failed. Check internet connection and Node.js version.& pause & exit /b 1)
  popd
)
echo Starting backend and frontend in separate command windows...
start "SMS Backend" "%ComSpec%" /k ""%~dp0START-BACKEND.bat""
timeout /t 3 /nobreak >nul
start "SMS Frontend" "%ComSpec%" /k ""%~dp0START-FRONTEND.bat""
echo.
echo Wait for both windows to finish starting.
echo Then open http://localhost:4200
pause
