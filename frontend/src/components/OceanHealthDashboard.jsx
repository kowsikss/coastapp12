import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer
} from 'recharts';
import { MapContainer, TileLayer } from 'react-leaflet';
import { HeatmapLayer } from 'react-leaflet-heatmap-layer-v3';
import video from "../assets/cook.mp4";

import 'leaflet/dist/leaflet.css';
import './OceanHealthDashboard.css';

const OceanHealthDashboard = () => {
  const [oceanData, setOceanData] = useState([]);
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    const fetchOceanData = async () => {
      try {
        const response = await axios.get("http://localhost:5011/api/ocean-data");
        
        const rows = response.data.split("\n").slice(1); // Skip header
        const data = rows
          .filter(row => row.trim() !== "")
          .slice(-5) // Last 5 readings
          .map(row => {
            const [time, temperature] = row.split(",");
            return {
              time: new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              temperature: parseFloat(temperature),
              pH: 8.0 + (Math.random() - 0.5) * 0.3 // Simulated pH value
            };
          });

        setOceanData(data);
      } catch (error) {
        console.error("Error fetching ocean data:", error);
      }
    };

    const simulatePlasticHeatmap = () => {
      const points = [
        { lat: 12.9716, lng: 77.5946, intensity: 0.5 },
        { lat: 13.0827, lng: 80.2707, intensity: 0.7 },
        { lat: 9.9252, lng: 78.1198, intensity: 0.6 },
      ];
      setHeatmapData(points);
    };

    fetchOceanData();
    simulatePlasticHeatmap();
  }, []);

  return (
    <div className="dashboard-container">
      <video autoPlay muted loop className="bg-video">
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <h2>🌊 Ocean Health Dashboard</h2>

      <div className="chart-section">
        <h3>Indian Ocean Surface Temperature & pH</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={oceanData}>
            <XAxis dataKey="time" />
            <YAxis domain={[20, 30]} label={{ value: '°C / pH', position: 'insideLeft' }} />
            <Tooltip />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="temperature" stroke="#007BFF" strokeWidth={2} />
            <Line type="monotone" dataKey="pH" stroke="#28a745" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="map-section">
        <h3>Plastic Density Heatmap</h3>
        <MapContainer center={[12.9716, 77.5946]} zoom={5} scrollWheelZoom={false} style={{ height: '500px', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {heatmapData.length > 0 && (
            <HeatmapLayer
              fitBoundsOnLoad
              fitBoundsOnUpdate
              points={heatmapData}
              longitudeExtractor={m => m.lng}
              latitudeExtractor={m => m.lat}
              intensityExtractor={m => m.intensity}
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default OceanHealthDashboard;
