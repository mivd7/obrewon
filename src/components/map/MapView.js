import React, { useEffect, useRef, useState } from 'react';
import { FeatureGroup, LayerGroup, LayersControl, MapContainer } from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux';

import ViewControl from './ViewControl';
import SearchBar from '../search/SearchBar';
import Brewery from '../locations/Brewery';
import LocationMarker from '../locations/LocationMarker';
import {setBreweries} from '../../actions/brewery';
import MapBackground from './MapBackground';
import { getSearchMapBounds } from '../../lib/calculator';
const { Overlay } = LayersControl;

const MapView = ({breweries}) => {
  const [currentLocation] = useState({lat: 52.3727598, lng: 4.8936041});
  const [zoom] = useState(14);
  const [mapBounds, setMapBounds] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const markerGroupRef = useRef();
  const dispatch = useDispatch();
  const breweryStore = useSelector(state => state.brewery);

  useEffect(() => {
    
  }, [])

  useEffect(() => {
    dispatch(setBreweries(breweries))
  }, [dispatch, breweries]);

  useEffect(() => {
    if(breweryStore.searchResult) {
      setShowSearchResults(true); 
      const bounds = getSearchMapBounds({
        lat: breweryStore.searchLocation.lat,
        lng: breweryStore.searchLocation.lon
      }, {
        lat: breweryStore.searchResult.locationProperties.lat,
        lng: breweryStore.searchResult.locationProperties.lng
      })
      setMapBounds(bounds);
    }
  }, [breweryStore]);

  return (<>
    {currentLocation && currentLocation.lat &&
      <MapContainer
        center={currentLocation}
        zoom={zoom}
        bounds={markerGroupRef.current ? markerGroupRef.current.getBounds() : null}
        scrollWheelZoom={true}>
        {showSearchResults ? 
          <ViewControl center={{lat: breweryStore.searchResult.locationProperties.lat, lng: breweryStore.searchResult.locationProperties.lng }} zoom={zoom} bounds={mapBounds}/> : 
          <ViewControl center={currentLocation} zoom={zoom}  /> }
        <LayersControl position="topright">
          <MapBackground/>
          <Overlay checked name="Search">
            <LayerGroup>
                <SearchBar/>
            </LayerGroup>
          </Overlay>
          <Overlay checked name="Markers">
            <FeatureGroup ref={markerGroupRef}>
              {breweries && breweries.map(brewery => <Brewery key={breweries.indexOf(brewery)} brewery={brewery}/>)}
            </FeatureGroup>
            <FeatureGroup >
               {breweryStore && breweryStore.searchLocation &&  <LocationMarker markerPosition={{lat: breweryStore.searchLocation.lat, lng: breweryStore.searchLocation.lon}}/>}
            </FeatureGroup>
          </Overlay>
        </LayersControl>
      </MapContainer>}
      </>
    );
  }
export default MapView;