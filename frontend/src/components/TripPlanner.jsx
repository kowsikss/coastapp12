import { useState } from "react";
import MapComponent from "./MapComponent";
import "./TripAdvisor.css"

export default function TripPlanner() {
  const [placeName, setPlaceName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(1);
  const [showMap, setShowMap] = useState(false);

  const handleTripPlannerSubmit = (e) => {
    e.preventDefault();
    setShowMap(true);
  };

  return (
    <div className="trip-planner-form">
      <h3>Plan Your Trip</h3>
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

      {showMap && <MapComponent placeName={placeName} />}
    </div>
  );
}