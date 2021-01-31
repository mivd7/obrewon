import { useState } from "react"
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getLocationByAddress } from "../../actions/location";
import { Box, ConfirmButton, Form, Input, SearchButton } from "./SetupWizard.style";

function LocationStep({user, onLocationConfirmed}) {
  const [buttonColor, setButtonColor] = useState('transparent');
  const [buttonTextColor, setButtonTextColor] = useState('#3FB984');
  const [addressIncorrect, setAddressIncorrect] = useState(false);
  const [address, setAddress] = useState('');
  const dispatch = useDispatch();

  const onClick = (confirmed) => {
      setButtonColor('#3FB984')
      setButtonTextColor('#f4f4f4')
      
      if(confirmed) {
        dispatch(getLocationByAddress(user.address.formatted));
        setAddressIncorrect(false);
        onLocationConfirmed();
      } else {
        setAddressIncorrect(true);
      }
  }
  
  const submitCorrectedAddress = () => {
    dispatch(getLocationByAddress(address))
    onLocationConfirmed();
  }

  return(<Box> 
    <h1>Where you at?</h1>
    {user && user.locationLoading && <>
      <p>Hold on! O'Brewon is trying to find you on the map...</p>
      <img src="https://media.giphy.com/media/2kSfEOhJJApaYXsRJ7/giphy.gif" alt="glass filling" style={{maxWidth: '50%', margin: '10px'}}/>
    </>}
    {user && user.address && <>
      <h2>According to O'Brewon your location is:</h2>
      <p>{user.address.street}, {user.address.postcode}</p>
      <p>{user.address.city}, {user.address.country}</p>
      {!addressIncorrect && 
        <>
          <h2>Is this correct?</h2>
            <ConfirmButton 
              buttonColor={buttonColor}
              buttonTextColor={buttonTextColor}
              onClick={() => onClick(true)}>
              Yes
            </ConfirmButton>
            <ConfirmButton 
              buttonColor={buttonColor}
              buttonTextColor={buttonTextColor}
              onClick={() => onClick(false)}>
              No
            </ConfirmButton>
        </>}  
      {addressIncorrect && <>
          <h2>What is your address then?</h2>
          <Form onSubmit={submitCorrectedAddress}>
            <Input
              onChange={e => setAddress(e.target.value)}
              value={address}
              placeholder="Search by postcode, address or city" />
              <SearchButton 
                buttonColor={buttonColor}
                buttonTextColor={buttonTextColor}
                onClick={submitCorrectedAddress}>
                  Search
              </SearchButton>
          </Form>
        </>}
    </>}
  </Box>)
}

export default LocationStep;