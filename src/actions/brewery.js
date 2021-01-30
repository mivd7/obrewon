import axios from 'axios';

export const BREWERIES_SET = 'BREWERIES_SET';
export const INPUT_LOCATION_SET = 'INPUT_LOCATION_SET';
export const INPUT_LOCATION_NOT_FOUND = 'INPUT_LOCATION_NOT_FOUND';

export function setBreweries(payload) {
  return {
    type: BREWERIES_SET,
    payload
  }
}

export function setInputLocation(payload) {
  return {
    type: INPUT_LOCATION_SET,
    payload
  }
}

export function setNotFoundError() {
  return {
    type: INPUT_LOCATION_NOT_FOUND,
  }
}

export const getAddressByLocation = ({lat, lng}) => (dispatch) => {
  return new Promise(async () => {
    await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=4680392dcd4944afad13f1d18834846e`)
      .then(res => {
        if (res.data.features.length > 0) {
          dispatch(setInputLocation(res.data.features[0].properties))
        } else {
          dispatch(setNotFoundError())
        }
      })
      .catch(err => console.error(err))
  })
}

export const getLocationByAddress = (request) => (dispatch) => {
  return new Promise(async () => {
    await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${request}&apiKey=4680392dcd4944afad13f1d18834846e`)
      .then(res => {
        if (res.data.features.length > 0) {
          dispatch(setInputLocation(res.data.features[0].properties))
        } else {
          dispatch(setNotFoundError())
        }
      })
      .catch(err => console.error(err))
  })
}