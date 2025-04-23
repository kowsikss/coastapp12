import { useState } from "react";
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
import baratham from "../assets/bharatham.webp";
import gate from "../assets/gate.jpg";

export default function DestinationPage() {
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
      <p className="quote">
        Where every sunset is a celebration and the waves dance to the rhythm of freedom.
      </p>

      {/* Grid View for Regions */}
      <div className="region-grid">
        {[
          { name: "Tamil Nadu", img: baratham },
          { name: "Kerala", img: kathakali },
          { name: "Goa", img: dudh },
          { name: "Andhra Pradesh", img: laddoo },
          { name: "Mumbai", img: gate },
          { name: "Odisha", img: jagannath },
          { name: "Maharashtra", img: wadapav },
          { name: "Karnataka", img: coorg },
        ].map((region, index) => (
          <div key={index} className="region">
            <img src={region.img} alt={region.name} />
            <p>{region.name}</p>
          </div>
        ))}
      </div>

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
}