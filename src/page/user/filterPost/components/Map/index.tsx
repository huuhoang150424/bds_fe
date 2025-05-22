import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMapEvents, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { stateData } from '@/constant/VietNam';
import L from 'leaflet';
import { useGetPostCountByLocation } from '../../hooks/use-get-post-count';

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

interface MapProps {
  onLocationChange?: (location: string) => void;
}

const MapEventHandler: React.FC<{
  onMapMove: (center: L.LatLng) => void;
  onMapClick: (e: L.LeafletMouseEvent) => void;
}> = ({ onMapMove, onMapClick }) => {
  const map = useMapEvents({
    moveend: () => {
      onMapMove(map.getCenter());
    },
    zoomend: () => {
      onMapMove(map.getCenter());
    },
    click: (e) => {
      onMapClick(e);
    },
    load: () => {
      onMapMove(map.getCenter());
    },
  });

  useEffect(() => {
    onMapMove(map.getCenter());
  }, [map, onMapMove]);

  return null;
};

const Map: React.FC<MapProps> = ({ onLocationChange }) => {
  const mapRef = useRef<L.Map | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{
    district: string;
    latlng: [number, number];
  }>({ district: 'Đang tải...', latlng: [21.0285, 105.8542] });
  const { data: postCounts, isLoading: isPostCountLoading } = useGetPostCountByLocation(currentLocation.district);
  const [markerData, setMarkerData] = useState<
    Array<{ address: string; postCount: number; coords: [number, number]; relevance?: number }>
  >([]);

  //console.log(postCounts)
  const createPostCountIcon = (count: number) => {
    return L.divIcon({
      className: 'custom-post-count-icon',
      html: `
        <div style="
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #3388ff;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 14px;
          border: 2px solid white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        ">
          ${count}
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });
  };

  const getCoordinatesFromAddress = useCallback(async (address: string): Promise<[number, number] | null> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&addressdetails=1&limit=1`,
        {
          headers: {
            'Accept-Language': 'vi',
            'User-Agent': 'YourApp/1.0',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data && data.length > 0) {
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      }
      return null;
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      return null;
    }
  }, []);

  const getDistrictFromCoordinates = useCallback(async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        {
          headers: {
            'Accept-Language': 'vi',
            'User-Agent': 'YourApp/1.0',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      let district = 'Không xác định';
      let street = '';

      if (data && data.address) {
        if (data.address.road) {
          street = data.address.road;
        }
        if (data.address.city_district) {
          district = data.address.city_district;
        } else if (data.address.district) {
          district = data.address.district;
        } else if (data.address.suburb) {
          district = data.address.suburb;
        } else if (data.address.town) {
          district = data.address.town;
        } else if (data.address.city) {
          district = data.address.city;
        }
      }

      return street ? `${street}, ${district}` : district;
    } catch (error) {
      console.error('Error fetching district:', error);
      return 'Không thể xác định quận/huyện';
    }
  }, []);

  useEffect(() => {
    if (!postCounts?.data || isPostCountLoading) return;

    const fetchMarkerData = async () => {
      const newMarkerData: Array<{
        address: string;
        postCount: number;
        coords: [number, number];
        relevance?: number;
      }> = [];

      for (const postCount of postCounts.data) {
        const coords = await getCoordinatesFromAddress(postCount.address);
        console.log("push")
        if (coords) {
          newMarkerData.push({
            address: postCount.address,
            postCount: postCount.postCount,
            coords,
            relevance: postCount.relevance,
          });
        }
      }

      setMarkerData(newMarkerData);
    };

    fetchMarkerData();
  }, [postCounts, isPostCountLoading, getCoordinatesFromAddress]);

  const vietnamStyle = () => ({
    fillColor: 'transparent',
    fillOpacity: 0,
    weight: 1,
    opacity: 0.7,
    color: '#666',
  });

  const onEachFeature = (feature: GeoJSONFeature, layer: L.Layer) => {
    layer.on({
      mouseover: (e: L.LeafletMouseEvent) => {
        const target = e.target as L.Path;
        target.setStyle({
          fillColor: 'transparent',
          fillOpacity: 0,
          weight: 2,
          opacity: 1,
          color: '#3388ff',
        });
      },
      mouseout: (e: L.LeafletMouseEvent) => {
        const target = e.target as L.Path;
        target.setStyle(vietnamStyle());
      },
      click: (e: L.LeafletMouseEvent) => {
        if (feature.properties && feature.properties.shape0) {
          handleProvinceClick(feature.properties.shape0, e.latlng);
        }
      },
    });

    if (feature.properties && feature.properties.shape0) {
      layer.bindPopup(feature.properties.shape0);
    }
  };

  const handleProvinceClick = async (provinceName: string, latlng: L.LatLng) => {
    const address = await getDistrictFromCoordinates(latlng.lat, latlng.lng);
    setCurrentLocation({
      district: address,
      latlng: [latlng.lat, latlng.lng],
    });
    onLocationChange?.(address);
  };

  const handleMapMove = useCallback(
    async (center: L.LatLng) => {
      const address = await getDistrictFromCoordinates(center.lat, center.lng);
      setCurrentLocation({
        district: address,
        latlng: [center.lat, center.lng],
      });
      onLocationChange?.(address);
    },
    [onLocationChange, getDistrictFromCoordinates]
  );

  const handleMapClick = useCallback(
    async (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      const address = await getDistrictFromCoordinates(lat, lng);
      setCurrentLocation({
        district: address,
        latlng: [lat, lng],
      });
      onLocationChange?.(address);
    },
    [onLocationChange, getDistrictFromCoordinates]
  );

  const throttledHandleMapMove = useCallback(
    (center: L.LatLng) => {
      if ((window as any).throttleTimeout) {
        clearTimeout((window as any).throttleTimeout);
      }
      (window as any).throttleTimeout = setTimeout(() => {
        handleMapMove(center);
      }, 1000);
    },
    [handleMapMove]
  );

  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);

  return (
    <div className="w-full rounded-[8px] overflow-hidden h-full">
      <div className="bg-white p-2 mb-2 rounded-lg border border-gray-200">
        <p className="text-sm">
          <span className="font-medium">Địa chỉ hiện tại:</span> {currentLocation.district}
        </p>
        {isPostCountLoading && <p className="text-sm text-gray-500">Đang tải số lượng bài đăng...</p>}
      </div>

      <MapContainer
        style={{ height: 'calc(100% - 60px)', width: '100%' }}
        center={[21.0285, 105.8542]}
        zoom={14}
        scrollWheelZoom={true}
        className="w-full h-full rounded-xl shadow-lg border border-gray-300"
        // whenCreated={(map) => {
        //   mapRef.current = map;
        // }}
      >
        <TileLayer
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>'
          url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=CfhZvpw3iyPMZQKMSTy1"
        />

        <GeoJSON data={stateData as GeoJSONData} style={vietnamStyle} onEachFeature={onEachFeature} />

        {markerData.map((marker, index) => (
          <Marker
            key={index}
            position={marker.coords}
            icon={createPostCountIcon(marker.postCount)}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{marker.address}</h3>
                <p>Số bài đăng: {marker.postCount}</p>
                {marker.relevance && <p>Độ liên quan: {marker.relevance}%</p>}
              </div>
            </Popup>
          </Marker>
        ))}

        <MapEventHandler onMapMove={throttledHandleMapMove} onMapClick={handleMapClick} />
      </MapContainer>
    </div>
  );
};

export default Map;