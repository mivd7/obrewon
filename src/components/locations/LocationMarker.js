import { useEffect, useRef, useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import pointingDown from '../../assets/you-are-here-marker.svg';

L.Icon.Default.imagePath='img/'

const pointingDownIcon = new L.Icon({
    iconUrl: pointingDown,
    iconRetinaUrl: pointingDown,
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [1,-15],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    className: 'leaflet-div-icon'
});

function LocationMarker({ markerPosition }) {
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

  useEffect(() => {
    //watch position change of marker
    setPosition([markerPosition.lat, markerPosition.lng])
  }, [markerPosition])

  return position === null ? null : (
      <Marker ref={markerRef} position={position} icon={pointingDownIcon}>
        <Popup>
          You are here!
        </Popup>
      </Marker>
  )
}

export default LocationMarker;