const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", methods: ["GET", "POST"] }));

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/ecoDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// Event Schema
const eventSchema = new mongoose.Schema({ name: String, date: String, location: String, icon: String });
const Event = mongoose.model("Event", eventSchema);

// Fetch real environmental event locations
app.get("/events", async (req, res) => {
  try {
    const places = ["Beach Cleanup", "River Cleanup", "Forest Conservation"];
    const apiKey = process.env.NOMINATIM_API_KEY;  // OpenStreetMap API Key
    const eventList = [];

    for (let place of places) {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${place}&format=json&limit=1`);
      if (response.data.length > 0) {
        eventList.push({
          id: response.data[0].place_id,
          name: place,
          date: "2025-05-10",
          location: response.data[0].display_name,
          icon: "🌱"
        });
      }
    }

    res.json(eventList);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Error retrieving events" });
  }
});

// API for signing up for an event
app.post("/signup", async (req, res) => {
  const { eventId } = req.body;
  if (!eventId) return res.status(400).json({ message: "Invalid event ID" });

  res.json({ message: `Successfully signed up for event ID: ${eventId}` });
});

// API for handling donations
app.post("/donate", async (req, res) => {
  const { method } = req.body;
  if (!method) return res.status(400).json({ message: "Payment method required" });

  res.json({ message: `Donation successful via ${method}` });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
