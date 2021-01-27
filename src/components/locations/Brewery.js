import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LocationMarker from "../map/LocationMarker"

const Brewery = ({brewery}) => {
  const {lat, lng} = brewery.locationProperties;
  const [isClosest, setIsClosest] = useState(false);
  const breweryStore = useSelector(state => state.brewery);
  
  useEffect(() => {
    if(breweryStore.closest && breweryStore.closest.name == brewery.name) {
      setIsClosest(true);
    }
  }, [breweryStore, brewery]);

  return(<>
    {brewery && brewery.locationProperties && <LocationMarker markerPosition={{lat, lng}} brewery={brewery} closest={isClosest}/>}
    </>
  )
}

export default Brewery;