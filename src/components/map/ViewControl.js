export default function ViewControl({center, zoom}) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}