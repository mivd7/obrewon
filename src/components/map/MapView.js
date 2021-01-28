import React, { useEffect, useState } from 'react';
import { LayerGroup, LayersControl, MapContainer, TileLayer } from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux';

import ViewControl from './ViewControl';
import SearchBar from '../search/SearchBar';
import Brewery from '../locations/Brewery';
import LocationMarker from './LocationMarker';

import {setBreweries} from '../../actions/brewery';
// import SearchResultModal from '../search/SearchResults';

const MapView = ({breweries}) => {
  const [currentLocation, setCurrentLocation] = useState({lat: 52.3727598, lng: 4.8936041});
  const [zoom, setZoom] = useState(14);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const dispatch = useDispatch();
  const breweryStore = useSelector(state => state.brewery);
  const outerBounds = [
    [50.505, -29.09],
    [52.505, 29.09],
  ]
  
  useEffect(() => {
    dispatch(setBreweries(breweries))
  }, [dispatch, breweries]);

  useEffect(() => {
    if(breweryStore.searchResult) {
      setShowSearchResults(true);
    }
  }, [breweryStore]);

  return (<>
    {currentLocation && currentLocation.lat && 
      <MapContainer
        bounds={outerBounds}
        center={currentLocation}
        zoom={zoom}
        scrollWheelZoom={true}>
        {showSearchResults ? 
          <ViewControl center={{lat: breweryStore.searchResult.locationProperties.lat, lng: breweryStore.searchResult.locationProperties.lng }} zoom={zoom} outerBounds={outerBounds}/> : 
          <ViewControl center={currentLocation} zoom={zoom} outerBounds={outerBounds}/> }
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
            </LayerGroup>
            {/* <SearchResultModal showModal={showSearchResults} onShowModal={onShowModal} result={breweryStore.searchResult}/> */}
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Breweries">
            <LayerGroup>
              {breweries && breweries.map(brewery => <Brewery key={breweries.indexOf(brewery)} brewery={brewery}/>)}
            </LayerGroup>
          </LayersControl.Overlay>
          {breweryStore && breweryStore.searchLocation && <LayersControl.Overlay checked name="Input Location">
            <LayerGroup>
              <LocationMarker markerPosition={{lat: breweryStore.searchLocation.lat, lng: breweryStore.searchLocation.lon}}/>
            </LayerGroup>
          </LayersControl.Overlay>}
        </LayersControl>
      </MapContainer>}
      </>
    );
  }
export default MapView;