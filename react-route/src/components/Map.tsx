import { useNavigate, useSearchParams } from "react-router-dom";
import style from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../context/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";

export default function Map() {
  const navigate = useNavigate();
  const { cities } = useCities();

  const [mapPosition, setMapPosition] = useState([51.505, -0.09]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoading, position, error, getPosition } = useGeolocation();

  const lat = Number(searchParams.get("lat")) || 51.505;
  const lng = Number(searchParams.get("lng")) || -0.09;


  useEffect(() => {
  if (position) {
    setSearchParams({ lat: String(position.lat), lng: String(position.lng) });
  }
}, [position, setSearchParams]);

  return (
    <div className={style.mapContainer}>
      <Button type="position" onClick={getPosition}>
        {isLoading ? "Loading..." : "Get Position"}
      </Button>
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={false}
        className={style.map}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>
                {city.emoji} {city.cityName}
              </span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={{ lat, lng }} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({
  position,
}: {
  position: { lat: number; lng: number };
}) {
  const map = useMap();
  map.setView([position.lat, position.lng]);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}
