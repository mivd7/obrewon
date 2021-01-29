import { useEffect, useRef, useState } from 'react';
// import { useMapEvents } from 'react-leaflet';
import { Marker, Popup } from 'react-leaflet';
import { homeIcon, youAreHereIcon } from '../../lib/icons';

function LocationMarker({ markerPosition, geolocation }) {
  const markerRef = useRef(null);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    //watch position change of marker
    if(markerPosition) {
      setPosition([markerPosition.lat, markerPosition.lng])
    }
  }, [markerPosition])

  return position === null ? null : (
      <Marker ref={markerRef} position={position} icon={geolocation ? homeIcon : youAreHereIcon}>
        <Popup>
          You are here!
        </Popup>
      </Marker>
  )
}

export default LocationMarker;