import axios from "axios";

export const USER_LOCATION_SET = 'USER_LOCATION_SET';
export const USER_ADDRESS_SET = 'USER_ADDRESS_SET';
export const USER_LOCATION_LOADING = 'USER_LOCATION_LOADING';
export const USER_LOCATION_ERROR = 'USER_LOCATION_ERROR';

export const setUserLocation = (payload) => {
  return {
    type: 'USER_LOCATION_SET',
    payload
  }
}

export const setUserAddress = (payload) => {
  return {
    type: 'USER_ADDRESS_SET',
    payload
  }
}

export const getAddressByLocation = ({lat, lng}) => (dispatch) => {
  return new Promise(async () => {
    await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=4680392dcd4944afad13f1d18834846e`)
      .then(res => {
        if (res.data.features.length > 0) {
          dispatch(setUserAddress(res.data.features[0].properties))
        } else {
          console.log('user address not found')
        }
      })
      .catch(err => console.error(err))
  })
}
