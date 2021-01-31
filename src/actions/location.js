import axios from 'axios';
import {ORS_API_KEY, GEOAPIFY_API_KEY} from '../constants';

export const BREWERIES_SET = 'BREWERIES_SET';
export const SEARCH_LOCATION_SET = 'SEARCH_LOCATION_SET';
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
    type: SEARCH_LOCATION_SET,
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

export const getLocationByAddress = (params) => (dispatch) => {
  return new Promise(async () => {
    await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${params}&apiKey=${GEOAPIFY_API_KEY}`)
      .then(res => {
        if (res.data.features.length > 0) {
          dispatch(setInputLocation(res.data.features[0].properties))
          return res.data.features[0].properties
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
    await axios.get(`https://api.openrouteservice.org/v2/directions/${travelMethod}?api_key=${ORS_API_KEY}&start=${start.lng},${start.lat}&end=${end.lng},${end.lat}`)
      .then(res => {
        dispatch(setRoute(res.data));
      })
      .catch(err => console.error(err));
  })
}