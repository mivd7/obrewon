export const USER_LOCATION_SET = 'USER_LOCATION_SET';
export const USER_LOCATION_LOADING = 'USER_LOCATION_LOADING';
export const USER_LOCATION_ERROR = 'USER_LOCATION_ERROR';

export const setUserLocation = (payload) => {
  return {
    type: 'USER_LOCATION_SET',
    payload
  }
}