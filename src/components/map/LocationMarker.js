import { useEffect, useRef, useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

L.Icon.Default.imagePath='img/'

function LocationMarker({ markerPosition, brewery, closest }) {
  const markerRef = useRef(null);
  const [position, setPosition] = useState([markerPosition.lat, markerPosition.lng]);

  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  useEffect(() => {
    if(closest) {
      markerRef.current.openPopup();
    }
  }, [closest]);

  return position === null ? null : (
    <Marker ref={markerRef} position={position} popupOpen={closest}>
      {brewery && 
      <Popup>
        <h1>{brewery.name}</h1>
        <p>{brewery.zipcode}</p>
        <p>{brewery.address}</p>
      </Popup>}
      {!brewery && 
        <Popup>
          You are here
        </Popup>}
    </Marker>
  )
}

export default LocationMarker;