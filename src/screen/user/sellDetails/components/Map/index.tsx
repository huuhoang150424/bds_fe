import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Map() {
  // Danh sách các tỉnh/thành phố và khu vực con
  const locations = [
    {
      province: "Hà Nội",
      districts: [
        { id: 1, name: "Hoàn Kiếm", position: [21.0285, 105.8542] as [number, number] },
        { id: 2, name: "Ba Đình", position: [21.034, 105.814] as [number, number] },
        { id: 3, name: "Tây Hồ", position: [21.0685, 105.8206] as [number, number] },
      ],
    },
    {
      province: "Hồ Chí Minh",
      districts: [
        { id: 4, name: "Quận 1", position: [10.7769, 106.7009] as [number, number] },
        { id: 5, name: "Quận 3", position: [10.7772, 106.6956] as [number, number] },
        { id: 6, name: "Quận 7", position: [10.7351, 106.7219] as [number, number] },
      ],
    },
  ];

  return (
    <div className="w-full h-[100vh]">
      <MapContainer
        style={{ height: "100vh", width: "full" }}
        center={[21.0285, 105.8542]} // Trung tâm Việt Nam
        zoom={7}
        scrollWheelZoom={true}
        className="w-full h-[500px] rounded-xl shadow-lg border border-gray-300"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Hiển thị Marker cho từng quận/huyện trong từng tỉnh */}
        {locations.map((location) =>
          location.districts.map((district) => (
            <Marker key={district.id} position={district.position}>
              <Popup>
                <span className="text-blue-500 font-semibold">{district.name}</span>
                <br />
                <span className="text-gray-700">({location.province})</span>
              </Popup>
            </Marker>
          ))
        )}
      </MapContainer>
    </div>
  );
}

export default Map;
