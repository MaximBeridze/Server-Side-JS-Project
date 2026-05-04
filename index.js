const express = require("express")
const cors = require("cors")
const fs = require("fs")
const path = require("path")

const app = express()
const port = 3000
const STUDENTS_FILE = path.resolve(__dirname, "students.json")

app.use(cors())
app.use(express.json())

const loadStudentsFromFile = () => {
	try {
		const fileData = fs.readFileSync(STUDENTS_FILE, "utf8")
		return JSON.parse(fileData)
	} catch (error) {
		console.error("Failed to load students.json:", error)
		return []
	}
}

const saveStudentsToFile = (students) => {
	fs.writeFileSync(STUDENTS_FILE, JSON.stringify(students, null, 2), "utf8")
}

const getNextStudentId = (students) => {
	const maxId = students.reduce((max, student) => Math.max(max, student.id || 0), 0)
	return maxId + 1
}

const validateStudentPayload = (payload) => {
	if (!payload || typeof payload !== "object") return false
	const { name, email, major, gpa } = payload
	return (
		typeof name === "string" && name.trim() &&
		typeof email === "string" && email.trim() &&
		typeof major === "string" && major.trim() &&
		Number.isFinite(gpa) && gpa >= 0 && gpa <= 4.0
	)
}

const students = loadStudentsFromFile()

app.get("/", (req, res) => {
	res.json(students)
})

app.get("/students", (req, res) => {
	res.json(students)
})

app.get("/students/:id", (req, res) => {
	const id = Number(req.params.id)
	const student = students.find((item) => item.id === id)

	if (!student) {
		return res.status(404).json({ error: "Student not found" })
	}

	res.json(student)
})

app.post("/students", (req, res) => {
	const newStudent = req.body

	if (!validateStudentPayload(newStudent)) {
		return res.status(400).json({ error: "Invalid student payload" })
	}

	newStudent.id = getNextStudentId(students)
	students.push(newStudent)
	saveStudentsToFile(students)

	res.status(201).json(newStudent)
})

app.put("/students/:id", (req, res) => {
	const id = Number(req.params.id)
	const existingStudent = students.find((item) => item.id === id)

	if (!existingStudent) {
		return res.status(404).json({ error: "Student not found" })
	}

	const updates = req.body

	if (!validateStudentPayload({ ...existingStudent, ...updates })) {
		return res.status(400).json({ error: "Invalid student payload" })
	}

	Object.assign(existingStudent, updates)
	saveStudentsToFile(students)

	res.json(existingStudent)
})

app.delete("/students/:id", (req, res) => {
	const id = Number(req.params.id)
	const index = students.findIndex((item) => item.id === id)

	if (index === -1) {
		return res.status(404).json({ error: "Student not found" })
	}

	const removed = students.splice(index, 1)[0]
	saveStudentsToFile(students)

	res.json({ message: "Student deleted", student: removed })
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})


// SEND DATA vs SEND ERROR
// STATUS CODES - 200, 201, 400, 404
// JSON - JavaScript Object Notation
// res.json() - send JSON response
// res.status() - set status code
// res.send() - send response

// TRY FRONTEND NOW before moving on
// go to FONT folder and open index.html in the browser, check console for errors, fix them, and see the data being displayed

// CORS - Cross-Origin Resource Sharing
// npm i cors
// app.use(cors())

// REFACTORING
// 1. Create a separate file for routes (e.g., routes.js)
// 2. Create a separate file for controllers (e.g., controllers.js)
// 3. Change commonJs to ES6 modules (e.g., import/export) - this will require adding "type": "module" in package.json

// push to github and share the link
