import { useState } from 'react';
import MapDisplay from './components/MapDisplay.js';

function App() {
  // State for latitude (default: New Delhi coordinates)
  const [lat, setLat] = useState(28.6139);
  // State for longitude (default: New Delhi coordinates)
  const [lng, setLng] = useState(77.2088);
  const [inputLat, setInputLat] = useState(lat);
  const [inputLng, setInputLng] = useState(lng);

  // Function to update coordinates when submitted
  const handleCoordinatesSubmit = (lat, lng) => {
    if (!isNaN(inputLat) && !isNaN(inputLng)) {
      setLat(inputLat);
      setLng(inputLng);
    }
  };

  return (
    <div className="App">
      <h1>Location Marker</h1>

      {/* Input field for latitude */}
      <input
        type="number"
        value={inputLat}
        onChange={(e) => setInputLat(parseFloat(e.target.value))} // Convert input string to number
      />

      {/* Input field for longitude */}
      <input
        type="number"
        value={inputLng}
        onChange={(e) => setInputLng(parseFloat(e.target.value))} // Convert input string to number
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
