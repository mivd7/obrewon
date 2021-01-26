import axios from 'axios';

export const BREWERIES_SET = 'BREWERIES_SET';
export const POSTCODE_QUERY_MADE = 'POSTCODE_QUERY_MADE';

export function setBreweries(payload) {
  return {
    type: BREWERIES_SET,
    payload
  }
}

export function makePostcodeQuery(payload) {
  return {
    type: POSTCODE_QUERY_MADE,
    payload
  }
}

export const getPostcodeCoordinates = (request) => (dispatch) => {
  return new Promise(async () => {
    await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${request}&apiKey=4680392dcd4944afad13f1d18834846e`)
      .then(res => {
        if (res.data.features.length > 0) {
          dispatch(makePostcodeQuery(res.data.features[0].properties))
        } else {
          console.log('no results found for input')
        }
      })
      .catch(err => console.error(err))
  })
}