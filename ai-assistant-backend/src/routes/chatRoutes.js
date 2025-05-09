const express = require("express")
const router = express.Router()

const { chatController } = require("../controllers/chatController")

// --- Routes ---
router.post("/", chatController)

module.exports = router
