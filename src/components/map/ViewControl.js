import { useMap } from "react-leaflet";

export default function ViewControl({center, zoom, outerBounds}) {
  const map = useMap();
  map.flyTo(center, zoom);
  // map.fitBounds(outerBounds)
  return null;
}