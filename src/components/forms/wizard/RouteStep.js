import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, ConfirmButton } from './SetupWizard.style';

function RouteStep({ user, onDone }) {
  //or cycling-regular
  const [travelMethod, setTravelMethod] = useState('driving-car');
  const locator = useSelector(state => state.location);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   //dit moet in een submit functie
  //   if(locator && locator.searchLocation && locator.searchResult && !locator.route) {
  //     const params = {
  //       //`https://api.openrouteservice.org/v2/directions/${travelMethod}?api_key=${ORS_API_KEY}&start=${start.lon},${start.lat}&end=${end.lon},${end.lat}`
  //       travelMethod,
  //       start: {
  //         lat: locator.searchLocation.lat,
  //         lng: locator.searchLocation.lon,
  //       },
  //       end: {
  //         lat: locator.searchResult.locationProperties.lat, 
  //         lng: locator.searchResult.locationProperties.lng 
  //       }
  //     }
  //     dispatch(getRoute(params))
  //   }
  // }, [locator, dispatch, travelMethod]);

  return(<>
    <Box>
      <img src="https://media.giphy.com/media/2kSfEOhJJApaYXsRJ7/giphy.gif" alt="glass filling" style={{maxWidth: '50%'}}/>
      <p>Here be details of the closest brewery and calculate route based on transportation method</p>
    </Box>
    <Box>
      <p>list of breweries and travel select option</p>
      <ConfirmButton 
        buttonColor={'transparent'}
        buttonTextColor={'#3FB984'}
        onClick={() => onDone(true)}>
        Done
      </ConfirmButton>
    </Box>
    
  </>)
}

export default RouteStep;