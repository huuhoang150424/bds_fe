import React from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { stateData } from '@/constant/VietNam';

// Định nghĩa kiểu cho dữ liệu GeoJSON
interface GeoJSONFeature {
  type: 'Feature';
  properties: {
    shape0: string;
    shapeiso: string;
    shapeid: string;
    shapegroup: string;
    shapetype: string;
  };
  geometry: {
    type: 'MultiPolygon';
    coordinates: [number, number][][][];
  };
}

interface GeoJSONData {
  type: 'FeatureCollection';
  name: string;
  crs: {
    type: string;
    properties: { name: string };
  };
  features: GeoJSONFeature[];
}

// Định nghĩa kiểu cho locations
interface District {
  id: number;
  name: string;
  position: [number, number];
  image: string;
}

interface Location {
  province: string;
  districts: District[];
}

const Map: React.FC = () => {
  const locations: Location[] = [
    {
      province: 'Hà Nội',
      districts: [
        {
          id: 1,
          name: 'Hoàn Kiếm',
          position: [21.0285, 105.8542],
          image : 'https://th.bing.com/th/id/R.550bd18d4d91f471bf0c1a7b9b419719?rik=Tk4alSOKWiwfAw&pid=ImgRaw&r=0',
        },
        {
          id: 2,
          name: 'Ba Đình',
          position: [21.034, 105.814],
          image : 'https://th.bing.com/th/id/R.550bd18d4d91f471bf0c1a7b9b419719?rik=Tk4alSOKWiwfAw&pid=ImgRaw&r=0',
        },
        {
          id: 3,
          name: 'Tây Hồ',
          position: [21.0685, 105.8206],
          image :'https://th.bing.com/th/id/R.550bd18d4d91f471bf0c1a7b9b419719?rik=Tk4alSOKWiwfAw&pid=ImgRaw&r=0',
        },
      ],
    },
    {
      province: 'Hồ Chí Minh',
      districts: [
        {
          id: 4,
          name: 'Quận 1',
          position: [10.7769, 106.7009],
          image : 'https://th.bing.com/th/id/R.550bd18d4d91f471bf0c1a7b9b419719?rik=Tk4alSOKWiwfAw&pid=ImgRaw&r=0',
        },
        {
          id: 5,
          name: 'Quận 3',
          position: [10.7772, 106.6956],
          image : 'https://th.bing.com/th/id/R.550bd18d4d91f471bf0c1a7b9b419719?rik=Tk4alSOKWiwfAw&pid=ImgRaw&r=0',
        },
        {
          id: 6,
          name: 'Quận 7',
          position: [10.7351, 106.7219],
          image : 'https://th.bing.com/th/id/R.550bd18d4d91f471bf0c1a7b9b419719?rik=Tk4alSOKWiwfAw&pid=ImgRaw&r=0',
        },
      ],
    },
  ];

  // Hàm style cho GeoJSON
  const vietnamStyle = (feature: GeoJSONFeature) => {
    return {
      fillColor: '#FD8D3C',
      fillOpacity: 0.7,
      weight: 2,
      opacity: 1,
      dashArray: '3',
      color: 'white',
    };
  };

  // Hàm xử lý sự kiện tương tác
  const onEachFeature = (feature: GeoJSONFeature, layer: L.Layer) => {
    layer.on({
      mouseover: (e: L.LeafletMouseEvent) => {
        const target = e.target as L.Path;
        const style = vietnamStyle(feature);
       
        target.setStyle({
          fillColor: style.fillColor, 
          fillOpacity: 0.7,
          weight: 3,
          opacity: 1,
          dashArray: '3',
          color: '#666', 
        });
      },
      mouseout: (e: L.LeafletMouseEvent) => {
        const target = e.target as L.Path;
        target.setStyle(vietnamStyle(feature)); // Sử dụng vietnamStyle để đảm bảo kiểu nhất quán
      },
      click: (e: L.LeafletMouseEvent) => {
        const target = e.target as L.Path;
        // target._map.fitBounds(target.getBounds()); // Đã comment theo yêu cầu
      },
    });

    if (feature.properties && feature.properties.shape0) {
      layer.bindPopup(feature.properties.shape0);
    }
  };

  return (
    <div className='w-full h-[100vh]'>
      <MapContainer
        style={{ height: '100vh', width: '100%' }}
        center={[16.0, 108.0]} // Trung tâm Việt Nam
        zoom={6} // Zoom để thấy toàn Việt Nam
        scrollWheelZoom={true}
        className='w-[100%] h-[500px] rounded-xl shadow-lg border border-gray-300'
      >
        <TileLayer
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>'
          url='https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=CfhZvpw3iyPMZQKMSTy1'
        />

        <GeoJSON
          data={stateData as GeoJSONData}
          // style={vietnamStyle}
          onEachFeature={onEachFeature}
        />

        {locations.map((location) =>
          location.districts.map((district) => (
            <Marker key={district.id} position={district.position}>
              <Popup className='w-[250px]'>
                <img src={district.image} alt="ảnh"  />
                <span className='text-blue-500 font-semibold'>{district.name}</span>
                <br />
                <span className='text-gray-700'>({location.province})</span>
              </Popup>
            </Marker>
          )),
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
