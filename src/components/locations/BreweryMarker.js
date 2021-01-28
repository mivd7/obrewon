import { useCallback, useEffect, useRef, useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

L.Icon.Default.imagePath='img/'

function BreweryMarker({ markerPosition, brewery, closest }) {
  const markerRef = useRef(null);
  const [position, setPosition] = useState(null);
  
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  function openPopup(closest) {
    if(closest) {
      markerRef.current.openPopup();
    }
  }

  useCallback(
    openPopup(closest)
  , [closest]);

  useEffect(() => {
    //watch position change of marker
    setPosition([markerPosition.lat, markerPosition.lng])
  }, [markerPosition])

  return position === null ? null : (<>
      <Marker ref={markerRef} position={position} popupOpen={closest}>
        <Popup>
          {brewery.name}
        </Popup>
      </Marker>
  </>)
}

export default BreweryMarker;