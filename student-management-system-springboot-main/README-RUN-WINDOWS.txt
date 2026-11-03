STUDENT MANAGEMENT SYSTEM - WINDOWS QUICK START
================================================

REQUIREMENTS
- Java JDK 21 (the supplied backend uses Spring Boot 4.0.0 and Java 21)
- Node.js 20.19+ or 22.12+ and npm
- MySQL Server 8.x running locally
- Internet access for the first npm install and Bootstrap CDN assets

DATABASE CONFIGURATION
The supplied backend application.properties currently contains:
Database: student_mgmt_db
Username: root
Password: root
URL: jdbc:mysql://localhost:3306/student_mgmt_db?createDatabaseIfNotExist=true&serverTimezone=UTC

If your MySQL password is different, edit:
studentmanagement\src\mainesourcespplication.properties
Change spring.datasource.username and spring.datasource.password to your actual MySQL credentials.
The backend uses spring.jpa.hibernate.ddl-auto=update. Back up any important database before running.

FIRST RUN
1. Extract this ZIP completely to a folder, for example D:\student-management-system.
2. Start MySQL Server.
3. Double-click RUN-ALL.bat.
4. On first run, the script runs npm install. Wait until it finishes.
5. Two CMD windows open. Keep both open.
6. When both servers have started, open http://localhost:4200

LOGIN
Username: Admin
Password: admin@123
The existing backend DataIntializer creates this user if it is not already in the users table. Change this sample password before using the system for real users.

MANUAL RUN COMMANDS (if you prefer two CMD windows)
Backend CMD:
  cd /d D:\student-management-system-springboot-main\studentmanagement
  mvnw.cmd spring-boot:run

Frontend CMD:
  cd /d D:\student-management-system-springboot-main\student-management-frontend
  npm install
  npm start

URLS
Angular frontend: http://localhost:4200
Spring Boot backend: http://localhost:8080
The Angular development proxy forwards /api requests to the Spring Boot backend on port 8080.

INCLUDED FEATURES
- Angular page routes for all supplied template screens
- Session-based login, current-session check, and logout
- Dashboard statistics and recently enrolled students
- Student list, create, view, and update
- Course list, create, view, and update
- Enrollment form, enrolled-student list, and enrollment details
- Original 15 HTML template files and original css/style.css preserved in student_management_template
- Original Spring Boot project, existing entities, repositories, services, Thymeleaf pages, and MySQL settings preserved; REST controllers added for the Angular client

IMPORTANT SCOPE NOTES
- The source project you supplied had MVC/Thymeleaf routes, not JSON REST endpoints. This package adds REST controllers that reuse the existing service layer and database models so Angular can communicate with the same backend/database.
- The supplied service layer does not implement delete/archive methods, so delete operations are not added.
- The sample Admin credentials are for local development only.
- If MySQL is not running or its username/password differs from application.properties, the backend will not start until corrected.
- The build and runtime still need to be installed/run on your Windows computer. This packaging environment could not download Maven/npm dependencies, so the package includes setup scripts rather than claiming a successful local Windows execution test.
