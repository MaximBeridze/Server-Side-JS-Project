# Server-Side JS Project — Student and Course API

## Project Overview

This project is an Express-based Node.js server that exposes a simple API.
The project contains two resources:

- Students — stored locally in `students.json`
- Courses — stored in MongoDB using Mongoose

The backend is organized using routes, controllers, services, and models.

## Technologies Used

- Node.js
- Express
- CORS
- Mongoose (MongoDB)
- Nodemon
- Postman
- Docker

## Project Structure

```txt
.
├── FONT/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── controllers/
│   ├── studentsController.js
│   └── courseController.js
├── middleware/
│   └── auth-middleware.js
├── models/
│   └── courseModel.js
├── routes/
│   ├── students.js
│   └── course.js
├── services/
│   ├── studentServices.js
│   └── courseService.js
├── students.json
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

## Installation

Install the project dependencies:

```bash
npm install
```

## Running MongoDB with Docker

The Course API uses MongoDB, so MongoDB must be running before testing the course routes.

Start MongoDB with Docker:

```bash
docker run --name serverjs-mongo -d -p 27017:27017 mongo
```

This starts MongoDB on the default port:

```txt
27017
```

The backend connects to MongoDB using:

```txt
mongodb://127.0.0.1:27017/student_api
```

If the Docker container already exists but is stopped, start it with:

```bash
docker start serverjs-mongo
```

To stop it:

```bash
docker stop serverjs-mongo
```

## Running the Server

Start the backend with:

```bash
npm run dev
```

Or run it directly with:

```bash
node index.js
```

The server runs on:

```txt
http://localhost:3000
```

When everything is working, the terminal should show:

```txt
Example app listening on port 3000
Connected to MongoDB
```

## API Endpoints

## Root Route

### GET /

Returns a simple message with the available API endpoints.

## Student Routes

The student resource uses `students.json` as storage.

### GET /students

Returns all students.

### GET /students/:id

Returns one student by numeric ID.

### POST /students

Creates a new student.

Example body:

```json
{
  "name": "Emma Dupont",
  "email": "emma.dupont@epita.fr",
  "major": "Computer Science",
  "gpa": 3.7
}
```

### PUT /students/:id

Updates an existing student.

Example body:

```json
{
  "gpa": 3.9
}
```

### DELETE /students/:id

Deletes a student by ID.

## Course Routes

The course resource uses MongoDB with Mongoose.

All course routes are protected by the `authCheck` middleware.

To access the course routes, add this header in Postman:

```txt
Authorization: Bearer test-token
```

### GET /api/courses

Returns all courses.

### GET /api/courses/:id

Returns one course by MongoDB `_id`.

### POST /api/courses

Creates a new course.

Example body:

```json
{
  "title": "Web Development",
  "description": "Introduction to backend APIs using Express and MongoDB",
  "credits": 4,
  "instructor": "Mr. Dupont",
  "semester": "Semester 2"
}
```

Expected status code:

```txt
201 Created
```

### PUT /api/courses/:id

Updates a course by MongoDB `_id`.

Example body:

```json
{
  "credits": 5
}
```

### DELETE /api/courses/:id

Deletes a course by MongoDB `_id`.

## Authentication Middleware

The Course API uses a simple middleware called `authCheck`.

If the request does not include an `Authorization` header, the server returns:

```json
{
  "error": "Unauthorized"
}
```

Expected status code:

```txt
401 Unauthorized
```

## Postman Test Checklist

These requests should be tested before submission:

- POST `/api/courses` — create at least 2 course entries
- GET `/api/courses` — return the full list of courses
- GET `/api/courses/:id` — return one course using its MongoDB `_id`
- PUT `/api/courses/:id` — update one field
- DELETE `/api/courses/:id` — delete one course
- GET `/api/courses` without an Authorization header — return `401 Unauthorized`

## Example Course Test Data

First course:

```json
{
  "title": "Web Development",
  "description": "Introduction to backend APIs using Express and MongoDB",
  "credits": 4,
  "instructor": "Mr. Dupont",
  "semester": "Semester 2"
}
```

Second course:

```json
{
  "title": "Database Systems",
  "description": "Relational and NoSQL database concepts",
  "credits": 3,
  "instructor": "Ms. Martin",
  "semester": "Semester 2"
}
```