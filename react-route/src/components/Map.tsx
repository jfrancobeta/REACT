import { useNavigate, useSearchParams } from "react-router-dom";
import style from "./Map.module.css";

export default function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={style.mapContainer} onClick={() => navigate("form")}>
      <h1>
        Map for lat: {lat}, lng: {lng}
      </h1>
      <button
        onClick={() => setSearchParams({ lat: "40.7128", lng: "-74.0060" })}
      >
        Change pos
      </button>
    </div>
  );
}
