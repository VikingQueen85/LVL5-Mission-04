const { GoogleGenAI } = require("@google/genai")
const { config } = require("../config/index")
const { v4: uuidv4 } = require("uuid")

// --- Prompts Imports ---
const {
  INITIAL_PROMPT,
  SYSTEM_INSTRUCTION,
} = require("./prompts/promptTemplates")

// --- Initialise instance of the GoogleGenAI ---
const ai = new GoogleGenAI({ apiKey: config.API_KEY })

// --- Constants ---
const MODEL_NAME = "gemini-2.0-flash" // Model name for Gemini 2.0

const SESSION_TIMEOUT_MS = 30 * 60 * 1000 // 30 minutes

// --- In-memory store for active chat sessions ---
const activeChat = new Map()

// --- Helper: Create new chat session with system instruction and initial prompt---
const createNewChatSession = () => {
  return ai.chats.create({
    model: MODEL_NAME,
    history: [
      { role: "user", parts: [{ text: SYSTEM_INSTRUCTION }] },
      { role: "model", parts: [{ text: INITIAL_PROMPT }] },
    ],
  })
}

// --- Gemini Service ---
const geminiService = async (sessionId = null, userMessage) => {
  const chatSessionId = sessionId || uuidv4() // Generate UUID if no session provided
  let isNewSession = false

  try {
    // Retrieve the chat session from the in-memory store
    let chatSession = activeChat.get(chatSessionId)

    // If the chat session does not exist, create a new one
    if (!chatSession) {
      chatSession = createNewChatSession()

      // Store the new chat session in the in-memory store
      activeChat.set(chatSessionId, chatSession)

      isNewSession = true // Mark the session as new
    }

    // Send the user's message to chat
    const aiResponse = await chatSession.sendMessage({
      message: userMessage,
    })

    // Implement session timeout / cleanup
    setTimeout(() => {
      if (activeChat.has(chatSessionId)) {
        activeChat.delete(chatSessionId) // Remove the session from the in-memory store if inactive
      }
    }, SESSION_TIMEOUT_MS)

    // Return response data
    return {
      sessionId: chatSessionId,
      text: aiResponse.text.trim() || "No response received",
      isNewSession,
    }
  } catch (error) {
    throw new Error(
      `Gemini service failed: ${error.message || "Unknown error"}`
    )
  }
}

module.exports = { geminiService }
