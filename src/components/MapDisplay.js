import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import leaf from "leaflet";

function MapDisplay({ lat, lng }) {
  // Refs to store the map and marker instances
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    // Skip if coordinates are invalid
    if (isNaN(lat) || isNaN(lng)) return;

    // Initialize the map if it doesn't exist
    if (!mapRef.current) {
      // Create a Leaflet map centered at [lat, lng] with zoom level 15
      mapRef.current = leaf.map("map").setView([lat, lng], 15);

      // Add OpenStreetMap tiles as the base layer
      leaf.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      // Custom red triangle icon for the marker
      const triangleIcon = new leaf.divIcon({
        className: "red-triangle-marker",
        html: `
          <div style="
            width: 0;
            height: 0;
            border-left: 12px solid transparent;
            border-right: 12px solid transparent;
            border-top: 24px solid #ff0000;
            position: absolute;
            top: 0;
            left: -12px;
          "></div>
        `,
        iconSize: [24, 24],  // Size of the icon
        iconAnchor: [12, 24], // Anchor point (bottom center)
      });

      // Create and add the marker to the map
      markerRef.current = leaf
        .marker([lat, lng], { icon: triangleIcon })
        .addTo(mapRef.current);
    } else {
      // If the map already exists, update its view and marker position
      mapRef.current.setView([lat, lng]);
      markerRef.current.setLatLng([lat, lng]);
    }
  }, [lat, lng]); // Re-run effect when lat/lng change

  // Render the map container
  return (
    <div
      id="map"
      style={{
        height: "400px",
        width: "80%",
        margin: "0 auto",
        marginTop: "20px"
      }}
    />
  );
}

export default MapDisplay;
