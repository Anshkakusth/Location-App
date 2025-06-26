import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import leaf from "leaflet";

function MapDisplay({ lat, lng }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null); // red moving marker
  const prevLat = useRef(null);
  const prevLng = useRef(null);
  const prevMarkerRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = leaf.map("map").setView([lat, lng], 15);

      leaf
        .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        })
        .addTo(mapRef.current);

      // Red triangle icon for current location
      const redTriangleIcon = new leaf.DivIcon({
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
        iconSize: [24, 24],
        iconAnchor: [12, 24],
      });
      markerRef.current = leaf
        .marker([lat, lng], { icon: redTriangleIcon })
        .addTo(mapRef.current)
        .bindPopup("lat: " + lat + " long: " + lng);
    } else {
      mapRef.current.setView([lat, lng]);

      if (prevLat.current !== null && prevLng.current !== null) {
        if (prevMarkerRef.current) {
          mapRef.current.removeLayer(prevMarkerRef.current); // remove old previous marker
        }

        const blueIcon = new leaf.Icon({
          iconUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        });

        prevMarkerRef.current = leaf
          .marker([prevLat.current, prevLng.current], { icon: blueIcon })
          .addTo(mapRef.current)
          .bindPopup("lat: " + prevLat.current + " long: " + prevLng.current);
      }
      // Move the red triangle marker to the new location
      markerRef.current.setLatLng([lat, lng]);
    }

    // Update previous lat/lng
    prevLat.current = lat;
    prevLng.current = lng;
  }, [lat, lng]);

  return (
    <div
      id="map"
      style={{
        height: "500px",
        width: "60%",
        margin: "0 auto",
        marginTop: "20px",
      }}
    />
  );
}

export default MapDisplay;
