import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

export default function MapComponent({ placeName }) {
  const [userLocation, setUserLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [route, setRoute] = useState([]);
  const [distance, setDistance] = useState(null);
  const [travelTime, setTravelTime] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error fetching user location:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (userLocation && placeName) {
      // Fetch destination coordinates and route here
      // Use OpenRouteService or Google Maps API
    }
  }, [userLocation, placeName]);

  return (
    <div className="map-container">
      <MapContainer center={userLocation || [20.5937, 78.9629]} zoom={5} scrollWheelZoom={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {userLocation && <Marker position={userLocation}><Popup>Your Location</Popup></Marker>}
        {destinationLocation && <Marker position={destinationLocation}><Popup>{placeName}</Popup></Marker>}
        {route.length > 0 && <Polyline positions={route} color="blue" />}
      </MapContainer>
      {distance && travelTime && (
        <div className="route-info">
          <p>Distance: {distance} km</p>
          <p>Travel Time: {travelTime} minutes</p>
        </div>
      )}
    </div>
  );
}