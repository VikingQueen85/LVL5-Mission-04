
import React, { useRef, useEffect } from 'react';

function MessageList({ messages }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="message-list">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.role}`}>
          <span className="message-sender">{msg.role === 'user' ? 'You' : 'Amara'}:</span>
          <p>{msg.text}</p>
        </div>
      ))}
      {/* Dummy div to help scrolling to bottom */}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;