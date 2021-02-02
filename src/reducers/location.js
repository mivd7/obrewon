import { BREWERIES_SET, SEARCH_LOCATION_SET, INPUT_LOCATION_NOT_FOUND, ROUTE_SET, TRAVEL_METHOD_UPDATED, RESET_ROUTE, DISABLE_OPEN_FILTER, ENABLE_OPEN_FILTER } from '../actions/location';
import {sortBreweriesByDistance} from '../lib/calculator';

export default function location(state = {}, action = {}) {
  switch (action.type) {
    case BREWERIES_SET:
      return {...state, breweries: action.payload, filteredBreweries: []};
    case SEARCH_LOCATION_SET:
      const dayIndex = new Date().getDay();
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const sortedBreweries = sortBreweriesByDistance(state.breweries, action.payload);
      const filteredOnOpen = sortedBreweries.filter(brewery => brewery.open.indexOf(days[dayIndex]) !== -1);
      return {
        ...state,
        breweries: sortedBreweries,
        searchResult: filteredOnOpen[0], 
        searchLocation: action.payload,
        filteredBreweries: filteredOnOpen,
      };
    case DISABLE_OPEN_FILTER:
      return {
        ...state,
        searchResult: state.breweries[0]
      }
    case ENABLE_OPEN_FILTER:
      return {
        ...state,
        searchResult: state.filteredBreweries[0]
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