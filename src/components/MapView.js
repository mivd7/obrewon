import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet'
import LocationMarker from './LocationMarker';

const MapView = ({breweries}) => {
  const [currentLocation, setCurrentLocation] = useState({lat: 52.3389066, lng: 4.9415677});
  const [zoom, setZoom] = useState(16);
  
  return (<>
    {currentLocation && currentLocation.lat && 
      <MapContainer
        center={currentLocation}
        zoom={zoom}
        scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {currentLocation && currentLocation.lat && <LocationMarker markerPosition={currentLocation}/>}
      </MapContainer>}
      </>
    );
  }
export default MapView;