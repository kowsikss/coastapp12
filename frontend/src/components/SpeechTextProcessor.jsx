import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, push } from "firebase/database";
import "./SpeechTextProcessor.css";

const SpeechTextProcessor = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [image, setImage] = useState("");
  const [listening, setListening] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const [blogFormVisible, setBlogFormVisible] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate(); 

  // Fetch real-time coastal information from Wikipedia
  const fetchCoastalInfo = async (query) => {
    try {
      const res = await axios.get(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${query}`
      );
      setResponse(res.data.extract || "No information found.");
      setImage(res.data.thumbnail?.source || "");
    } catch (error) {
      console.error("Error fetching coastal data:", error);
      setResponse("Could not retrieve information.");
    }
  };

  const handleTextChange = (e) => {
    setInput(e.target.value);
  };

  const processInput = async () => {
    if (!input.trim()) {
      setResponse("Please enter or speak something.");
      return;
    }
    fetchCoastalInfo(input);
  };

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en";
    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setInput(speechText);
      setListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  // Toggle chat interface visibility
  const toggleChat = () => {
    setChatVisible(!chatVisible);
  };

  // Toggle Blog Form
  const toggleBlogForm = () => {
    setBlogFormVisible(!blogFormVisible);
  };
  
  const handleTripAdvisorClick = () => {
    navigate("/trip"); // Navigate to TripAdvisor page
  };

  // Handle Blog Submission
  const handleBlogSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newBlog = {
      name: formData.get("name"),
      place: formData.get("place"),
      description: formData.get("description"),
    };
    setBlogs([newBlog, ...blogs]);
    setBlogFormVisible(false);
  };

  // Handle Emergency SOS
  const handleEmergencySOS = () => {
    console.log("🚨 Emergency SOS button clicked!"); // Debug log
    const db = getDatabase();
    const sosRef = ref(db, "sos-alerts");

    push(sosRef, {
      timestamp: new Date().toISOString(),
      message: "Emergency SOS Activated! Need Help!"
    })
    .then(() => {
      alert("🚨 Emergency SOS Sent!"); 
      console.log("SOS alert successfully pushed to Firebase!");
    })
    .catch((error) => {
      console.error("Firebase SOS Error:", error);
      alert("❌ Failed to send SOS.");
    });
};


  return (
    <div className="container">
      {chatVisible && (
        <div className="input-section">
          <input
            type="text"
            value={input}
            onChange={handleTextChange}
            placeholder="Ask about a coastal region..."
          />
          <div className="button-group">
            <button className="speak-btn" onClick={startListening} disabled={listening}>
              {listening ? "🎤 Listening..." : "🎙️ Speak"}
            </button>
            <button className="submit-btn" onClick={processInput}>
              🔍 Search
            </button>
          </div>
        </div>
      )}

      {response && (
        <div className="response-box">
          <h3>📌 Coastal Info</h3>
          <p>{response}</p>
          {image && <img src={image} alt="Coastal region" className="response-image" />}
        </div>
      )}

      {/* Trip Advisor Button */}
      <button className="trip-advisor-btn" onClick={handleTripAdvisorClick}>
        🌍 Trip Advisor
      </button>

      {/* AI Ball */}
      <button className="ai-ball" onClick={toggleChat}>
        Coastal Information
      </button>

      {/* Blog Ball */}
      <button className="blog-ball" onClick={toggleBlogForm}>
        Blog
      </button>

      {/* Emergency SOS Button */}
      <button className="sos-button" onClick={handleEmergencySOS}>
        🚨 Emergency SOS
      </button>

      {/* Blog Submission Form */}
      {blogFormVisible && (
        <div className="blog-form">
          <h3 style={{ color: "#333", fontWeight: "bold" }}>Submit a Blog</h3>
          <form onSubmit={handleBlogSubmit}>
            <div>
              <label htmlFor="name">Your Name:</label>
              <input type="text" id="name" name="name" placeholder="Enter your name" required />
            </div>
            <div>
              <label htmlFor="place">Place Visited:</label>
              <input type="text" id="place" name="place" placeholder="Enter place name" required />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <textarea id="description" name="description" placeholder="Describe the place..." required />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SpeechTextProcessor;
