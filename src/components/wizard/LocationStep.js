import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getLocationByAddress } from "../../actions/location";
import { setUserLocation } from "../../actions/user";
import { Box, ConfirmButton, Form, Input, SearchButton } from "./SetupWizard.style";

function LocationStep({onLocationConfirmed}) {
  const [addressIncorrect, setAddressIncorrect] = useState(false);
  const [address, setAddress] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const onClick = (confirmed) => {
      if(confirmed) {
        dispatch(getLocationByAddress(user.address.formatted)).then;
        setAddressIncorrect(false);
        onLocationConfirmed();
      } else {
        setAddressIncorrect(true);
      }
  }
  
  const submitCorrectedAddress = (e) => {
    e.preventDefault();
    dispatch(setUserLocation(address));
    dispatch(getLocationByAddress(address)).then(() => {
      onLocationConfirmed();
    })
  }

  return(<Box> 
    <h1>Where you at?</h1>
    {user && user.locationLoading && <>
      <p>Hold on! O'Brewon is trying to find you on the map...</p>
      <img src="https://media.giphy.com/media/2kSfEOhJJApaYXsRJ7/giphy.gif" alt="glass filling" style={{maxWidth: '50%', margin: '10px'}}/>
    </>}
    {user && user.locationError && <Box>
      <p>Obrewon couldn't find your location!</p>
      <p>Either allow your browser to use your location or just tell O'Brewon below</p>
      <Form 
        onSubmit={e => submitCorrectedAddress(e)}
        formColorPrimary={'transparent'}
        formColorSecondary={'#f28e1c'}>
        <Input
          onChange={e => setAddress(e.target.value)}
          value={address}
          placeholder="Enter your location (zipcode, address or city)" />
          <SearchButton 
              buttonColor={'transparent'}
              buttonTextColor={'#f28e1c'}
              onClick={e => submitCorrectedAddress(e)}>
            Search
          </SearchButton>
      </Form>
    </Box>}
    {user && user.address && !user.locationLoading && <>
      <h2>According to O'Brewon your location is:</h2>
      <p>{user.address.street}, {user.address.postcode}</p>
      <p>{user.address.city}, {user.address.country}</p>
      {!addressIncorrect && 
        <>
          <h2>Is this correct?</h2>
            <ConfirmButton 
              buttonColor={'transparent'}
              buttonTextColor={'#f28e1c'}
              onClick={() => onClick(true)}>
              Yes
            </ConfirmButton>
            <ConfirmButton 
              buttonColor={'transparent'}
              buttonTextColor={'#f28e1c'}
              onClick={() => onClick(false)}>
              No
            </ConfirmButton>
        </>}  
      {addressIncorrect && <>
          <h2>What is your address then?</h2>
          <Form 
            onSubmit={submitCorrectedAddress}
            formColorPrimary={'transparent'}
            formColorSecondary={'#f28e1c'}>
            <Input
              onChange={e => setAddress(e.target.value)}
              value={address}
              placeholder="Search by postcode, address or city" />
              <SearchButton 
                buttonColor={'transparent'}
                buttonTextColor={'#f28e1c'}
                onClick={e => submitCorrectedAddress(e)}>
                  Search
              </SearchButton>
          </Form>
        </>}
    </>}
  </Box>)
}

export default LocationStep;