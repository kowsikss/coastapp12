import { useState, useRef, useEffect } from "react";
import { FaUser, FaCamera, FaEllipsisV, FaShip, FaCommentDots, FaMapMarkerAlt } from "react-icons/fa";
import "./Navbar.css";
import axios from "axios";
import { FaFish } from 'react-icons/fa';
import { AiOutlineRobot } from 'react-icons/ai';
import video from "../assets/video.mp4";
import video2 from "../assets/video.mp4";
import video3 from "../assets/videos.mp4";
import video4 from "../assets/video3.mp4";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import east from "../assets/east.jpg";
import west from "../assets/west.jpg";
import north from "../assets/north.jpg";
import south from "../assets/south.jpg";
import wadapav from "../assets/wadapav.webp";
import laddoo from "../assets/laddoo.webp";
import kathakali from "../assets/kathakali.jpg";
import jagannath from "../assets/jagannath.webp";
import coorg from "../assets/coorg.webp";
import dudh from "../assets/dudh.webp";
import baratham from"../assets/bharatham.webp";
import gate from"../assets/gate.jpg";
export default function Navbar() {

const [response, setResponse] = useState("");
const [error, setError] = useState("");
const [showFooter, setShowFooter] = useState(false);
  const [location, setLocation] = useState("");
  const [wikiData, setWikiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [backgroundVideo, setBackgroundVideo] = useState(video);
  const [currentQuote, setCurrentQuote] = useState("");
  const [cameraOpen, setCameraOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [objectInfo, setObjectInfo] = useState([]);
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [showTripPlanner, setShowTripPlanner] = useState(false);
  const [placeName, setPlaceName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(1);
  const [showMap, setShowMap] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  // Background videos and quotes for each direction
  const videos = {
    East: video2,  // Using imported video2
    West: video4,   // Using imported video
    North: video2, // Using imported video2
    South: video3  // Using imported video
  };

  const quotes = {
    East: "Explore the serene beaches of the East.",
    West: "Discover the vibrant shores of the West.",
    North: "Experience the tranquil beauty of the North.",
    South: "Feel the warmth of the Southern sands.",
  };

  // Fetch weather data
  const fetchWeatherData = async () => {
    const apiKey = process.weather; // Replace with your OpenWeatherMap API key
    const city = "New York"; // Replace with the desired city
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    }
  };

  // Group forecasts by day
  const groupForecastsByDay = (forecasts) => {
    const grouped = {};
    forecasts.forEach((forecast) => {
      const date = new Date(forecast.dt * 1000).toLocaleDateString("en-US", { weekday: "long" });
      if (!grouped[date]) {
        grouped[date] = forecast;
      }
    });
    return Object.values(grouped).slice(0, 5); // Return only the first 5 days
  };

  // Fetch weather data on component mount
  useEffect(() => {
    fetchWeatherData();
  }, []);

  // Handle direction button clicks
  const handleDirectionClick = (direction) => {
    setBackgroundVideo(videos[direction]);
    setCurrentQuote(quotes[direction]); // Set the quote to display
  };

  // Fetch Wikipedia data
  const fetchWikiData = async () => {
    if (!location.trim()) return;

    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(location)}`;
    setLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.extract) {
        setWikiData({
          title: data.title,
          summary: data.extract,
          image: data.thumbnail?.source || null,
        });
      } else {
        setWikiData({ title: "Not Found", summary: "No information available.", image: null });
      }
    } catch (error) {
      setWikiData({ title: "Error", summary: "Could not fetch data.", image: null });
    } finally {
      setLoading(false);
    }
  };

  const openCamera = () => {
    // Instead of opening your camera, redirect to Fishial AI portal
    window.location.href = "https://portal.fishial.ai/search/by-fishial-recognition";
  };
  
  // You can remove closeCamera and handleImageCapture if they're no longer used
  
  

  
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? '/api/login' : '/api/signup';
    const body = isLogin ? { email, password } : { email, password, confirmPassword };
   console.log("ai called")
    try {
      const response = await fetch(`http://localhost:5001/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await response.json();
       console.log(data)
     
      if (response.ok) {
        console.log(isLogin ? 'Logged in successfully' : 'Signed up successfully');
        // Handle successful login/signup (e.g., store token, redirect)
      } else {
        alert(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Redirect to external websites
  const redirectToWebsite = (url) => {
    window.open(url, "_blank");
  };


const handleChatbotSubmit = async (message) => {
  if (!message.trim()) return;

  setError(""); // Clear previous error
  console.log("Frontend Input:", message);

  try {
    const response = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response:", data); // Debug full response

    // Extract only the "content" field
    const chatbotReply = data.reply.kwargs.content;

    setChatHistory([...chatHistory, { role: "bot", content: chatbotReply }]); // Update UI with only content
  } catch (error) {
    console.error("Error fetching AI response:", error.message);
    setError(error.message);
  }
};
 const handleTripPlannerSubmit = async (e) => {
  e.preventDefault();
  const userId = /* Get the logged-in user's ID from your auth state */21;

  try {
    const response = await fetch('http://localhost:5001/api/trip', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ placeName, startDate, numberOfDays, userId }),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Trip saved successfully');
      setShowMap(true);
      setShowTripPlanner(false);
    } else {
      alert(data.error || 'Something went wrong');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};


  // DestinationPage Component
  const DestinationPage = () => {
    const [region, setRegion] = useState("");
    const [days, setDays] = useState("");

    const handleApply = () => {
      if (!region.trim() || !days) {
        alert("Please enter both region and number of days.");
        return;
      }
      alert(`Trip planned to ${region} for ${days} days!`);
    };

    return (
      <div className="content-container">
        <h1>Destination</h1>
        <p className="quote">Where every sunset is a celebration and the waves dance to the rhythm of freedom.</p>

        {/* Grid View for Regions */}
        <div className="region-grid">
          {[
            {name:"Tamil nadu",img:baratham},
            { name: "Kerala", img: kathakali },
            { name: "Goa", img: dudh },
            { name: "Andhra Pradesh", img: laddoo },
            {name:"Mumbai" ,img:gate},
            { name: "Odisha", img: jagannath },
            { name: "Maharashtra", img: wadapav },
            { name: "Karnataka", img: coorg }
          ].map((region, index) => (
            <div key={index} className="region">
              <img src={region.img} alt={region.name} />
              <p>{region.name}</p>
            </div>
          ))}
        </div>

        {/* Explore Button */}
        <button className="explore-btn">Explore</button>

        <hr />

        {/* Plan Your Trip Section */}
        <h2 className="trip-title">Plan Your Trip</h2>
        <div className="trip-container">
          <div className="trip-inputs">
            <input
              type="text"
              placeholder="Enter region"
              className="trip-input"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />
            <input
              type="number"
              placeholder="Enter period (days)"
              className="trip-input"
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />
            <button className="trip-btn" onClick={handleApply}>
              Apply
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Map Component
  const Map = ({ placeName }) => {
    const position = [20.5937, 78.9629]; // Default position (India)

    return (
      <div className="map-container">
        <MapContainer center={position} zoom={5} scrollWheelZoom={false}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>{placeName || "Your destination"}</Popup>
          </Marker>
        </MapContainer>
      </div>
    );
  };

  return (
    <div className="app-container">
      {/* Background Video */}
      <video autoPlay muted loop className="background-video">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <FaShip size={28} className="boat-icon" />
          <span className="logo-text">AquaPlore</span>
        </div>

        <div className="nav-links">
          <a href="/mystery">Coastal Mystery</a>
          <a href="/destination">Explore Sea </a>
          <a href="/Trip">Plan Your Trip</a>
          <a href="/taste">tastes</a>
          <a href="/health">ocean health</a>
          <a href="/blog"> blog</a>
          <button onClick={() => handleDirectionClick("East")}>East</button>
          <button onClick={() => handleDirectionClick("West")}>West</button>
          <button onClick={() => handleDirectionClick("North")}>North</button>
          <button onClick={() => handleDirectionClick("South")}>South</button>
        </div>

        <div className="nav-icons">
          <button className="icon-btn" onClick={() => setShowAuth(true)}>
            <FaUser size={20} />
          </button>
          <button className="icon-btn" onClick={openCamera}>
          <FaFish size={30} color="#1E90FF" />
          </button>
          <button className="icon-btn">
            <FaEllipsisV size={20} />
          </button>
        </div>
      </nav>

      {/* Trip Planner Button */}
      <button className="trip-planner-btn" onClick={() => setShowTripPlanner(!showTripPlanner)}>
        trip
      </button>

      {/* Trip Planner Modal */}
      {showTripPlanner && (
        <div className="trip-planner-modal">
          <div className="trip-planner-header">
            <h3>Trip Planner</h3>
            <button onClick={() => setShowTripPlanner(false)}>Close</button>
          </div>
          <div className="trip-planner-body">
            <form onSubmit={handleTripPlannerSubmit}>
              <label>Place Name:</label>
              <input
                type="text"
                placeholder="Enter place name"
                value={placeName}
                onChange={(e) => setPlaceName(e.target.value)}
                required
              />
              <label>Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
              <label>Number of Days:</label>
              <input
                type="number"
                min="1"
                value={numberOfDays}
                onChange={(e) => setNumberOfDays(parseInt(e.target.value, 10))}
                required
              />
              <button type="submit">Plan Trip</button>
            </form>
          </div>
        </div>
      )}

     
<>
      {/* Mira Chatbot Button */}
      <button
        className={`mira-chatbot-btn ${showChatbot ? "active" : ""}`}
        onClick={() => setShowChatbot(!showChatbot)}
         aria-label="Open Chatbot"
      title="Open Chatbot"
      >
       ai
      </button>

      {/* Mira Chatbot Modal */}
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
            {error && <p className="error">{error}</p>}
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault(); // Prevent page refresh
              handleChatbotSubmit(userMessage);
            }}
          >
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

      {/* Scrollable Content */}
      <div className="scrollable-content">
        {/* Quote Display */}
        {currentQuote && (
          <div className="quote-display">
            <p>{currentQuote}</p>
          </div>
        )}

        {/* Centered Content */}
        <div className="centered-content">
          <h1>Welcome to AquaPlore</h1>
          <h2>Explore Your Golden Sands</h2>
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter a place...."
              className="location-input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button className="fetch-btn" onClick={fetchWikiData} disabled={loading}>
              {loading ? "Fetching..." : "Fetch Info"}
            </button>
          </div>
        </div>

        {/* Wikipedia Data Display */}
        {wikiData && (
          <div className="wiki-container">
            <h2 className="wiki-title">{wikiData.title}</h2>
            {wikiData.image && <img src={wikiData.image} alt={wikiData.title} className="wiki-image" />}
            <p className="wiki-summary">{wikiData.summary}</p>
          </div>
        )}

        {/* Top Attractions Section */}
        <div className="top-attractions">
          <h2>Top Attractions</h2>
          <div className="beaches-grid">
            <div className="beach-card" onClick={() => redirectToWebsite("https://www.tripadvisor.in/Attraction_Review-g503691-d523963-Reviews-Radhanagar_Beach-Havelock_Island_Andaman_and_Nicobar_Islands.html")}>
              <img src={west} alt="Beach 1" />
              <p>Radhanagar Beach</p>
            </div>
            <div className="beach-card" onClick={() => redirectToWebsite("https://www.tripadvisor.in/Attraction_Review-g297639-d324100-Reviews-Varkala_Beach-Varkala_Town_Varkala_Thiruvananthapuram_District_Kerala.html")}>
              <img src={east} alt="Beach 2" />
              <p>Varkala Beach</p>
            </div>
            <div className="beach-card" onClick={() => redirectToWebsite("https://www.tripadvisor.in/Attraction_Review-g635747-d2697362-Reviews-Baga_Beach-Baga_North_Goa_District_Goa.html")}>
              <img src={north} alt="Beach 3" />
              <p>Baga Beach</p>
            </div>
            <div className="beach-card" onClick={() => redirectToWebsite("https://www.tripadvisor.in/Attraction_Review-g651646-d1205354-Reviews-Om_Beach-Gokarna_Uttara_Kannada_District_Karnataka.html")}>
              <img src={south} alt="Beach 4" />
              <p>Gokarna's Om Beach</p>
            </div>
          </div>
          <button className="explore-button" onClick={() => redirectToWebsite("https://www.tripadvisor.in/Attractions-g293860-Activities-c61-t52-India.html")}>
            Explore Beaches
          </button>
        </div>

        {/* Weather Information */}
        <div className="weather-info">
          <h2>Weather Forecast</h2>
          {weatherData ? (
            <div className="weather-days">
              {groupForecastsByDay(weatherData.list).map((forecast, index) => {
                const date = new Date(forecast.dt * 1000); // Convert timestamp to Date object
                const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" }); // Get the day of the week
                return (
                  <p key={index}>
                    {dayOfWeek}: {forecast.weather[0].description} {Math.round(forecast.main.temp)}°C
                  </p>
                );
              })}
            </div>
          ) : (
            <p>Loading weather data...</p>
          )}
          <button className="explore-button" onClick={() => redirectToWebsite("https://openweathermap.org/city/1264527")}>
            Explore Weather
          </button>
        </div>

        {/* Hey Travel with AquaPlore Section */}
        <div className="travel-with-aquaplore">
          <h2>Hey Travel with AquaPlore</h2>
          <div className="transport-grid">
            <div className="transport-card" onClick={() => redirectToWebsite("https://www.redbus.in")}>
              <p>Bus</p>
            </div>
            <div className="transport-card" onClick={() => redirectToWebsite("https://www.irctc.co.in")}>
              <p>Train</p>
            </div>
            <div className="transport-card" onClick={() => redirectToWebsite("https://www.olacabs.com")}>
              <p>Cab</p>
            </div>
            <div className="transport-card" onClick={() => redirectToWebsite("https://www.makemytrip.com")}>
              <p>Flight</p>
            </div>
          </div>
          <button className="beach-stay-button" onClick={() => redirectToWebsite("https://www.booking.com")}>
            Beach Stay
          </button>
        </div>

        {/* Auth Modal */}
        {showAuth && (
          <div className="auth-modal">
            <div className="auth-content">
              <h2>{isLogin ? "Login" : "Sign Up"}</h2>
              <form onSubmit={handleAuthSubmit}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {!isLogin && (
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                )}
                <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
              </form>
              <p>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Sign Up" : "Login"}</button>
              </p>
              <button className="close-auth-btn" onClick={() => setShowAuth(false)}>
                Close
              </button>
            </div>
          </div>
        )}

        {/* Camera Modal */}
        {cameraOpen && (
          <div className="camera-modal">
            <video ref={videoRef} autoPlay className="camera-view"></video>
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
            <button onClick={handleImageCapture} className="capture-btn">
              Capture Image
            </button>
            <button onClick={closeCamera} className="close-camera-btn">
              Close Camera
            </button>
          </div>
        )}

        {/* Object Detection Results */}
        {objectInfo.length > 0 && (
          <div className="object-info">
            <h3>Object Detection Results</h3>
            {objectInfo.map((info, index) => (
              <p key={index}>{info}</p>
            ))}
          </div>
        )}

        {/* Destination Page */}
        <DestinationPage />

        {/* Map Component */}
        {showMap && <Map placeName={placeName} />}
      </div>

      <div style={{ position: "absolute", minHeight: "100vh"  }}>
      <div className="main-content">
        {/* All other content of the page goes here */}
      </div>
      <footer className="footer">
        <div className="footer-container">
          {/* Quick Links */}
          <div className="quick-links">
            <h3>Quick Links</h3>
            <a href="#">Home</a>
            <a href="#">Destinations</a>
            <a href="#">Activities</a>
            <a href="#">Gallery</a>
            <a href="#">Blog</a>
          </div>

          {/* Legal Links */}
          <div className="legal-links">
            <a href="#">Terms & Conditions</a> |
            <a href="#">Privacy Policy</a> |
            <a href="#">Contact Us</a>
          </div>

          {/* Copyright */}
          <p>&copy; 2025 Ministry Of Climate and Forest, Government of India. All rights reserved.</p>
        </div>
      </footer>
    </div>
    </div>

    
  );
}