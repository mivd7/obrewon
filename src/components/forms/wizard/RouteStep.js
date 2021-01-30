import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoute } from "../../../actions/location";

function RouteStep({ user }) {
  //or cycling-regular
  const [travelMethod, setTravelMethod] = useState('driving-car');
  const locator = useSelector(state => state.location);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(locator);

    //dit moet in een submit functie
    if(locator && locator.searchLocation && locator.searchResult && !locator.route) {
      const params = {
        //`https://api.openrouteservice.org/v2/directions/${travelMethod}?api_key=${ORS_API_KEY}&start=${start.lon},${start.lat}&end=${end.lon},${end.lat}`
        travelMethod,
        start: {
          lat: locator.searchLocation.lat,
          lon: locator.searchLocation.lon,
        },
        end: {
          lat: locator.searchResult.locationProperties.lat, 
          lon: locator.searchResult.locationProperties.lng 
        }
      }
      dispatch(getRoute(params))
    }
  }, [locator, dispatch, travelMethod]);

  return(<>
    <img src="https://media.giphy.com/media/2kSfEOhJJApaYXsRJ7/giphy.gif" alt="glass filling" style={{maxWidth: '50%'}}/>
    <p>Here be details of the closest brewery and calculate route based on transportation method</p>
  </>)
}

export default RouteStep;