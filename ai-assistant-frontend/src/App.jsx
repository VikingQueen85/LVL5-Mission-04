import { useState, useRef, useEffect } from "react"
import styles from "./App.module.css"

// Mock initial message
const initialMessage = `I'm Tina. I will help you choose the right insurance policy. May I ask you a few personal questions to make sure I recommend the best policy for you?`

function App() {
  const [isLoading, setIsLoading] = useState(false)

  // State to store the messages
  const [messages, setMessages] = useState([
    {
      id: Date.now(),
      sender: "ai",
      text: initialMessage,
      timestamp: new Date().toLocaleTimeString(),
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

  // Function to handle user input submission
  const handleSubmitUserInput = e => {
    // Prevent form submission reload
    e.preventDefault()

    // Check if the user input is empty
    if (userInput.trim() === "") {
      return
    }

    setIsLoading(true)

    // Add user message to the chat
    const newUserMessage = {
      id: Date.now(),
      sender: "user",
      text: userInput,
      timestamp: new Date().toLocaleTimeString(),
    }

    setMessages(prevMessages => [...prevMessages, newUserMessage])

    // Clear input field
    setUserInput("")

    // Simulate AI response
    const thinkingTime = Math.floor(Math.random() * 1000) + 1000

    setTimeout(() => {
      const aiResponse = {
        id: Date.now(),
        sender: "ai",
        text: "Example AI response based on user input", // Replace with actual AI response
        timestamp: new Date().toLocaleTimeString(),
      }

      setMessages(prevMessages => [...prevMessages, aiResponse])

      setIsLoading(false)
    }, thinkingTime)
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
                    message.sender === "ai" ? styles.ai : styles.user
                  }`}>
                  <div className={styles.messageContent}> {message.text}</div>

                  <div className={styles.messageTimestamp}>
                    {message.timestamp}
                  </div>
                </div>
              )
            })}

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
