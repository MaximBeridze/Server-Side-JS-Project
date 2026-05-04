# ServerJS Project — Student API

## Project Overview

This project is an Express-based Node.js server that exposes a simple student API powered by `students.json`.

It is organized with a clean separation of concerns:

- `index.js` — server setup and route mounting
- `students.js` — Express routes for `/students`
- `studentsController.js` — request handlers and HTTP response logic
- `studentServices.js` — data loading, persistence, and student operations
- `students.json` — the persistent student dataset

## Features

- Read student records from `students.json`
- Return the full student list
- Return a single student by ID
- Create new student records
- Update existing student records
- Delete student records

## Installation

```bash
cd "c:/Users/*User*/Desktop/*Project*"
npm install
```

## Run the server

```bash
node index.js
```

The server listens on `http://localhost:3000`.

## Available Endpoints

### `GET /`

Returns a small API welcome message.

### `GET /students`

Returns the full list of students.

### `GET /students/:id`

Returns a single student by numeric ID.

### `POST /students`

Creates a new student.

Request body example:

```json
{
  "name": "Emma Dupont",
  "email": "emma.dupont@epita.fr",
  "major": "Computer Science",
  "gpa": 3.7
}
```

### `PUT /students/:id`

Updates an existing student.

Request body example:

```json
{
  "email": "emma.dupont@epita.fr",
  "gpa": 3.9
}
```

### `DELETE /students/:id`

Deletes the student with the given ID.

## Data validation

The server validates student payloads before create/update:

- `name`, `email`, and `major` must be non-empty strings
- `gpa` must be a number between `0` and `4.0`

## Notes

- `students.json` is used as the data store, and changes are written back to the file.
- CORS is enabled so the frontend can fetch data from the API.
- The project uses CommonJS modules (`require` / `module.exports`).

## Useful commands

```bash
node index.js
```

If you want a quick manual test, use `curl` or Postman against `http://localhost:3000`.
