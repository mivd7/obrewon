import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BreweryMarker from "./BreweryMarker"


const Brewery = ({brewery}) => {
  const {lat, lng} = brewery.locationProperties;
  const [isClosest, setIsClosest] = useState(false);
  const locator = useSelector(state => state.location);
  
  useEffect(() => {
    setIsClosest(false);
    if(locator.searchResult && locator.searchResult.name === brewery.name) {
      setIsClosest(true);
    }
  }, [locator, brewery]);

  return(<>
    {brewery && brewery.locationProperties && <BreweryMarker markerPosition={{lat, lng}} brewery={brewery} closest={isClosest}/>}
    </>
  )
}

export default Brewery;