import React, { useEffect, useRef, useState } from 'react';
import { FeatureGroup, LayerGroup, LayersControl, MapContainer } from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux';

import ViewControl from './ViewControl';
import MapBackground from './MapBackground';
import RoutePlanner from './RoutePlanner';
import SearchBar from '../search/SearchBar';
import SetupWizard from '../wizard/SetupWizard';
import Brewery from '../locations/Brewery';
import LocationMarker from '../locations/LocationMarker';
import { setBreweries } from '../../actions/location';
import { getMapBounds } from '../../lib/calculator';
import Route from './Route';

const { Overlay } = LayersControl;

const MapView = ({ breweries }) => {
  const [mapBounds, setMapBounds] = useState([
    [53.044676, 5.9428943],
    [50.9819254, 4.4488786],
  ]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [wizardCompleted, setWizardCompleted] = useState(false);
  const [disableMapInteractions, setDisableMapInteractions] = useState(false)
  const dispatch = useDispatch();
  const location = useSelector(state => state.location);
  const geoJsonRef = useRef();

  useEffect(() => {
    if(!location.breweries) {
      //set breweries to store from breweries json, could be replaced by API call
      dispatch(setBreweries(breweries))
    }
  }, [dispatch, breweries, location.breweries]);

  useEffect(() => {
    if(location.searchResult && location.searchLocation) {
      setShowSearchResults(true); 
      const bounds = getMapBounds([{
        lat: location.searchLocation.lat,
        lng: location.searchLocation.lon
      }, {
        lat: location.searchResult.locationProperties.lat,
        lng: location.searchResult.locationProperties.lng
      }])
      setMapBounds(bounds);
    }
  }, [location]);

  useEffect(() => {
    if(!wizardCompleted) {
      setDisableMapInteractions(true);
    } else {
      setDisableMapInteractions(false);
    }
  }, [wizardCompleted])
  
  return (<>
     <MapContainer bounds={mapBounds} scrollWheelZoom={true}>
        {showSearchResults && location && location.searchResult ?
          <ViewControl center={{lat: location.searchResult.locationProperties.lat, lng: location.searchResult.locationProperties.lng }} zoom={14} bounds={mapBounds} disableMapInteractions={disableMapInteractions}/> : 
          <ViewControl zoom={14} /> }
        <LayersControl position="topright">
          <MapBackground/>
          <Overlay checked name="Search">
            <LayerGroup>
                <SearchBar location={location} geoJsonRef={geoJsonRef} onActive={() => setDisableMapInteractions(true)} onClose={() => setDisableMapInteractions(false)}/>
            </LayerGroup>
          </Overlay>
          <Overlay checked name="Tools">
            <LayerGroup>
              <RoutePlanner/>
            </LayerGroup>
            <LayerGroup>
              <SetupWizard showModal={true} closeWizard={() => setWizardCompleted(true)}/>
            </LayerGroup>
          </Overlay>
          <Overlay checked name="Markers" >
            <FeatureGroup>
              {breweries && breweries.map(brewery => <Brewery key={breweries.indexOf(brewery)} brewery={brewery}/>)}
              {location && location.searchLocation && <LocationMarker markerPosition={{lat: location.searchLocation.lat, lng: location.searchLocation.lon}}/>}
            </FeatureGroup>
            {wizardCompleted && 
              <Route/>}
          </Overlay>
        </LayersControl>
      </MapContainer>
      </>
    );
  }
export default MapView;