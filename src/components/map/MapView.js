import React, { useEffect, useRef, useState } from 'react';
import { FeatureGroup, LayerGroup, LayersControl, MapContainer } from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux';

import ViewControl from './ViewControl';
import MapBackground from './MapBackground';
import Help from './Help';
import SearchBar from '../forms/SearchBar';
import SetupWizard from '../forms/wizard/SetupWizard';
import Brewery from '../locations/Brewery';
import LocationMarker from '../locations/LocationMarker';
import { getRoute, setBreweries } from '../../actions/location';
import { getMapBounds } from '../../lib/calculator';
import Route from './Route';

const { Overlay } = LayersControl;

const MapView = ({ breweries }) => {
  const [mapBounds, setMapBounds] = useState([
    [53.044676, 5.9428943],
    [50.9819254, 4.4488786],
  ]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [disableMapInteractions, setDisableMapInteractions] = useState(false);
  const [markerGroupRef, setMarkerGroupRef] = useState(null);
  const dispatch = useDispatch();
  const locator = useSelector(state => state.location);

  const toggleMapInteractions = (active) => {
    setDisableMapInteractions(active)
  }

  useEffect(() => {
    if(markerGroupRef) {
      setMapBounds(markerGroupRef.getBounds())
    }
  }, [markerGroupRef])

  useEffect(() => {
    if(!locator.breweries) {
      dispatch(setBreweries(breweries))
    }
  }, [dispatch, breweries, locator.breweries]);

  useEffect(() => {
    if(locator.searchResult && locator.searchLocation) {
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
        {showSearchResults && locator && locator.searchResult ?
          <ViewControl center={{lat: locator.searchResult.locationProperties.lat, lng: locator.searchResult.locationProperties.lng }} zoom={14} bounds={mapBounds}/> : 
          <ViewControl zoom={14} /> }
        <LayersControl position="topright">
          <MapBackground/>
          <Overlay checked name="Search">
            <LayerGroup>
                <SearchBar locator={locator} onSearchBarActive={toggleMapInteractions}/>
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
              {locator && locator.searchLocation && <LocationMarker markerPosition={{lat: locator.searchLocation.lat, lng: locator.searchLocation.lon}}/>}
            </FeatureGroup>
            <Route/>              
          </Overlay>
        </LayersControl>
      </MapContainer>
      </>
    );
  }
export default MapView;