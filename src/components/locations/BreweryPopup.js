import { Popup } from "react-leaflet"

const BreweryPopup = ({brewery}) => {
  return(
    <Popup>
      <h1>{brewery.name}</h1>
      <p>{brewery.zipcode}</p>
      <p>{brewery.address}</p>
    </Popup>
  )
}

export default BreweryPopup;