import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./style.css";
import axios from "axios";

const MapComponent = ({ address }: { address: string }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
        );
        if (response.data.length > 0) {
          const { lat, lon } = response.data[0];
          setPosition([parseFloat(lat), parseFloat(lon)]);
        }
      } catch (error) {
        console.error("Lỗi khi lấy tọa độ:", error);
      }
    };

    fetchCoordinates();
  }, [address]);

  return (
    <MapContainer
      center={position || [21.0285, 105.8542]} // Mặc định là Hà Nội nếu chưa có dữ liệu
      zoom={13}
      style={{ width: "800px", height: "300px", zIndex: 0 }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {position && (
        <Marker position={position}>
          <Popup>{address}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapComponent;
