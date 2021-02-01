import { GeoJSON, LayerGroup, useMap } from 'react-leaflet'
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRoute } from '../../actions/location';


const Route = () => {
  const map = useMap();
  const routeLayerRef = useRef();
  // const geoJsonRef = useRef();
  const dispatch = useDispatch();
  const locator = useSelector(state => state.location);
  const [startLocation, setStartLocation] = useState(null)
  const [shouldUpdateRoute, setShouldUpdateRoute] = useState(false);
  useEffect(() => {
    //reset route geojson layer on every render route
    if(!locator.route) {
      map.removeLayer(routeLayerRef.current);
    } else {
      map.addLayer(routeLayerRef.current);
    }
  }, [map, locator])

  useEffect(() => {
    if(locator.searchResult && locator.searchLocation && !locator.route) {
      if(!startLocation) {
        setStartLocation({lat: locator.searchLocation.lat || 0, lng: locator.searchLocation.lon || 0})
      }
      if(startLocation && locator.searchLocation.lat !== startLocation.lat && locator.searchLocation.lon !== startLocation.lng) {
        setStartLocation(locator.searchLocation.locationProperties)
        setShouldUpdateRoute(true)
      }
    }
  }, [locator, startLocation])

  useEffect(() => {
    if(shouldUpdateRoute) {
      console.log('should update route');
      console.log('travel method: ', locator.travelMethod)
      const params = {
        //hard-coded, should be user.travelMethod in store
        travelMethod: locator.travelMethod || 'driving-car',
        start: {
          lat: locator.searchLocation.lat,
          lng: locator.searchLocation.lon
        },
        end: {
          lat: locator.searchResult.locationProperties.lat,
          lng: locator.searchResult.locationProperties.lng
        }
      };
      console.log('get route params', params);
      setShouldUpdateRoute(false);
      dispatch(getRoute(params))
    }
  }, [locator, shouldUpdateRoute, dispatch])

  return (<LayerGroup ref={routeLayerRef} name="route">
   {locator && locator.route && <GeoJSON data={locator.route}/>}
    </LayerGroup>
  )
}

export default Route;