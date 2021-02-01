import { GeoJSON, LayerGroup, useMap } from 'react-leaflet'
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRoute } from '../../actions/location';


const Route = () => {
  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  const [currentRoute, setCurrentRoute] = useState(null);
  const previousRoute = usePrevious(currentRoute)
  
  const map = useMap();
  const routeLayerRef = useRef();
  const geoJsonRef = useRef();
  // let routeCount = 0
  const locator = useSelector(state => state.location);

  useEffect(() => {
    //reset route geojson layer on every render route
    if(!locator.route) {
      // routeCount++
      // console.log(geoJsonRef);
      map.removeLayer(routeLayerRef.current);
    } else {
      map.addLayer(routeLayerRef.current);
    }
  }, [map, locator])

  return (<LayerGroup ref={routeLayerRef} name="route">
   {locator && locator.route && <GeoJSON key="geojson-route" geoJsonRef={geoJsonRef} data={locator.route}/>}
    </LayerGroup>
  )
}

export default Route;