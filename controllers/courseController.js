const courseService = require("../services/courseService")

const getAllCourses = async (req, res) => {
	try {
		const courses = await courseService.getAllCourses()
		res.json(courses)
	} catch (error) {
		res.status(500).json({ error: "Failed to get courses" })
	}
}

const getCourseById = async (req, res) => {
	try {
		const course = await courseService.getCourseById(req.params.id)

		if (!course) {
			return res.status(404).json({ error: "Course not found" })
		}

		res.json(course)
	} catch (error) {
		res.status(500).json({ error: "Failed to get course" })
	}
}

const createCourse = async (req, res) => {
	try {
		const course = await courseService.createCourse(req.body)
		res.status(201).json(course)
	} catch (error) {
		res.status(400).json({ error: "Failed to create course" })
	}
}

const updateCourse = async (req, res) => {
	try {
		const course = await courseService.updateCourse(req.params.id, req.body)

		if (!course) {
			return res.status(404).json({ error: "Course not found" })
		}

		res.json(course)
	} catch (error) {
		res.status(400).json({ error: "Failed to update course" })
	}
}

const deleteCourse = async (req, res) => {
	try {
		const course = await courseService.deleteCourse(req.params.id)

		if (!course) {
			return res.status(404).json({ error: "Course not found" })
		}

		res.json({ message: "Course deleted", course })
	} catch (error) {
		res.status(500).json({ error: "Failed to delete course" })
	}
}

module.exports = {
	getAllCourses,
	getCourseById,
	createCourse,
	updateCourse,
	deleteCourse,
}