import { useState } from 'react';
import MapDisplay from './components/MapDisplay.js';

function App() {
  // State for latitude (default: New Delhi coordinates)
  const [lat, setLat] = useState(28.6139);
  // State for longitude (default: New Delhi coordinates)
  const [lng, setLng] = useState(77.2088);

  // Function to update coordinates when submitted
  const handleCoordinatesSubmit = (lat, lng) => {
    setLat(lat); // Update latitude
    setLng(lng); // Update longitude
  };

  return (
    <div className="App">
      <h1>Location Marker</h1>

      {/* Input field for latitude */}
      <input
        type="number"
        value={lat}
        onChange={(e) => setLat(parseFloat(e.target.value))} // Convert input string to number
      />

      {/* Input field for longitude */}
      <input
        type="number"
        value={lng}
        onChange={(e) => setLng(parseFloat(e.target.value))} // Convert input string to number
      />

      {/* Button to submit coordinates */}
      <button onClick={() => handleCoordinatesSubmit(lat, lng)}>
        Submit Coordinates
      </button>

      {/* Render the MapDisplay component with current lat/lng */}
      <MapDisplay lat={parseFloat(lat)} lng={parseFloat(lng)} />
    </div>
  );
}

export default App;
