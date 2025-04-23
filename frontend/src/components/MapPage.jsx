import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import backgroundVideo from "../assets/videos.mp4"; // Import the video file
import "./MapPage.css"; // Import CSS for styling

const MapPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const placeName = params.get("place");
  const startDate = params.get("date");
  const numberOfDays = parseInt(params.get("days"), 10);

  const [travelTime, setTravelTime] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [route, setRoute] = useState(null);
  const [transportMode, setTransportMode] = useState("driving-car");
  const [hotels, setHotels] = useState([]);
  const [distance, setDistance] = useState(null);
  const [tripPlan, setTripPlan] = useState([]);

  const API_KEY = "5b3ce3597851110001cf62489d0797df997c4929861629efea7468e9"; // Replace with your API key

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

  useEffect(() => {
    if (placeName) {
      fetchPlaceCoordinates();
    }
  }, [placeName]);

  useEffect(() => {
    if (userLocation && destination) {
      fetchRoute();
      fetchHotels();
    }
  }, [userLocation, destination, transportMode]);

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

  const fetchRoute = async () => {
    if (!userLocation || !destination) return;
    try {
      const response = await axios.post(
        `https://api.openrouteservice.org/v2/directions/${transportMode}/geojson`,
        {
          coordinates: [
            [userLocation[1], userLocation[0]],
            [destination.lng, destination.lat],
          ],
        },
        {
          headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" },
        }
      );

      const routeCoords = response.data.features[0].geometry.coordinates.map(([lon, lat]) => [lat, lon]);
      const routeDistance = response.data.features[0].properties.segments[0].distance / 1000;
      const routeDuration = response.data.features[0].properties.segments[0].duration;

      setDistance(routeDistance.toFixed(2));

      const hours = Math.floor(routeDuration / 3600);
      const minutes = Math.floor((routeDuration % 3600) / 60);
      setTravelTime(`${hours}h ${minutes}m`);

      setRoute(routeCoords);
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  const fetchHotels = async () => {
    if (!destination) return;
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=hotel+near+${encodeURIComponent(destination.name)}`
      );

      if (response.data.length > 0) {
        const hotelData = response.data.slice(0, 5).map((hotel) => ({
          name: hotel.display_name,
          lat: parseFloat(hotel.lat),
          lng: parseFloat(hotel.lon),
          bookingLink: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(hotel.display_name)}`,
        }));
        setHotels(hotelData);
      }
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const generateTripPlan = async () => {
    if (!destination) return;
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=attractions+in+${encodeURIComponent(destination.name)}`
      );

      if (response.data.length > 0) {
        const attractions = response.data.map((place) => ({
          name: place.display_name,
          lat: parseFloat(place.lat),
          lng: parseFloat(place.lon),
        }));

        const plan = [];
        let index = 0;
        const placesPerDay = Math.ceil(attractions.length / numberOfDays);

        for (let day = 1; day <= numberOfDays; day++) {
          const dailyPlaces = attractions.slice(index, index + placesPerDay);
          index += placesPerDay;
          if (dailyPlaces.length > 0) {
            plan.push({ day, places: dailyPlaces });
          }
        }

        setTripPlan(plan);
      }
    } catch (error) {
      console.error("Error generating trip plan:", error);
    }
  };

  return (
    <div className="map-page-container">
      {/* Background Video */}
      <video autoPlay loop muted className="background-video">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for better readability */}
      <div className="video-overlay"></div>

      {/* Main Content */}
      <div className="map-content">
        <h2>Trip Plan for {placeName}</h2>
        <p><strong>Start Date:</strong> {startDate}</p>
        <p><strong>Trip Duration:</strong> {numberOfDays} days</p>
        {distance && travelTime && <p><strong>Estimated Travel Time:</strong> {travelTime}</p>}
        <button onClick={generateTripPlan} className="generate-plan-button">
          Generate Trip Plan
        </button>
        {distance && <p><strong>Travel Distance:</strong> {distance} km</p>}

        <label><strong>Select Mode of Transport:</strong></label>
        <select
          value={transportMode}
          onChange={(e) => setTransportMode(e.target.value)}
          className="transport-select"
        >
          <option value="driving-car">Car</option>
          <option value="cycling-regular">Bicycle</option>
          <option value="foot-walking">Walking</option>
        </select>

        {/* Map Section */}
        <div className="map-container">
          <MapContainer center={userLocation || [20, 77]} zoom={6} style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {userLocation && (
              <Marker position={userLocation}>
                <Popup>Your Location</Popup>
              </Marker>
            )}
            {destination && (
              <Marker position={[destination.lat, destination.lng]}>
                <Popup>Destination: {destination.name}</Popup>
              </Marker>
            )}
            {route && <Polyline positions={route} color="black" weight={5} opacity={0.8} />}
            {hotels.map((hotel, index) => (
              <Marker key={index} position={[hotel.lat, hotel.lng]}>
                <Popup>
                  <strong>{hotel.name}</strong>
                  <br />
                  <a href={hotel.bookingLink} target="_blank" rel="noopener noreferrer">
                    Book Now
                  </a>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Nearby Hotels Section */}
        <div className="info-box">
          <h3>Nearby Hotels</h3>
          <ul>
            {hotels.map((hotel, index) => (
              <li key={index}>
                <strong>{hotel.name}</strong>
                <br />
                <a href={hotel.bookingLink} target="_blank" rel="noopener noreferrer">
                  Book Now
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Trip Plan Section */}
        <div className="info-box">
          <h3>Trip Plan</h3>
          <ul>
            {tripPlan.map((dayPlan, index) => (
              <li key={index}>
                <strong>Day {dayPlan.day}:</strong>
                <ul>
                  {dayPlan.places.map((place, i) => (
                    <li key={i}>{place.name}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MapPage;