import React, { useEffect, useState } from 'react';
import { FeatureGroup, LayerGroup, LayersControl, MapContainer } from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux';

import ViewControl from './ViewControl';
import MapBackground from './MapBackground';
import Help from './Help';
import SearchBar from '../forms/SearchBar';
import SetupWizard from '../forms/SetupWizard';
import Brewery from '../locations/Brewery';
import LocationMarker from '../locations/LocationMarker';
import {setBreweries} from '../../actions/location';
import { getMapBounds } from '../../lib/calculator';

const { Overlay } = LayersControl;

const MapView = ({ breweries }) => {
  const [mapBounds, setMapBounds] = useState([
    [53.044676, 5.9428943],
    [50.9819254, 4.4488786],
  ]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [markerGroupRef, setMarkerGroupRef] = useState(null);
  const dispatch = useDispatch();
  const locator = useSelector(state => state.location);
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
    if(locator.searchResult) {
      setShowSearchResults(true); 
      const bounds = getMapBounds([{
        lat: locator.searchLocation.lat,
        lng: locator.searchLocation.lon
      }, {
        lat: locator.searchResult.locationProperties.lat,
        lng: locator.searchResult.locationProperties.lng
      }])
      setMapBounds(bounds);
    }
  }, [locator]);

  return (<>
     <MapContainer bounds={mapBounds} scrollWheelZoom={true}>
        {showSearchResults ? 
          <ViewControl center={{lat: locator.searchResult.locationProperties.lat, lng: locator.searchResult.locationProperties.lng }} zoom={14} bounds={mapBounds}/> : 
          <ViewControl zoom={14} /> }
        <LayersControl position="topright">
          <MapBackground/>
          <Overlay checked name="Search">
            <LayerGroup>
                <SearchBar/>
            </LayerGroup>
          </Overlay>
          <Overlay checked name="Tools">
            <LayerGroup>
              <Help/>
            </LayerGroup>
            <LayerGroup>
              <SetupWizard showModal={true} />
            </LayerGroup>
          </Overlay>
          <Overlay checked name="Markers" >
            <FeatureGroup ref={ref => setMarkerGroupRef(ref)}>
              {breweries && breweries.map(brewery => <Brewery key={breweries.indexOf(brewery)} brewery={brewery}/>)}
              {locator && locator.searchLocation &&  <LocationMarker markerPosition={{lat: locator.searchLocation.lat, lng: locator.searchLocation.lon}}/>}
              {user &&  user.geolocation && !user.locationLoading && <LocationMarker markerPosition={user.geolocation.coords} geolocation={user.geolocation}/>}
            </FeatureGroup>
          </Overlay>
        </LayersControl>
      </MapContainer>
      </>
    );
  }
export default MapView;