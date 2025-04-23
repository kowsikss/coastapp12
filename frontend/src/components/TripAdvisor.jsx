import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TripAdvisor.css";
//import video from "../assets/aqua.mp4";

const TripAdvisor = () => {
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [days, setDays] = useState("");
  const [transport, setTransport] = useState("car");
  const [budget, setBudget] = useState("mid-range");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(
      `/map?place=${encodeURIComponent(place)}&date=${date}&days=${days}&transport=${transport}&budget=${budget}`
    );
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}

      {/* Overlay for Better Readability */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Main Content */}
      <div className="relative z-10 bg-white bg-opacity-90 shadow-2xl rounded-3xl p-10 w-full max-w-lg backdrop-blur-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          🌍 Plan Your Trip ✈️
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold">Destination</label>
            <input
              type="text"
              placeholder="Enter Place (e.g., Taj Mahal)"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              required
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Start Date & Time:</label>
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Number of Days:</label>
            <input
              type="number"
              placeholder="Number of Days"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              required
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Mode of Transport:</label>
            <select
              value={transport}
              onChange={(e) => setTransport(e.target.value)}
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500"
            >
              <option value="car">Car</option>
              <option value="train">Train</option>
              <option value="flight">Flight</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Budget Type:</label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500"
            >
              <option value="budget">Budget</option>
              <option value="mid-range">Mid-range</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-lg"
          >
            🚀 Show on Map
          </button>
        </form>
      </div>
    </div>
  );
};

export default TripAdvisor;