import { useSearchParams } from "react-router-dom";

function useUrlPosition() {
  const [searchParams] = useSearchParams();
  const mapLat = searchParams.get("lat") || 0;
  const mapLng = searchParams.get("lng") || 0;

  return [mapLat, mapLng];
}

export default useUrlPosition;
