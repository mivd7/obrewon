import { GeoJSON, LayerGroup, useMap } from 'react-leaflet'
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const Route = () => {
  const map = useMap();
  const routeLayerRef = useRef();
  const location = useSelector(state => state.location);

  useEffect(() => {
    //reset route geojson layer on every render route
    if(!location.route) {
      map.removeLayer(routeLayerRef.current);
    } else {
      map.addLayer(routeLayerRef.current);
    }
  }, [map, location])


  return (<LayerGroup ref={routeLayerRef} name="route">
   {location && location.route && <GeoJSON key="geojson-route" data={location.route}/>}
    </LayerGroup>
  )
}

export default Route;