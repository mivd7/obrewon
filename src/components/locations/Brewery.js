import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BreweryMarker from "./BreweryMarker"


const Brewery = ({brewery}) => {
  const {lat, lng} = brewery.locationProperties;
  const [isClosest, setIsClosest] = useState(false);
  const location = useSelector(state => state.location);
  
  useEffect(() => {
    setIsClosest(false);
    if(location.searchResult && location.searchResult.name === brewery.name) {
      setIsClosest(true);
    }
  }, [location, brewery]);

  return(<>
    {brewery && brewery.locationProperties && <BreweryMarker markerPosition={{lat, lng}} brewery={brewery} closest={isClosest}/>}
    </>
  )
}

export default Brewery;