import { useEffect, useRef, useState } from 'react';
// import { useMapEvents } from 'react-leaflet';
import { Marker, Popup } from 'react-leaflet';
import { youAreHereIcon } from '../../lib/icons';

function LocationMarker({ markerPosition }) {
  const markerRef = useRef(null);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    //watch position change of marker
    setPosition([markerPosition.lat, markerPosition.lng])
  }, [markerPosition])

  return position === null ? null : (
      <Marker ref={markerRef} position={position} icon={youAreHereIcon}>
        <Popup>
          You are here!
        </Popup>
      </Marker>
  )
}

export default LocationMarker;