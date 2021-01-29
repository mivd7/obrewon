import React, { useEffect, useState } from 'react';
import { FeatureGroup, LayerGroup, LayersControl, MapContainer } from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux';

import ViewControl from './ViewControl';
import SearchBar from '../search/SearchBar';
import Brewery from '../locations/Brewery';
import LocationMarker from '../locations/LocationMarker';
import {setBreweries} from '../../actions/brewery';
import MapBackground from './MapBackground';
import { getMapBounds } from '../../lib/calculator';
const { Overlay } = LayersControl;

const MapView = ({breweries, userLocation}) => {
  const [mapBounds, setMapBounds] = useState([
    [53.044676, 5.9428943],
    [50.9819254, 4.4488786],
  ]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [markerGroupRef, setMarkerGroupRef] = useState(null);
  const dispatch = useDispatch();
  const breweryStore = useSelector(state => state.brewery);
  const user = useSelector(state => state.user);

  useEffect(() => {
    if(markerGroupRef) {
      setMapBounds(markerGroupRef.getBounds())
    }
  }, [markerGroupRef])

  useEffect(() => {
    dispatch(setBreweries(breweries))
  }, [dispatch, breweries]);

  useEffect(() => {
    if(breweryStore.searchResult) {
      setShowSearchResults(true); 
      const bounds = getMapBounds([{
        lat: breweryStore.searchLocation.lat,
        lng: breweryStore.searchLocation.lon
      }, {
        lat: breweryStore.searchResult.locationProperties.lat,
        lng: breweryStore.searchResult.locationProperties.lng
      }])
      setMapBounds(bounds);
    }
  }, [breweryStore]);

  return (<>
     <MapContainer bounds={mapBounds} scrollWheelZoom={true}>
        {showSearchResults ? 
          <ViewControl center={{lat: breweryStore.searchResult.locationProperties.lat, lng: breweryStore.searchResult.locationProperties.lng }} zoom={14} bounds={mapBounds}/> : 
          <ViewControl zoom={14} /> }
        <LayersControl position="topright">
          <MapBackground/>
          <Overlay checked name="Search">
            <LayerGroup>
                <SearchBar/>
            </LayerGroup>
          </Overlay>
          <Overlay checked name="Markers" >
            <FeatureGroup ref={ref => setMarkerGroupRef(ref)}>
              {breweries && breweries.map(brewery => <Brewery key={breweries.indexOf(brewery)} brewery={brewery}/>)}
              {breweryStore && breweryStore.searchLocation &&  <LocationMarker markerPosition={{lat: breweryStore.searchLocation.lat, lng: breweryStore.searchLocation.lon}}/>}
              {user &&  user.geolocation && !user.locationLoading && !user.locationError &&  <LocationMarker markerPosition={user.geolocation.coords} geolocation={user.geolocation}/>}
            </FeatureGroup>
          </Overlay>
        </LayersControl>
      </MapContainer>
      </>
    );
  }
export default MapView;