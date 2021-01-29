import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from 'leaflet';
import { useDispatch } from "react-redux";
import { setUserLocation } from "../../actions/user";

export default function ViewControl({ zoom, bounds, initialBounds }) {
  const map = useMap();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: "USER_LOCATION_LOADING"});
    const onLocationError = event => {
      //set location error in store when user location not found
      console.log(event.message);
      dispatch({type: 'USER_LOCATION_ERROR'});
    }

    const onLocationFound = event => {
      //fly to user location when found and dispatch geolocation data to store
      map.flyTo(event.latlng, zoom)
      const geolocation = {
        coords: event.latlng,
        bounds: event.bounds,
        timestamp: event.timestamp
      }
      dispatch(setUserLocation(geolocation));
    }

    map.locate()
    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);
  }, [map, dispatch, zoom]);
  
  if(bounds) {
    //adjust map bounds when search input to fit both result and input location in view
    const southWest = new L.LatLng(bounds.southernmost.lat, bounds.southernmost.lng)
    const northEast = new L.LatLng(bounds.northernmost.lat, bounds.northernmost.lng)
    const searchBounds = new L.LatLngBounds(southWest, northEast);
    map.flyToBounds(searchBounds);
  } else if(initialBounds) {
    //initial map view when user location not (yet) found;
    map.fitBounds(initialBounds)
  }
  return null;
}