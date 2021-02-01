import { useEffect, useRef, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { beerIcon, animatedBeerIcon } from '../map/icons';

function BreweryMarker({ markerPosition, brewery, closest }) {
  const markerRef = useRef(null);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    setPosition([markerPosition.lat, markerPosition.lng])
  }, [markerPosition])

  return position === null ? null : (<>
      <Marker 
        ref={markerRef} 
        position={position} 
        icon={closest ? animatedBeerIcon : beerIcon}
        eventHandlers={{
          click: () => {
            markerRef.current.setIcon(beerIcon)
          },
        }}>
        <Popup>
          {brewery.name}
        </Popup>
      </Marker>
  </>)
}

export default BreweryMarker;