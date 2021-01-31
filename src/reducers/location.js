import { BREWERIES_SET, SEARCH_LOCATION_SET, INPUT_LOCATION_NOT_FOUND, ROUTE_SET, FILTER_OPEN_BREWERIES } from '../actions/location';
import {sortBreweriesByDistance} from '../lib/calculator';

export default function (state = {}, action = {}) {
  switch (action.type) {
    case BREWERIES_SET:
      return {...state, breweries: action.payload};
    // case FILTER_OPEN_BREWERIES:
    //   const dayIndex = new Date().getDay();
    //   const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    //   const filteredBreweries = state.breweries.filter(brewery => brewery.open.indexOf(days[dayIndex]) !== -1);
    //   return {...state, filteredBreweries}
    case SEARCH_LOCATION_SET:
      delete state.searchLocation;
      if(state.breweries && state.breweries.length > 0) { 
        return {
          ...state,
          searchResult: sortBreweriesByDistance(state.breweries, action.payload)[0], 
          searchLocation: action.payload,
          sortedBreweries: sortBreweriesByDistance(state.breweries, action.payload),
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