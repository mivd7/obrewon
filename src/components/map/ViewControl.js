import { useMap } from "react-leaflet";
import L from 'leaflet';

export default function ViewControl({center, zoom, bounds}) {
  const map = useMap();
  if(bounds) {
    const southWest = new L.LatLng(bounds.southernmost.lat, bounds.southernmost.lng)
    const northEast = new L.LatLng(bounds.northernmost.lat, bounds.northernmost.lng)
    const searchBounds = new L.LatLngBounds(southWest, northEast);
    map.flyToBounds(searchBounds);
  }
  return null;
}