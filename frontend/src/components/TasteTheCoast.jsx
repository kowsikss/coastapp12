import React, { useState } from "react";
import "./TasteTheCoast.css";
import video from "../assets/cook.mp4";
import fish from "../assets/fish.jpg";
import crab from "../assets/crab.jpg";
import lob from "../assets/lob.jpg";
import fish2 from "../assets/fish2.jpg";

const allDishes = [
  {
    name: "Malabar Prawn Curry",
    image: fish,
    restaurant: "Spice Harbour, Kochi",
    region: "Kerala",
    map: "https://maps.google.com/?q=Spice+Harbour+Kochi",
  },
  {
    name: "Goan Fish Thali",
    image: lob,
    restaurant: "Fisherman’s Wharf, Goa",
    region: "Goa",
    map: "https://maps.google.com/?q=Fisherman’s+Wharf+Goa",
  },
  {
    name: "Chettinad Crab Masala",
    image: crab,
    restaurant: "Ayyanar Mess, Rameswaram",
    region: "Tamil Nadu",
    map: "https://maps.google.com/?q=Ayyanar+Mess+Rameswaram",
  },
  {
    name: "Mangalorean Fish Fry",
    image: fish2,
    restaurant: "Machali, Mangalore",
    region: "Karnataka",
    map: "https://maps.google.com/?q=Machali+Mangalore",
  },
];

const TasteTheCoast = () => {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");

  const filteredDishes = allDishes.filter(dish => {
    return (
      (region === "All" || dish.region === region) &&
      dish.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="taste-container">
      <video autoPlay muted loop className="bg-video">
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="content-overlay">
        <h1 className="section-title">Taste the Coast</h1>
        <p className="section-desc">
          Discover authentic coastal dishes from across India, and find where to enjoy them.
        </p>

        <div className="controls">
          <input
            type="text"
            placeholder="Search dishes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <select value={region} onChange={e => setRegion(e.target.value)}>
            <option value="All">All Regions</option>
            <option value="Kerala">Kerala</option>
            <option value="Goa">Goa</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Karnataka">Karnataka</option>
          </select>
        </div>

        <div className="dish-grid">
          {filteredDishes.map((dish, index) => (
            <div key={index} className="dish-card">
              <img src={dish.image} alt={dish.name} className="dish-image" />
              <h3>{dish.name}</h3>
              <p className="restaurant">🍴 Available at: <strong>{dish.restaurant}</strong></p>
              <a className="map-link" href={dish.map} target="_blank" rel="noopener noreferrer">
                📍 View on Map
              </a>
              <div className="ratings">⭐️⭐️⭐️⭐️☆</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasteTheCoast;
