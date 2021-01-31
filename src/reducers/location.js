import { BREWERIES_SET, SEARCH_LOCATION_SET, INPUT_LOCATION_NOT_FOUND, ROUTE_SET } from '../actions/location';
import {getDistanceInKm} from '../lib/calculator';

export default function (state = {}, action = {}) {
  switch (action.type) {
    case BREWERIES_SET:
      return {...state, breweries: action.payload};
    case SEARCH_LOCATION_SET:
      delete state.searchLocation;
      if(state.breweries && state.breweries.length > 0) {
        const breweriesByDistance = state.breweries.map(brewery => {
          return {...brewery, distance: getDistanceInKm(brewery.locationProperties.lat, brewery.locationProperties.lng, action.payload.lat, action.payload.lon)}
        }).sort((a,b) => a.distance - b.distance);
        return {
          ...state, 
          searchResult: breweriesByDistance[0], 
          searchLocation: action.payload,
          route: null
        };
      } else {
        return state;
      }
    case INPUT_LOCATION_NOT_FOUND:
      return {...state, searchError: 'Input location not found'}
    case ROUTE_SET:
      return {...state, route: action.payload}
    default:
      return state;
  }
}