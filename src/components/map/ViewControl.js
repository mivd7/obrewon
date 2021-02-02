import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from 'leaflet';
import { useDispatch } from "react-redux";
import { setUserLocation } from "../../actions/user";

export default function ViewControl({ zoom, bounds, disableMapInteractions }) {
  const map = useMap();
  const dispatch = useDispatch();
  if(disableMapInteractions) {
    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    if (map.tap) map.tap.disable();
  } else {
    map.dragging.enable();
    map.touchZoom.enable();
    map.doubleClickZoom.enable();
    map.scrollWheelZoom.enable();
    map.boxZoom.enable();
    map.keyboard.enable();
    if (map.tap) map.tap.enable();
  }

  useEffect(() => {
    dispatch({type: "USER_LOCATION_LOADING"});
    const onLocationError = event => {
      //set location error in store when user location not found
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

    map.locate();
    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);
  }, [map, dispatch, zoom]);
  
  if(bounds) {
    //adjust map bounds when search input to fit both result and input location in view
    const southWest = new L.LatLng(bounds.southernmost.lat, bounds.southernmost.lng)
    const northEast = new L.LatLng(bounds.northernmost.lat, bounds.northernmost.lng)
    const searchBounds = new L.LatLngBounds(southWest, northEast);
    map.flyToBounds(searchBounds);
  } 
  
  return null;
}