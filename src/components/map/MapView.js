import React, { useState } from 'react';
import { LayerGroup, LayersControl, MapContainer, TileLayer } from 'react-leaflet'
import Search from '../forms/Search';
import Brewery from './Brewery';
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
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.Overlay checked name="Layer group with circles">
            <LayerGroup>
                <Search/>
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
        {currentLocation && currentLocation.lat && <LocationMarker markerPosition={currentLocation}/>}
        {breweries && breweries.map(brewery => <Brewery brewery={brewery}/>)}
      </MapContainer>}
      </>
    );
  }
export default MapView;