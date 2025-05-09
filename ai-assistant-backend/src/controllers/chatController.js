const { geminiService } = require("../services/geminiService")

const chatController = async (req, res) => {
  const { message } = req.body

  console.log("Chat Controller: ", message)

  try {
    const response = await geminiService(message)

    res.status(200).json({
      message: response,
      status: "success",
    })
  } catch (error) {
    console.error("Error in chatController: ", error)
    res.status(500).json({
      message: "Internal Server Error",
      status: "error",
    })
  }
}

module.exports = { chatController }
