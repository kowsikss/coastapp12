import React, { useState } from "react";
import axios from "axios";
//import * as Location from "expo-location";
//import * as SMS from "expo-sms";
//import call from "react-native-phone-call";
//import * as Linking from "expo-linking";
import "./SpeechTextProcessor.css";

const SpeechTextProcessor = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [image, setImage] = useState("");
  const [listening, setListening] = useState(false);
  const [chatVisible, setChatVisible] = useState(false); // Toggle for chat visibility

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

  // Real-time SOS function
  const handleEmergencySOS = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Please enable location permissions for SOS.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const message = `🚨 EMERGENCY ALERT 🚨\nI need help! My location: https://www.google.com/maps?q=${latitude},${longitude}`;

      // Send SMS if available
      const isSMSSupported = await SMS.isAvailableAsync();
      if (isSMSSupported) {
        await SMS.sendSMSAsync(["112", "100"], message);
        alert("📩 SOS Message Sent!");
      } else {
        alert("SMS is not available on this device.");
      }

      // Make an emergency call
      const args = { number: "112", prompt: true };
      call(args).catch((err) => console.error("Call Error:", err));

      // Send SOS via WhatsApp
      let whatsappURL = `whatsapp://send?text=${encodeURIComponent(message)}&phone=+911234567890`; // Change to emergency contact
      const isWhatsAppAvailable = await Linking.canOpenURL(whatsappURL);
      if (isWhatsAppAvailable) {
        Linking.openURL(whatsappURL);
      } else {
        alert("WhatsApp is not installed.");
      }
    } catch (error) {
      console.error("SOS Error:", error);
      alert("⚠️ Failed to send SOS alert.");
    }
  };

  // Toggle chat interface visibility
  const toggleChat = () => {
    setChatVisible(!chatVisible);
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

      {/* AI Button */}
      <button className="ai-btn" onClick={toggleChat}>
        🤖
      </button>
    </div>
  );
};

export default SpeechTextProcessor;
