const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const studentsRoutes = require("./routes/students")
const courseRoutes = require("./routes/course")

const app = express()
const port = 3000

mongoose.connect("mongodb://127.0.0.1:27017/student_api")
	.then(() => console.log("Connected to MongoDB"))
	.catch((error) => console.error("MongoDB connection error:", error))

app.use(cors())
app.use(express.json())

app.use("/students", studentsRoutes)
app.use("/api/courses", courseRoutes)

app.get("/", (req, res) => {
	res.json({
		message: "Students API",
		endpoints: ["/students", "/api/courses"],
	})
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})