import LocationMarker from "./LocationMarker"

const Brewery = ({brewery}) => {
  const {lat, lng} = brewery.locationProperties;
  return(<>
    {brewery && brewery.locationProperties && <LocationMarker markerPosition={{lat, lng}} brewery={brewery}/>}
    </>
  )
}

export default Brewery;