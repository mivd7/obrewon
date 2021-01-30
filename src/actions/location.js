import axios from 'axios';
import {ORS_API_KEY, GEOAPIFY_API_KEY} from '../constants';

export const BREWERIES_SET = 'BREWERIES_SET';
export const INPUT_LOCATION_SET = 'INPUT_LOCATION_SET';
export const INPUT_LOCATION_NOT_FOUND = 'INPUT_LOCATION_NOT_FOUND';
export const ROUTE_SET = 'ROUTE_SET';

export function setBreweries(payload) {
  return {
    type: BREWERIES_SET,
    payload
  }
}

export function setInputLocation(payload) {
  return {
    type: INPUT_LOCATION_SET,
    payload
  }
}

export function setNotFoundError() {
  return {
    type: INPUT_LOCATION_NOT_FOUND,
  }
}

export function setRoute(payload) {
  return {
    type: ROUTE_SET,
    payload
  }
}

export const getLocationByAddress = (request) => (dispatch) => {
  return new Promise(async () => {
    await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${request}&apiKey=${GEOAPIFY_API_KEY}`)
      .then(res => {
        if (res.data.features.length > 0) {
          dispatch(setInputLocation(res.data.features[0].properties))
        } else {
          dispatch(setNotFoundError())
        }
      })
      .catch(err => console.error(err))
  })
}

export const getRoute = (params) => (dispatch) => {
  const {travelMethod, start, end} = params;
  return new Promise(async () => {
    console.log(`GET request: /${travelMethod}?api_key=${ORS_API_KEY}&start=${start.lon},${start.lat}&end=${end.lon},${end.lat}`)
    //https://api.openrouteservice.org/v2/directions/cycling-regular?api_key=5b3ce3597851110001cf6248daa458bb7e59428895b9711f573dc9c1&start=4.9415971,52.3388977&end=4.9263454,52.3666601
    await axios.get(`https://api.openrouteservice.org/v2/directions/${travelMethod}?api_key=${ORS_API_KEY}&start=${start.lon},${start.lat}&end=${end.lon},${end.lat}`)
      .then(res => {
        console.log('GET route success', res.data);
        dispatch(setRoute(res.data));
      })
      .catch(err => console.error(err));
  })
}