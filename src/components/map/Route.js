import { GeoJSON, LayerGroup, useMap } from 'react-leaflet'
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const Route = () => {
  const map = useMap();
  const routeLayerRef = useRef();
  const locator = useSelector(state => state.location);

  useEffect(() => {
    //reset route geojson layer on every render route
    if(!locator.route) {
      map.removeLayer(routeLayerRef.current);
    } else {
      map.addLayer(routeLayerRef.current);
    }
  }, [map, locator])


  return (<LayerGroup ref={routeLayerRef} name="route">
   {locator && locator.route && <GeoJSON key="geojson-route" data={locator.route}/>}
    </LayerGroup>
  )
}

export default Route;