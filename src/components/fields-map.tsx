'use client';

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { MapPin, Navigation, ZoomIn, ZoomOut, Target } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// ==================== TYPES ====================
type FieldLocation = {
  id: number;
  field_name: string;
  crop_type: string;
  area_hectares: number;
  latitude: number;
  longitude: number;
  moisture?: number;
  status?: 'optimal' | 'warning' | 'critical';
};

type MapViewProps = {
  center: [number, number];
  zoom: number;
};

// ==================== MAP CONTROLS ====================
function MapView({ center, zoom }: MapViewProps) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  
  return null;
}

function MapControls({ 
  onLocate,
  onZoomIn,
  onZoomOut 
}: { 
  onLocate: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
}) {
  return (
    <div className="absolute bottom-4 right-4 z-[1000] flex flex-col gap-2">
      <button
        onClick={onLocate}
        className="grid h-10 w-10 place-items-center rounded-lg bg-white text-gray-700 shadow-lg hover:bg-gray-50"
        title="Мое местоположение"
      >
        <Target className="h-5 w-5" />
      </button>
      <button
        onClick={onZoomIn}
        className="grid h-10 w-10 place-items-center rounded-lg bg-white text-gray-700 shadow-lg hover:bg-gray-50"
        title="Приблизить"
      >
        <ZoomIn className="h-5 w-5" />
      </button>
      <button
        onClick={onZoomOut}
        className="grid h-10 w-10 place-items-center rounded-lg bg-white text-gray-700 shadow-lg hover:bg-gray-50"
        title="Отдалить"
      >
        <ZoomOut className="h-5 w-5" />
      </button>
    </div>
  );
}

// ==================== CUSTOM MARKER ICON ====================
function createMarkerIcon(status: 'optimal' | 'warning' | 'critical' = 'optimal') {
  const colors = {
    optimal: '#10b981',    // green
    warning: '#f59e0b',    // amber
    critical: '#ef4444',   // red
  };
  
  const color = colors[status];
  
  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 24px;
        height: 24px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      "></div>
    `,
    className: 'custom-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  });
}

// ==================== MAIN COMPONENT ====================
interface FieldsMapProps {
  fields: FieldLocation[];
  center?: [number, number];
  zoom?: number;
  onFieldClick?: (field: FieldLocation) => void;
  height?: string;
  showControls?: boolean;
}

export default function FieldsMap({
  fields,
  center = [41.3115, 69.2401], // Tashkent by default
  zoom = 8,
  onFieldClick,
  height = 'h-[600px]',
  showControls = true,
}: FieldsMapProps) {
  const [mapCenter, setMapCenter] = useState<[number, number]>(center);
  const [mapZoom, setMapZoom] = useState(zoom);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  // Handle user location
  const handleLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc: [number, number] = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          setUserLocation(loc);
          setMapCenter(loc);
          setMapZoom(12);
        },
        () => {
          alert('Не удалось получить местоположение');
        }
      );
    } else {
      alert('Геолокация не поддерживается');
    }
  };

  const handleZoomIn = () => setMapZoom((z) => Math.min(z + 1, 18));
  const handleZoomOut = () => setMapZoom((z) => Math.max(z - 1, 3));

  // Status determination
  const getStatus = (moisture?: number): 'optimal' | 'warning' | 'critical' => {
    if (moisture === undefined) return 'warning';
    if (moisture >= 25) return 'optimal';
    if (moisture >= 15) return 'warning';
    return 'critical';
  };

  return (
    <div className={cn('relative rounded-2xl overflow-hidden', height)}>
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        scrollWheelZoom={true}
        className={cn('h-full w-full', 'leaflet-container-custom')}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Field markers */}
        {fields.map((field) => (
          <Marker
            key={field.id}
            position={[field.latitude, field.longitude]}
            icon={createMarkerIcon(getStatus(field.moisture))}
            eventHandlers={{
              click: () => onFieldClick?.(field),
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-semibold text-gray-900">{field.field_name}</h3>
                <p className="text-sm text-gray-600">{field.crop_type}</p>
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <span className="text-gray-500">Площадь:</span>
                  <span className="font-medium">{field.area_hectares} га</span>
                </div>
                {field.moisture !== undefined && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-gray-500">Влажность:</span>
                    <span className={cn(
                      'font-medium px-2 py-0.5 rounded',
                      getStatus(field.moisture) === 'optimal' && 'bg-emerald-100 text-emerald-800',
                      getStatus(field.moisture) === 'warning' && 'bg-amber-100 text-amber-800',
                      getStatus(field.moisture) === 'critical' && 'bg-red-100 text-red-800',
                    )}>
                      {field.moisture}%
                    </span>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* User location marker */}
        {userLocation && (
          <Marker
            position={userLocation}
            icon={L.divIcon({
              html: `
                <div style="
                  background-color: #3b82f6;
                  width: 16px;
                  height: 16px;
                  border-radius: 50%;
                  border: 3px solid white;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                  animation: pulse 2s infinite;
                "></div>
              `,
              className: 'user-location-marker',
              iconSize: [16, 16],
              iconAnchor: [8, 8],
            })}
          >
            <Popup>Ваше местоположение</Popup>
          </Marker>
        )}

        <MapView center={mapCenter} zoom={mapZoom} />
      </MapContainer>

      {/* Controls */}
      {showControls && (
        <MapControls
          onLocate={handleLocate}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
        />
      )}

      {/* Legend */}
      <div className="absolute top-4 left-4 z-[1000] bg-white rounded-lg p-3 shadow-lg">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Статус полей</h4>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-xs text-gray-600">Оптимально</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-xs text-gray-600">Внимание</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs text-gray-600">Критично</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="absolute top-4 right-4 z-[1000] bg-white rounded-lg p-3 shadow-lg">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-gray-600" />
          <span className="font-medium">{fields.length} полей</span>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}
