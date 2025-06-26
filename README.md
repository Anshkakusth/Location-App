# Location-App

# LOCATOR

User give latitude and longitude and map shows the location on the map with a marker on it with the help of leaflet library. We are using reactjs to create this project.


## Installation

```bash
  npx create-react-app@latest geo-app
  cd geo-app
  npm install react-leaflet leaflet
```
    
## Examples

```javascript
mport { useState } from 'react';
import MapDisplay from './components/MapDisplay.js';
function App() {
  const [lat, setLat] = useState(28.6139);
  const [lng, setLng] = useState(77.2088);

  const handleCoordinatesSubmit = (lat, lng) => {
    setLat(lat);
    setLng(lng);
  };

  return (
    <div className="App">
      <h1>Location Marker</h1>
      <input
        type="number"
        value={lat}
        onChange={(e) => setLat(parseFloat(e.target.value))}
      />
      <input
        type="number"
        value={lng}
        onChange={(e) => setLng(parseFloat(e.target.value))}
      />
      <button onClick={() => handleCoordinatesSubmit(lat, lng)}>
        Submit Coordinates
      </button>
      <MapDisplay  lat={parseFloat(lat)} lng={parseFloat(lng)} />
    </div>
  );
}

export default App;

```


## Running

To run

```bash
  npm start
```

