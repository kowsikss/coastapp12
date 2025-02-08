// import React, { useState } from "react";
// import "./SpeechTextProcessor.css"; // Import CSS file

// const SpeechTextProcessor = () => {
//   const [input, setInput] = useState("");
//   const [response, setResponse] = useState("");
//   const [aiResponse, setAiResponse] = useState(""); // AI response state
//   const [listening, setListening] = useState(false);

//   // Handle text input
//   const handleTextChange = (e) => {
//     setInput(e.target.value);
//   };

//   // Process input and generate a response
//   const processInput = () => {
//     if (!input.trim()) {
//       setResponse("Please enter or speak something.");
//       return;
//     }

//     let reply = "";
//     if (input.toLowerCase().includes("hello")) {
//       reply = "Hi there! How can I assist you?";
//     } else if (input.toLowerCase().includes("coastal")) {
//       reply = "India has beautiful coastal areas like Goa, Kerala, and Andaman!";
//     } else {
//       reply = "I'm still learning! Ask me something else.";
//     }

//     setResponse(reply);
//   };

//   // Voice input using Speech Recognition API
//   const startListening = () => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       alert("Speech recognition is not supported in this browser.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-US"; // Set language
//     recognition.start();
//     setListening(true);

//     recognition.onresult = (event) => {
//       const speechText = event.results[0][0].transcript;
//       setInput(speechText);
//       setListening(false);
//     };

//     recognition.onerror = (event) => {
//       console.error("Speech recognition error:", event.error);
//       setListening(false);
//     };

//     recognition.onend = () => {
//       setListening(false);
//     };
//   };

//   // AI Button Click
//   const handleAiClick = () => {
//     setAiResponse("Hello, I am Coastal AI! Any queries?");
//   };

//   return (
//     <div className="container">
//       <h2>AI Assistant</h2>
//       <input
//         type="text"
//         value={input}
//         onChange={handleTextChange}
//         placeholder="Type your question..."
//       />
//       <br />
//       <button className="speak-btn" onClick={startListening} disabled={listening}>
//         {listening ? "Listening..." : "🎙️ Speak"}
//       </button>
//       <button className="submit-btn" onClick={processInput}>
//         Submit
//       </button>
//       <button className="ai-btn" onClick={handleAiClick}>🤖 AI</button>

//       {/* AI Response */}
//       {aiResponse && <div className="ai-response">{aiResponse}</div>}

//       {/* Response */}
//       <div className="response-box">
//         <h3>Response:</h3>
//         <p>{response}</p>
//       </div>
//     </div>
//   );
// };

// export default SpeechTextProcessor;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import SpeechTextProcessor from "./components/SpeechTextProcessor"; // Corrected name

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/speech" element={<SpeechTextProcessor />} /> {/* Fixed */}
      </Routes>
    </Router>
  );
};

export default App;
