import { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const API_KEY = "5b3ce3597851110001cf62489d0797df997c4929861629efea7468e9"; // Replace with your OpenRouteService API key

export default function TripPlanner() {
  const [userLocation, setUserLocation] = useState(null); // User's current location [lat, lng]
  const [placeName, setPlaceName] = useState(""); // Destination place name
  const [destination, setDestination] = useState(null); // Destination coordinates { name, lat, lng }
  const [route, setRoute] = useState([]); // Route coordinates for Polyline
  const [distance, setDistance] = useState(null); // Distance in km
  const [travelTime, setTravelTime] = useState(null); // Travel time in hours and minutes
  const [transportMode, setTransportMode] = useState("driving-car"); // Transport mode (default: driving)

  // Fetch user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        () => alert("Failed to get your location")
      );
    }
  }, []);

  // Fetch coordinates for the destination
  useEffect(() => {
    if (placeName) {
      fetchPlaceCoordinates();
    }
  }, [placeName]);

  // Fetch route and calculate distance & time
  useEffect(() => {
    if (userLocation && destination) {
      fetchRoute();
    }
  }, [userLocation, destination, transportMode]);

  // Fetch coordinates for the destination using OpenStreetMap Nominatim
  const fetchPlaceCoordinates = async () => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(placeName)}`
      );
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setDestination({ name: placeName, lat: parseFloat(lat), lng: parseFloat(lon) });
      } else {
        alert("Place not found!");
      }
    } catch (error) {
      console.error("Error fetching place coordinates:", error);
    }
  };

  // Fetch route and calculate distance & time using OpenRouteService
  const fetchRoute = async () => {
    if (!userLocation || !destination) return;
    try {
      const response = await axios.post(
        `https://api.openrouteservice.org/v2/directions/${transportMode}/geojson`,
        {
          coordinates: [
            [userLocation[1], userLocation[0]], // User Location (Longitude, Latitude)
            [destination.lng, destination.lat], // Destination (Longitude, Latitude)
          ],
        },
        {
          headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" },
        }
      );

      const routeCoords = response.data.features[0].geometry.coordinates.map(([lon, lat]) => [lat, lon]);

      // Extract distance and duration from API response
      const routeDistance = response.data.features[0].properties.segments[0].distance / 1000; // Convert meters to km
      const routeDuration = response.data.features[0].properties.segments[0].duration; // Duration in seconds

      setDistance(routeDistance.toFixed(2)); // Store distance rounded to 2 decimal places

      // Convert duration to hours and minutes
      const hours = Math.floor(routeDuration / 3600);
      const minutes = Math.floor((routeDuration % 3600) / 60);
      setTravelTime(`${hours}h ${minutes}m`); // Store formatted travel time

      setRoute(routeCoords);
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  return (
    <div className="trip-planner">
      <h1>Trip Planner</h1>

      {/* Destination Input */}
      <div className="destination-input">
        <input
          type="text"
          placeholder="Enter destination"
          value={placeName}
          onChange={(e) => setPlaceName(e.target.value)}
        />
        <select
          value={transportMode}
          onChange={(e) => setTransportMode(e.target.value)}
        >
          <option value="driving-car">Driving</option>
          <option value="cycling-regular">Cycling</option>
          <option value="foot-walking">Walking</option>
        </select>
      </div>

      {/* Display Distance and Travel Time */}
      {distance && travelTime && (
        <div className="route-info">
          <p>Distance: {distance} km</p>
          <p>Travel Time: {travelTime}</p>
        </div>
      )}

      {/* Map */}
      {userLocation && (
        <MapContainer
          center={userLocation}
          zoom={13}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* User Location Marker */}
          <Marker position={userLocation}>
            <Popup>Your Location</Popup>
          </Marker>

          {/* Destination Marker */}
          {destination && (
            <Marker position={[destination.lat, destination.lng]}>
              <Popup>{destination.name}</Popup>
            </Marker>
          )}

          {/* Route Polyline */}
          {route.length > 0 && (
            <Polyline positions={route} color="blue" />
          )}
        </MapContainer>
      )}
    </div>
  );
}