import { useState } from "react";
import { FaCommentDots } from "react-icons/fa";

export default function Chatbot({ showChatbot, setShowChatbot }) {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleChatbotSubmit = async (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    setChatHistory((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      setChatHistory((prev) => [...prev, { role: "ai", content: data.reply }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setChatHistory((prev) => [
        ...prev,
        { role: "ai", content: "Sorry, I couldn't process your request." },
      ]);
    } finally {
      setUserMessage("");
    }
  };

  return (
    <>
      <button
        className={`mira-chatbot-btn ${showChatbot ? "active" : ""}`}
        onClick={() => setShowChatbot(!showChatbot)}
      >
        <FaCommentDots size={24} />
      </button>

      {showChatbot && (
        <div className="chatbot-modal">
          <div className="chatbot-header">
            <h3>Mira</h3>
            <button onClick={() => setShowChatbot(false)}>Close</button>
          </div>
          <div className="chatbot-body">
            {chatHistory.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.role}`}>
                <p>{msg.content}</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleChatbotSubmit}>
            <input
              type="text"
              placeholder="Ask me anything..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </>
  );
}