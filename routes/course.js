const express = require("express")
const courseController = require("../controllers/courseController")
const { authCheck } = require("../middleware/auth-middleware")

const router = express.Router()

router.get("/", authCheck, courseController.getAllCourses)
router.get("/:id", authCheck, courseController.getCourseById)
router.post("/", authCheck, courseController.createCourse)
router.put("/:id", authCheck, courseController.updateCourse)
router.delete("/:id", authCheck, courseController.deleteCourse)

module.exports = router