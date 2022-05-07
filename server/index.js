require("dotenv").config()

const express = require("express")
const morgan = require("morgan")

const app = express()

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.static("../client/build"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/api", require("./api"))

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`SMPenguin-AdminPanel server running @ port ${PORT}`))