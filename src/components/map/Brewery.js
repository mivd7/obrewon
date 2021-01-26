import axios from "axios";
import { useEffect, useState } from "react";
import LocationMarker from "./LocationMarker"

const Brewery = ({brewery}) => {
  const [breweryLocation, setBreweryLocation] = useState(null);

  useEffect(() => {
    if(!breweryLocation) {
        const request = brewery.address + ' ' + brewery.zipcode + ' ' + brewery.city
        const getGeoCode = async () => {
          await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${request}&apiKey=4680392dcd4944afad13f1d18834846e`)
              .then(res => {
                if(res.data.features.length > 0) {

                  setBreweryLocation(res.data.features[0]);
                }
              })
              .catch(err => console.error(err))
        }
      
        getGeoCode();
      }
  }, [breweryLocation, brewery]);

  return(<>
    {breweryLocation && breweryLocation.properties && <LocationMarker markerPosition={{lat: breweryLocation.properties.lat, lng: breweryLocation.properties.lon}} brewery={brewery}/>}
    </>
  )
}

export default Brewery;