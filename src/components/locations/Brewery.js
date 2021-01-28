import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BreweryMarker from "./BreweryMarker"

const Brewery = ({brewery}) => {
  const {lat, lng} = brewery.locationProperties;
  const [isClosest, setIsClosest] = useState(false);
  const breweryStore = useSelector(state => state.brewery);
  
  useEffect(() => {
    if(breweryStore.searchResult && breweryStore.searchResult.name == brewery.name) {
      setIsClosest(true);
    }
  }, [breweryStore, brewery]);

  

  return(<>
    {brewery && brewery.locationProperties && <BreweryMarker markerPosition={{lat, lng}} brewery={brewery} closest={isClosest}/>}
    </>
  )
}

export default Brewery;