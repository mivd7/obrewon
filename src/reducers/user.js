import { USER_LOCATION_ERROR, USER_LOCATION_LOADING, USER_LOCATION_SET } from '../actions/user';

export default function (state = {}, action = {}) {
  switch (action.type) {
    case USER_LOCATION_LOADING: 
      return {...state, locationLoading: true}
    case USER_LOCATION_SET:
      return {...state, locationLoading: false, geolocation: action.payload, geolocationError: false};
    case USER_LOCATION_ERROR:
      return {...state, locationLoading: false, geolocationError: true}
    default:
      return state;
  }
}