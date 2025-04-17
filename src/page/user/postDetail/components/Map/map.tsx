import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./style.css";
import axios from "axios";

const MapComponent = ({ address }: { address: string }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (!address.trim()) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
          {
            headers: {
              'User-Agent': 'YourAppName/1.0' // Thêm User-Agent để tuân thủ yêu cầu API
            }
          }
        );
        
        if (response.data.length > 0) {
          const { lat, lon } = response.data[0];
          setPosition([parseFloat(lat), parseFloat(lon)]);
        } else {
          setError("Không tìm thấy địa chỉ");
          setPosition(null);
        }
      } catch (error) {
        console.error("Lỗi khi lấy tọa độ:", error);
        setError("Có lỗi xảy ra khi tìm kiếm địa chỉ");
      } finally {
        setIsLoading(false);
      }
    };

    // Thêm debounce để tránh gọi API quá nhanh
    const timeoutId = setTimeout(() => {
      fetchCoordinates();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [address]);

  return (
    <div >
      {isLoading && <p>Đang tải...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <MapContainer
        center={position || [21.0285, 105.8542]} // Mặc định là Hà Nội nếu chưa có dữ liệu
        zoom={13}
        style={{ width: "800px", height: "300px", zIndex: 0 }}
      >
        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {position && (
          <Marker position={position} >
            <Popup >{address}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;