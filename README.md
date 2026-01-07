# Flow Unit API

## Overview
Flow Unit is a robust task management and team collaboration backend built with Node.js and Express. It utilizes Mongoose for schema-driven data modeling in MongoDB and features a comprehensive system for project tracking, task delegation, and automated SMTP notifications.

## Features
- **Node.js & Express**: High-performance RESTful API architecture.
- **MongoDB & Mongoose**: Object Data Modeling (ODM) for complex data relationships between users, teams, projects, and tasks.
- **JWT Authentication**: Secure stateless authentication using JSON Web Tokens with session validation.
- **Nodemailer**: Automated transactional emails for account verification, task assignments, and project updates.
- **Team Management**: Robust invitation-based system allowing users to create teams and collaborate on shared projects.
- **OTP System**: Time-sensitive One-Time Passwords for secure account verification and password recovery.

## Getting Started
### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/youngbeeh08/flow-unit-server.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

### Environment Variables
Create a `.env` file in the root directory and include the following:
```env
MONGO_URI=mongodb://localhost:27017/flowunit
SERVER_PORT=1000
JWT_SECRET=your_jwt_secret_key
JWT_EXP=7d
SERVER_MAIL=your-email@gmail.com
SERVER_PASS=your-app-password
SERVER_SUPPORT_MAIL=support@flowunit.com
CLIENT_DOMAIN=http://localhost:5173
```

## API Documentation
### Base URL
`http://localhost:1000/api`

### Endpoints

#### POST /auth/signup
**Request**:
```json
{
  "name": "John Doe",
  "userName": "johndoe",
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```
**Response**:
```json
{
  "status": "success",
  "message": "Account created successfully"
}
```
**Errors**:
- 400: Unable to create account
- 409: Username or Email already exists

#### GET /auth/validateUsername/:username
**Request**:
`Params: username (string)`

**Response**:
```json
{
  "status": "success",
  "message": "Username: johndoe is available for you to use"
}
```

#### POST /auth/verify
**Request**:
```json
{
  "email": "john@example.com",
  "code": "123456"
}
```
**Response**:
```json
{
  "status": "success",
  "message": "Account verified successfully."
}
```
**Errors**:
- 410: Code has expired
- 422: Invalid code or email

#### POST /auth/login
**Request**:
```json
{
  "userName": "johndoe",
  "password": "SecurePassword123"
}
```
**Response**:
```json
{
  "status": "success",
  "message": "Log in successfully",
  "token": "eyJhbG..."
}
```
**Errors**:
- 400: Account not verified
- 422: Invalid credentials

#### GET /user/me
**Request**:
`Headers: Authorization: Bearer <token>`

**Response**:
```json
{
  "status": "success",
  "user": { ... },
  "total_projects": 5,
  "pending_tasks": 2,
  "completed_projects": 3
}
```

#### POST /user/createProject
**Request**:
`Query: type=personal OR team`
```json
{
  "name": "Website Redesign",
  "description": "Revamp the landing page",
  "startDate": "2023-10-01",
  "dueDate": "2023-12-01",
  "priorityLevel": "high"
}
```
**Response**:
```json
{
  "status": "success",
  "project": { ... }
}
```

#### POST /user/createTask
**Request**:
```json
{
  "name": "Fix Navbar",
  "description": "Repair the responsive toggle",
  "dueDate": "2023-11-01",
  "projectID": "64f..."
}
```
**Response**:
```json
{
  "status": "success",
  "task": { ... }
}
```

#### PATCH /user/updateTask/:taskID
**Request**:
```json
{
  "projectID": "64f...",
  "status": "done"
}
```
**Response**:
```json
{
  "status": "success",
  "message": "Task completed successfully"
}
```

#### POST /user/createTeam
**Request**:
```json
{
  "name": "Engineering Team",
  "about": "Backend and Frontend developers"
}
```
**Response**:
```json
{
  "status": "success",
  "team": { ... }
}
```

#### POST /user/inviteToTeam/:userID
**Request**:
```json
{
  "invitationInfo": "Join our dev group"
}
```
**Response**:
```json
{
  "status": "success",
  "message": "Invitation created successfully"
}
```

## Contributing
I welcome contributions to the Flow Unit API. Please follow these steps:
- Fork the project repository.
- Create a feature branch (`git checkout -b feature/NewFeature`).
- Commit your changes (`git commit -m 'Add some NewFeature'`).
- Push to the branch (`git push origin feature/NewFeature`).
- Open a Pull Request.

## Author Info
Developed by **Zenith Dev**.
- GitHub: [youngbeeh08](https://github.com/youngbeeh08)
- Portfolio: [Bamitale Abdulazeem I.](https://bamitaleabdulazeem.vercel.app)
- LinkedIn: [Bamitale Abdulazeem I.](https://www.linkedin.com/in/bamitale-abdulazeem-)
