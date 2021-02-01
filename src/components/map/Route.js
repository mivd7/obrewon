import { GeoJSON, LayerGroup, useMap } from 'react-leaflet'
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRoute } from '../../actions/location';


const Route = () => {
  const map = useMap();
  const routeLayerRef = useRef();
  // const geoJsonRef = useRef();
  const dispatch = useDispatch();
  const locator = useSelector(state => state.location);

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

      const params = {
        //hard-coded, should be user.travelMethod in store
        travelMethod: 'driving-car',
        start: {
          lat: locator.searchLocation.lat,
          lng: locator.searchLocation.lon
        },
        end: {
          lat: locator.searchResult.locationProperties.lat,
          lng: locator.searchResult.locationProperties.lng
        }
      };
      dispatch(getRoute(params));
    } 
  }, [locator, dispatch])

  return (<LayerGroup ref={routeLayerRef} name="route">
   {locator && locator.route && <GeoJSON data={locator.route}/>}
    </LayerGroup>
  )
}

export default Route;