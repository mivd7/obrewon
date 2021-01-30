import { useState } from "react"
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getLocationByAddress } from "../../../actions/location";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const ConfirmButton = styled.button`
  padding: 10px 24px;
  background: ${props => props.buttonColor};
  color: ${props => props.buttonTextColor};
  border: 1px solid #3FB984;
  border-radius: .5rem;
  margin: 5px 10px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  &:focus {
    background: ${props => props.buttonColor};
    color: ${props => props.buttonTextColor};
  }
`;

const SearchButton = styled.button`
  padding: 10px 24px;
  background: black;
  color: white;
  border: none;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
`;

const Form = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #F4F4F4;
  width: 30rem;
  padding: 1rem;
  height: 1rem;
  border-radius: .5rem;
  border: .1rem solid black;
  transition: width 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const Input = styled.input`
  font-size: 14px;
  line-height: 1;
  background-color: transparent;
  width: 100%;
  border: none;
  color: black;
  &:focus,
  &:active {
    outline: none;
  }
  &::placeholder {
    color: grey;
  }
`;

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
        onLocationConfirmed()
      } else {
        setAddressIncorrect(true);
      }
  }
  
  const submitCorrectedAddress = () => {
    dispatch(getLocationByAddress(address))
    onLocationConfirmed();
  }

  return(<> 
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
          <ButtonContainer>
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
          </ButtonContainer>
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
  </>)
}

export default LocationStep;