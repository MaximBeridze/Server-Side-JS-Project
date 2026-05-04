const express = require("express")
const cors = require("cors")
const studentsRoutes = require("./routes/students")

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use("/students", studentsRoutes)

app.get("/", (req, res) => {
	res.json({ message: "Students API", endpoints: ["/students"] })
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
