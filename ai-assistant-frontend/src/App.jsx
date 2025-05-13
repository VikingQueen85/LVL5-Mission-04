import { useState, useRef, useEffect } from "react"
import axios from "axios"
import ReactMarkdown from "react-markdown"
import styles from "./App.module.css"

// Backend API URL
const API_URL = import.meta.env.VITE_API_URL

// Initial message
const initialMessage = `I'm Tina. I will help you choose the right insurance policy. May I ask you a few personal questions to make sure I recommend the best policy for you?`

// Timestamp format
const timestamp = new Date().toLocaleTimeString()

// Create a unique ID for each message
const generateMessageId = role => {
  return `${role}-${Date.now()}`
}

function App() {
  const [isLoading, setIsLoading] = useState(false)

  // Track the session ID for ongoing chat
  const [sessionId, setSessionId] = useState(null)

  // State to store the messages
  const [messages, setMessages] = useState([
    {
      id: generateMessageId("ai"),
      sender: "ai",
      text: initialMessage,
      timestamp,
    },
  ])

  // State to store the user input
  const [userInput, setUserInput] = useState("")

  // Ref to scroll to the bottom of the chat
  const chatEndRef = useRef(null)

  // Auto-scroll to the bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Function to send message to backend API
  const sendMessageToAPI = async message => {
    try {
      // Prepare request payload
      const payload = {
        message,
      }

      // Include sessionId if it exists
      if (sessionId) {
        payload.sessionId = sessionId
      }

      // Send POST request to backend API
      const response = await axios.post(API_URL, payload)

      return response.data
    } catch (error) {
      throw new Error(`Error in API call: ${error.message}`)
    }
  }

  // Function to handle user input submission
  const handleSubmitUserInput = async e => {
    // Prevent form submission reload
    e.preventDefault()

    // Check if the user input is empty
    if (userInput.trim() === "") {
      return
    }

    setIsLoading(true)

    const trimmedUserInput = userInput.trim()

    // Add user message to the chat
    const newUserMessage = {
      id: generateMessageId("user"),
      sender: "user",
      text: trimmedUserInput,
      timestamp,
    }

    setMessages(prevMessages => [...prevMessages, newUserMessage])

    // Clear input field
    setUserInput("")

    try {
      // Send user message to backend API
      const response = await sendMessageToAPI(trimmedUserInput)

      // Check if a valid response is received
      if (!response.sessionId) {
        throw new Error("No response from API")
      }

      // If successful, update the sessionId for subsequent messages
      if (response.sessionId) {
        setSessionId(response.sessionId)
      }

      // Add AI response to the chat
      const aiResponse = {
        id: generateMessageId("ai"),
        sender: "ai",
        text: response.text,
        timestamp,
      }

      setMessages(prevMessages => [...prevMessages, aiResponse])
    } catch (error) {
      // Add error message to chat
      const errorMessage = {
        id: generateMessageId("system"),
        sender: "system",
        text: `Error: ${error.message}. Please try again.`,
        timestamp,
      }

      setMessages(prevMessages => [...prevMessages, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Tina - Your AI Insurance Policy Assistant
        </h1>
        <div className={styles.chatWindow}>
          <div className={styles.chatMessages}>
            {messages.map(message => {
              return (
                <div
                  key={message.id}
                  className={`${styles.chatMessage} ${
                    message.sender === "ai"
                      ? styles.ai
                      : message.sender === "user"
                      ? styles.user
                      : styles.system
                  }`}>
                  <div className={styles.messageContent}>
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                  </div>

                  <div className={styles.messageTimestamp}>
                    {message.timestamp}
                  </div>
                </div>
              )
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div
                className={`${styles.chatMessage} ${styles.ai} ${styles.isLoading}`}>
                <div className={styles.messageContent}>Tina is typing...</div>
              </div>
            )}

            {/* Scroll to the bottom of the chat */}
            <div ref={chatEndRef} />
          </div>

          <form className={styles.inputArea} onSubmit={handleSubmitUserInput}>
            <textarea
              className={styles.inputField}
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  if (!isLoading && userInput.trim()) handleSubmitUserInput(e)
                }
              }}
              placeholder="Type your message here..."
              disabled={isLoading}
            />
            <button
              className={styles.sendButton}
              type="submit"
              disabled={isLoading || !userInput.trim()}>
              {isLoading ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
