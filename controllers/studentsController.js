const studentServices = require("../services/studentServices")

const getAllStudents = (req, res) => {
	res.json(studentServices.getAllStudents())
}

const getStudentById = (req, res) => {
	const id = Number(req.params.id)
	const student = studentServices.getStudentById(id)

	if (!student) {
		return res.status(404).json({ error: "Student not found" })
	}

	res.json(student)
}

const createStudent = (req, res) => {
	const payload = req.body

	if (!studentServices.validateStudentPayload(payload)) {
		return res.status(400).json({ error: "Invalid student payload" })
	}

	const student = studentServices.createStudent(payload)
	res.status(201).json(student)
}

const updateStudent = (req, res) => {
	const id = Number(req.params.id)
	const existingStudent = studentServices.getStudentById(id)

	if (!existingStudent) {
		return res.status(404).json({ error: "Student not found" })
	}

	const updates = req.body
	const candidate = { ...existingStudent, ...updates }

	if (!studentServices.validateStudentPayload(candidate)) {
		return res.status(400).json({ error: "Invalid student payload" })
	}

	const student = studentServices.updateStudent(id, updates)
	res.json(student)
}

const deleteStudent = (req, res) => {
	const id = Number(req.params.id)
	const removed = studentServices.deleteStudent(id)

	if (!removed) {
		return res.status(404).json({ error: "Student not found" })
	}

	res.json({ message: "Student deleted", student: removed })
}

module.exports = {
	getAllStudents,
	getStudentById,
	createStudent,
	updateStudent,
	deleteStudent,
}
