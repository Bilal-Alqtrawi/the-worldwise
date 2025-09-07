import styles from "./Map.module.css";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "./Button";
import { toast } from "react-toastify";
import User from "../../src/components/User";
import FlagEmojiToPNG from "./FlagEmojiToPNG";

function Map({ cities }) {
  const [isLoadingPosition, setIsLoadingPosition] = useState(false);

  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [currentPosition, setCurrentPostion] = useState([]);

  const [searchParams] = useSearchParams();
  const mapLat = searchParams.get("lat") || 0;
  const mapLng = searchParams.get("lng") || 0;

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  function getPosition() {
    if (!navigator.geolocation) {
      toast.error("Your browser does not support geolocation.");
      return;
    }
    setIsLoadingPosition(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setMapPosition([position.coords.latitude, position.coords.longitude]);
        setCurrentPostion([
          position.coords.latitude,
          position.coords.longitude,
        ]);
        setIsLoadingPosition(false);
      },
      (error) => {
        console.error(error.message);
        setIsLoadingPosition(false);
      }
    );
  }

  return (
    <div className={styles.mapContainer}>
      <User />

      <Button type="position" onClick={getPosition}>
        {isLoadingPosition ? "Loading..." : "Use your position"}
      </Button>

      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {
          // Just need who contains postion to mark it
          cities
            ?.filter((city) => city?.position)
            .map((city) => (
              <Marker
                key={city.id}
                position={[city.position?.lat, city.position.lng]}
              >
                <Popup>
                  {city?.emoji && (
                    // <span>{city?.emoji}</span>
                    <span>
                      <FlagEmojiToPNG flag={city.emoji} />
                    </span>
                  )}
                  <span>{city?.cityName}</span>
                </Popup>
              </Marker>
            ))
        }
        {currentPosition.length > 0 && (
          <Marker position={currentPosition}>
            <Popup>You are here</Popup>
          </Marker>
        )}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

// This way how it works to change postion
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
