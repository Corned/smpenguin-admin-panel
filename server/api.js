const router = require("express").Router()
const child_process = require("child_process")

const authMiddleware = (req, res, next) => {
  const { password } = req.body

  if (password === process.env.PASSWORD) {
    console.log("auth success");
    return next()
  }

  console.log("auth fail");
  return res.status(401).json({ message: "invalid password" })
}

router.use(authMiddleware)

router.post("/verify", (req, res) => {
  return res.status(200).send({ message: "verify password successful" })
})

router.post("/restart-server", (req, res) => {
  try {
    child_process.spawn("./scripts/restart-server.sh", {}, (error, stdout, stderr) => {
      console.log(`Executing "restart-server.sh.."`)
  
      if (error) {
        console.log(`Encountered an error: ${error}`)
        return res.status(500).json({
          message: `something went wrong while running "restart-server.sh"`
        })
      }
  
      return res.status(200).send({ message: "server is restarting..."})
    })
  } catch (e) {
    return res.status(500).json({
      message: `catastrophic failure while trying to run "restart-server.sh"`
    })
  }
})

module.exports = router