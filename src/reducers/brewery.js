import { BREWERIES_SET, INPUT_LOCATION_SET, INPUT_LOCATION_NOT_FOUND } from '../actions/brewery';
import {getDistanceInKm} from '../lib/calculator';

export default function (state = {}, action = {}) {
  switch (action.type) {
    case BREWERIES_SET:
      return {...state, breweries: action.payload};
    case INPUT_LOCATION_SET:
      delete state.searchLocation;
      if(state.breweries && state.breweries.length > 0) {
        const breweriesByDistance = state.breweries.map(brewery => {
          return {...brewery, distance: getDistanceInKm(brewery.locationProperties.lat, brewery.locationProperties.lng, action.payload.lat, action.payload.lon)}
        }).sort((a,b) => a.distance - b.distance);
        return {...state, searchResult: breweriesByDistance[0], searchLocation: action.payload};
      } else {
        return state;
      }
    case INPUT_LOCATION_NOT_FOUND:
      return {...state, searchError: 'Input location not found' }
    default:
      return state;
  }
}