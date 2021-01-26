import React, { useEffect, useState } from 'react';
import { LayerGroup, LayersControl, MapContainer, TileLayer } from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../search/SearchBar';
import Brewery from './Brewery';
import LocationMarker from './LocationMarker';
import {setBreweries} from '../../actions/brewery';
import SearchResultModal from '../search/SearchResults';

const MapView = ({breweries}) => {
  const [currentLocation, setCurrentLocation] = useState({lat: 52.3389066, lng: 4.9415677});
  const [zoom, setZoom] = useState(16);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const dispatch = useDispatch();
  const breweryStore = useSelector(state => state.brewery);

  useEffect(() => {
    dispatch(setBreweries(breweries))
  }, [])

  useEffect(() => {
    if(breweryStore.closest) {
      console.log('brewery store has closest property', breweryStore.closest);
      setShowSearchResults(true);
    }
  }, [breweryStore])

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
          <LayersControl.Overlay checked name="Search">
            <LayerGroup>
                <SearchBar/>
                <SearchResultModal showModal={showSearchResults} setShowModal={setShowSearchResults} result={breweryStore.closest}/>
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Breweries">
            <LayerGroup>
              {breweries && breweries.map(brewery => <Brewery key={breweries.indexOf(brewery)} brewery={brewery}/>)}
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
        {currentLocation && currentLocation.lat && <LocationMarker markerPosition={currentLocation}/>}
      </MapContainer>}
      </>
    );
  }
export default MapView;