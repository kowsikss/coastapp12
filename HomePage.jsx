import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [coastalAreas, setCoastalAreas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      () => alert("Please enable location access to find coastal areas.")
    );
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetch(`https://api.example.com/nearby-coastal?lat=${userLocation[0]}&lon=${userLocation[1]}`)
        .then((res) => res.json())
        .then((data) => setCoastalAreas(data));
    }
  }, [userLocation]);

  return (
    <div className="homepage">
      <nav>
        <h1>Aquaplore</h1>
        <ul>
          <li><a href="#">Where to Go?</a></li>
          <li><a href="#">Activities</a></li>
          <li><a href="#">Weather Conditions</a></li>
          <li>
            <input type="text" placeholder="Enter Location..." />
          </li>
        </ul>
      </nav>

      <div className="map-container">
        {userLocation ? (
          <MapContainer center={userLocation} zoom={6} style={{ height: "500px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={userLocation}>
              <Popup>Your Location</Popup>
            </Marker>
            {coastalAreas.map((area, index) => (
              <Marker key={index} position={[area.lat, area.lon]}>
                <Popup>{area.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        ) : (
          <p>Fetching location...</p>
        )}
      </div>

      <button className="ai-btn" onClick={() => navigate("/speech")}>🗣️ AI Chat</button>
    </div>
  );
};

export default HomePage;
