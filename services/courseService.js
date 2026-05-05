const Course = require("../models/courseModel")

const getAllCourses = async () => {
	return Course.find()
}

const getCourseById = async (id) => {
	return Course.findById(id)
}

const createCourse = async (payload) => {
	return Course.create(payload)
}

const updateCourse = async (id, updates) => {
	return Course.findByIdAndUpdate(id, updates, {
		new: true,
		runValidators: true,
	})
}

const deleteCourse = async (id) => {
	return Course.findByIdAndDelete(id)
}

module.exports = {
	getAllCourses,
	getCourseById,
	createCourse,
	updateCourse,
	deleteCourse,
}