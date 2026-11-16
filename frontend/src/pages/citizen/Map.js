import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import api from "../../api/axios";

// Fix Leaflet's default marker icon broken by webpack
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Tunis center coordinates
const TUNIS_CENTER = [36.8065, 10.1815];

export default function Map() {
  const [points, setPoints] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get("/locations/dropoff-points/")
      .then((r) => setPoints(r.data))
      .catch(() => setError("Could not load drop-off points."));
  }, []);

  return (
    <div style={styles.container}>
      <h2>Drop-off Points</h2>
      {error && <p style={styles.error}>{error}</p>}
      <MapContainer center={TUNIS_CENTER} zoom={12} style={styles.map}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {points.map((point) => (
          <Marker key={point.id} position={[point.latitude, point.longitude]}>
            <Popup>
              <strong>{point.name}</strong><br />
              {point.address}<br />
              <em>{point.accepted_materials}</em>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

const styles = {
  container: { maxWidth: 900, margin: "40px auto", padding: "0 16px" },
  map: { height: "500px", width: "100%", borderRadius: 8 },
  error: { color: "red" },
};
