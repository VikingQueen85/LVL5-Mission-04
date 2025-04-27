
import { useState, useEffect } from 'react';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import './App.css'; // We'll create this file

const BACKEND_URL = 'http://localhost:3001/api/chat';

function App() {
  const [messages, setMessages] = useState([
    { role: 'model', text: "Hi there!! My name is Amara 😊. I can help walk you through the process of choosing an insurance policy that best fits your needs. May I ask you a few personal questions to make sure I recommend the best policy for you??" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle sending messages
  const handleSendMessage = async (userMessageText) => {
    setError(null);
    const newUserMessage = { role: 'user', text: userMessageText };

    const currentMessages = [...messages, newUserMessage];
    setMessages(currentMessages);
    setIsLoading(true);

    try {
      const historyForBackend = currentMessages.slice(1);

      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ history: historyForBackend }),
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (parseError) {
          throw new Error(response.statusText || `HTTP error! Status: ${response.status}`);
        }
          throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Add AI response to messages
      setMessages(prevMessages => [...prevMessages, { role: 'model', text: data.response }]);

    } catch (err) {
      console.error("Error sending message:", err);
      setError(`Amara is having trouble responding: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Amara - Insurance Consultant</h1>
      <div className="chat-window">
          <MessageList messages={messages} />
          {error && <div className="error-message">Error: {error}</div>}
          {isLoading && <div className="loading-indicator">Tina is thinking...</div>}
      </div>
      <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}

export default App;