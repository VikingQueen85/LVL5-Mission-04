import { geminiService } from "../services/geminiService.js"

const chatController = async (req, res) => {
  const { sessionId, message } = req.body

  // Validate the message input
  if (typeof message !== "string" || !message.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "Message cannot be empty",
    })
  }

  try {
    // Pass the sessionId and message to geminiService
    const response = await geminiService(sessionId, message)

    console.log("Chat Controller Response: ", response)

    return res.status(200).json({
      status: "success",
      sessionId: response.sessionId,
      text: response.text,
      isNewSession: response.isNewSession,
    })
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message ?? "An unexpected error occurred",
    })
  }
}

export { chatController }
