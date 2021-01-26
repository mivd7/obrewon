import { useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

L.Icon.Default.imagePath='img/'

function LocationMarker({ markerPosition }) {
  const [position, setPosition] = useState([markerPosition.lat, markerPosition.lng])
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here!</Popup>
    </Marker>
  )
}

export default LocationMarker;