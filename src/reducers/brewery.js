import { BREWERIES_SET, POSTCODE_QUERY_MADE } from '../actions/brewery';
import {getDistanceInKm} from '../lib/calculator';

export default function (state = {}, action = {}) {
  switch (action.type) {
    case BREWERIES_SET:
      // console.log('SET_BREWERIES',action.payload);
      return {...state, breweries: action.payload};
    case POSTCODE_QUERY_MADE:
      console.log('payload from query', action.payload)
      console.log('state.breweries', state.breweries);
      if(state.breweries && state.breweries.length > 0) {
        const breweriesByDistance = state.breweries.map(brewery => {
          return {...brewery, distance: getDistanceInKm(brewery.locationProperties.lat, brewery.locationProperties.lng, action.payload.lat, action.payload.lon)}
        }).sort((a,b) => a.distance - b.distance);
        console.log('breweries sorted by distance from query location', breweriesByDistance)
        return {...state, closest: breweriesByDistance[0]};
      } else {
        return state;
      }
      
    default:
      return state;
  }
}