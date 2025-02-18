import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudSun, faCamera, faComments } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import "./HomePage.css";

// Custom Marker Icon
const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
  iconSize: [32, 32],
});

// Coastal Locations Data

const locations = {
  andamanAndNicobar: { lat: 11.7401, lon: 92.6586, beaches: ["Radhanagar Beach", "Corbyns Cove", "Laxmanpur Beach"] },
  andhraPradesh: { lat: 17.8773, lon: 83.2185, beaches: ["Rishikonda Beach", "Bheemunipatnam Beach", "Kailasagiri"] },
  chennai: { lat: 13.0827, lon: 80.2707, beaches: ["Marina Beach", "Elliot's Beach", "Covelong Beach"] },
  goa: { lat: 15.2993, lon: 74.1240, beaches: ["Baga Beach", "Calangute Beach", "Anjuna Beach", "Palolem Beach"] },
  gujarat: { lat: 22.2587, lon: 71.1924, beaches: ["Dumas Beach", "Mandvi Beach", "Somnath Beach"] },
  kerala: { lat: 10.8505, lon: 76.2711, beaches: ["Kovalam Beach", "Varkala Beach", "Cherai Beach"] },
  maharashtra: { lat: 19.7515, lon: 75.7139, beaches: ["Juhu Beach", "Marine Drive", "Alibaug Beach"] },
  odisha: { lat: 20.9517, lon: 85.0985, beaches: ["Puri Beach", "Chandrabhaga Beach", "Gopalpur Beach"] },
  tamilNadu: { lat: 11.1271, lon: 78.6569, beaches: ["Kanyakumari Beach", "Velankanni Beach", "Cuddalore Beach"] },
  westBengal: { lat: 22.9868, lon: 87.8550, beaches: ["Digha Beach", "Mandarmani Beach", "Shankarpur Beach"] },
  puducherry: { lat: 11.9416, lon: 79.8083, beaches: ["Promenade Beach", "Auroville Beach", "Serenity Beach"] },
  lakshadweep: { lat: 10.5696, lon: 72.6370, beaches: ["Kavaratti Beach", "Minicoy Island", "Agatti Island"] },
};


// ✅ Camera Component
const CameraComponent = ({ onCapture, closeCamera }) => {
  const webcamRef = useRef(null);

  useEffect(() => {
    console.log("Camera Component Mounted");
  }, []);

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log("Captured Image:", imageSrc);
      onCapture(imageSrc);
    }
  };

  return (
    <div className="camera-container">
      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
      <button onClick={capture} className="capture-btn">
        <FontAwesomeIcon icon={faCamera} /> Capture
      </button>
      <button onClick={closeCamera} className="close-camera-btn">❌ Close Camera</button>
    </div>
  );
};

// ✅ Feedback Component
const FeedbackComponent = () => {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (feedback.trim() === "") {
      alert("Please enter your feedback before submitting.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="feedback-section">
      <h3>Give Us Your Feedback</h3>
      {!submitted ? (
        <>
          <textarea
            placeholder="Write your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <button onClick={handleSubmit}>
            <FontAwesomeIcon icon={faComments} /> Submit
          </button>
        </>
      ) : (
        <h4>Thank you for your feedback! 😊</h4>
      )}
    </div>
  );
};

const HomePage = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [markerPosition, setMarkerPosition] = useState(null);
  const [beachList, setBeachList] = useState([]);
  const [weatherLocation, setWeatherLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [objectInfo, setObjectInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // New state for error message
  const navigate = useNavigate();

  // ✅ Search and place marker
  const handleSearch = () => {
    const locationKey = searchLocation.toLowerCase();
    if (locations[locationKey]) {
      setMarkerPosition({ lat: locations[locationKey].lat, lon: locations[locationKey].lon });
      setBeachList(locations[locationKey].beaches);
      setErrorMessage(""); // Clear any previous error message
    } else {
      setErrorMessage("Location not found. Please try Chennai, Goa, or Kerala."); // Display error message
      setMarkerPosition(null); // Remove marker if location is not found
      setBeachList([]); // Clear beach list
    }
  };

  // ✅ Fetch Weather Data
  const fetchWeather = async () => {
    if (!weatherLocation.trim()) {
      alert("Please enter a location for weather details.");
      return;
    }
    console.log(weatherLocation);
    try {
      const apiKey = "f398e8e614936a3e3aa0ec208249b381"; // Replace with an actual API Key
      const response = await axios.get(
  `https://api.openweathermap.org/data/2.5/weather?q=${weatherLocation}&appid=${apiKey}`
    );

      
      console.log("Weather Response Data:", response.data); // Log the response to check if data exists
      if (response.data) {
        const temp = response.data.main.temp;
        const condition = response.data.weather[0].description; ;
        setWeather({
          temperature: temp || 'N/A',
          condition:  condition,
        });
      } else {
        setWeather(null); // Set weather to null if the expected structure is not found
        console.error("Weather data format error:", response.data);
      }
    } catch (error) {
      alert("Could not fetch weather data. Check the location or API key.");
      console.error("Weather API Error:", error);
      setWeather(null); // Set weather to null if an error occurs
    }
  };

  // ✅ Handle Image Capture
  const handleImageCapture = async (imageSrc) => {
    setImage(imageSrc);
    setCameraOpen(false);
    try {
      const apiKey = "YOUR_IMAGE_API_KEY"; // Replace with actual API key
      const apiUrl = "https://your-real-api.com/detect-object"; // Replace with a valid API
    
      const response = await axios.post(
        apiUrl,
        { image: imageSrc },
        { headers: { Authorization: `Bearer ${apiKey}` } }
      );
    
      setObjectInfo(response.data);
    } catch (error) {
      console.error("Error analyzing object:", error);
      setObjectInfo("Could not analyze the object. Try again.");
    }
  };

  return (
    <div className="homepage">
      {/* ✅ Navbar */}
      <nav className="navbar">
        <h1 className="title">Aquaplore</h1>
      </nav>

      {/* ✅ Weather Search */}
      <section className="weather-section">
        <h3>Check Weather</h3>
        <div className="weather-search">
          <FontAwesomeIcon icon={faCloudSun} className="weather-icon" />
          <input
            type="text"
            placeholder="Enter location..."
            value={weatherLocation}
            onChange={(e) => setWeatherLocation(e.target.value)}
          />
          <button onClick={fetchWeather}>Search</button>
        </div>

        {/* Weather Data Display */}
        {weather ? (
          <div className="weather-info">
            <p><strong>Temperature:</strong> {Math.round(weather.temperature - 273.15)}°C</p>
            <p><strong>Condition:</strong> {weather.condition}</p>
          </div>
        ) : (
          <p>Weather data is unavailable. Please try again later.</p>
        )}
      </section>

      {/* ✅ Map and Search */}
      <section className="map-section">
        <h3>Find Locations on the Map</h3>
        <input
          type="text"
          placeholder="Search for location (e.g., Chennai, Goa, Kerala)"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>

        {/* Error Message */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* ✅ India Map */}
        <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "400px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {markerPosition && (
            <Marker position={markerPosition} icon={customIcon}>
              <Popup>{searchLocation}</Popup>
            </Marker>
          )}
        </MapContainer>

        {/* Beaches */}
        {beachList.length > 0 && (
          <div className="beaches-list">
            <h4>Beaches:</h4>
            <ul>
              {beachList.map((beach, index) => (
                <li key={index}>{beach}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* ✅ Camera Capture */}
      <section className="camera-section">
        <h3>Identify Coastal Objects</h3>
        <button onClick={() => setCameraOpen(true)} className="open-camera-btn">
          <FontAwesomeIcon icon={faCamera} /> Open Camera
        </button>

        {cameraOpen && (
          <CameraComponent onCapture={handleImageCapture} closeCamera={() => setCameraOpen(false)} />
        )}

        {image && (
          <div className="captured-image">
            <h4>Captured Image:</h4>
            <img src={image} alt="Captured" />
          </div>
        )}

        {objectInfo && (
          <div className="object-info">
            <h4>Object Information:</h4>
            <p>{objectInfo}</p>
          </div>
        )}
      </section>

      {/* ✅ Feedback Section */}
      <FeedbackComponent />

      {/* ✅ AI Chatbot Button */}
      <button className="ai-btn" onClick={() => navigate("/speech")}>ai </button>
    </div>
  );
};

export default HomePage;
