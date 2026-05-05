const fs = require("fs")
const path = require("path")

const STUDENTS_FILE = path.resolve(__dirname, "../students.json")

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

const getAllStudents = () => students

const getStudentById = (id) => students.find((student) => student.id === id)

const createStudent = (payload) => {
	const student = { ...payload, id: getNextStudentId(students) }
	students.push(student)
	saveStudentsToFile(students)
	return student
}

const updateStudent = (id, updates) => {
	const student = getStudentById(id)
	if (!student) return null

	Object.assign(student, updates)
	saveStudentsToFile(students)
	return student
}

const deleteStudent = (id) => {
	const index = students.findIndex((student) => student.id === id)
	if (index === -1) return null

	const removed = students.splice(index, 1)[0]
	saveStudentsToFile(students)
	return removed
}

module.exports = {
	getAllStudents,
	getStudentById,
	createStudent,
	updateStudent,
	deleteStudent,
	validateStudentPayload,
}
