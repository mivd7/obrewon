import { BREWERIES_SET, SEARCH_LOCATION_SET, INPUT_LOCATION_NOT_FOUND, ROUTE_SET, TRAVEL_METHOD_UPDATED, RESET_ROUTE, INPUT_LOCATION_UPDATED } from '../actions/location';
import {sortBreweriesByDistance} from '../lib/calculator';

export default function (state = {}, action = {}) {
  switch (action.type) {
    case BREWERIES_SET:
      return {...state, breweries: action.payload};
    case SEARCH_LOCATION_SET:
      delete state.searchLocation;
      if(state.breweries && state.breweries.length > 0) { 
        return {
          ...state,
          searchResult: sortBreweriesByDistance(state.breweries, action.payload)[0], 
          searchLocation: action.payload,
          sortedBreweries: sortBreweriesByDistance(state.breweries, action.payload),
        };
      } else {
        return state;
      }
    case INPUT_LOCATION_NOT_FOUND:
      return {...state, searchError: 'Input location not found'}
    case TRAVEL_METHOD_UPDATED:
      return {...state, travelMethod: action.payload}
    case RESET_ROUTE:
      return {...state, route: null}
    case ROUTE_SET:
      return {
        ...state, 
        route: action.payload
      }
    default:
      return state;
  }
}