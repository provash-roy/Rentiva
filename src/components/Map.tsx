"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

interface DefaultIconPrototype {
  _getIconUrl?: string;
}

// Fix Leaflet icon issue in Next.js
delete (L.Icon.Default.prototype as DefaultIconPrototype)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL(
    "leaflet/dist/images/marker-icon-2x.png",
    import.meta.url,
  ).toString(),
  iconUrl: new URL(
    "leaflet/dist/images/marker-icon.png",
    import.meta.url,
  ).toString(),
  shadowUrl: new URL(
    "leaflet/dist/images/marker-shadow.png",
    import.meta.url,
  ).toString(),
});

interface MapProps {
  position: [number, number];
  zoom?: number;
  popupText?: string;
}

export default function Map({ position, zoom = 4, popupText }: MapProps) {
  return (
    <MapContainer
      center={position}
      zoom={zoom}
      style={{ height: "350px", width: "100%" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={position}>
        <Popup>
          <div className="text-center">
            <h3 className="font-semibold">{popupText}</h3>
            <p className="text-xs text-gray-500">Selected Location</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
