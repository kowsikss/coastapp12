import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./coastalmystery.css";
import video from "../assets/aqua.mp4";


const mysteries = [
  { name: "Leviathan", lat: 60.0, lng: -30.0, description: "A legendary sea monster." },
  { name: "Krishna's Dwaraka", lat: 22.244, lng: 68.969, description: "The submerged city of Lord Krishna." },
  { name: "Atlantis", lat: 31.5, lng: -24.0, description: "The mythical island civilization." },
  { name: "The Kraken", lat: 50.0, lng: -10.0, description: "A gigantic sea creature." },
  { name: "Yonaguni Monument", lat: 24.445, lng: 122.973, description: "A mysterious underwater rock formation in Japan." },
  { name: "Baltic Sea Anomaly", lat: 59.35, lng: 20.3, description: "A UFO-like structure in the Baltic Sea." }
];

const CoastalMystery = () => {
  const [selectedMystery, setSelectedMystery] = useState(null);
  const [wikiData, setWikiData] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const newMap = L.map("mystery-map").setView([20, 0], 2);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(newMap);

    mysteries.forEach((mystery) => {
      L.marker([mystery.lat, mystery.lng])
        .addTo(newMap)
        .bindPopup(mystery.name)
        .on("click", () => handleMysteryClick(mystery));
    });

    setMap(newMap);
  }, []);

  const handleMysteryClick = async (mystery) => {
    setSelectedMystery(mystery);
    try {
      const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(mystery.name)}`);
      const data = await response.json();
      setWikiData(data);
    } catch (error) {
      console.error("Error fetching Wikipedia data:", error);
    }
  };

  return (

    
    <div className="coastal-mystery-page">
      <h1>Coastal Mysteries & Lost Legends</h1>
      <p>Explore the most mysterious places and creatures of the ocean.</p>

      {/* Scrollable Mystery List */}
      <div className="mystery-list">
        {mysteries.map((mystery, index) => (
          <button key={index} className="mystery-button" onClick={() => handleMysteryClick(mystery)}>
            {mystery.name}
          </button>
        ))}
      </div>

      {/* Wikipedia Content for Selected Mystery */}
      {selectedMystery && wikiData && (
        <div className="mystery-info">
          <h2>{selectedMystery.name}</h2>
          <img src={wikiData.thumbnail?.source || "/images/default.jpg"} alt={selectedMystery.name} />
          <p>{wikiData.extract || "No description available."}</p>
          <a href={wikiData.content_urls?.desktop?.page} target="_blank" rel="noopener noreferrer">
            Read more on Wikipedia
          </a>
        </div>
      )}

      {/* Explore the Ocean Button */}
      <button className="explore-button" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}>
        Explore the Ocean 🌊
      </button>

      {/* Scrollable Map Section */}
      <div className="map-container">
        <h2>World Map of Ocean Mysteries</h2>
        <div id="mystery-map"></div>
      </div>
      <video className="video-background" autoPlay loop muted>
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
    </div>
  );
};

export default CoastalMystery;
