import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { DirectionsCar, DirectionsBike } from '@styled-icons/material';

import { Box, GridElement } from './SetupWizard.style';
// import homeIcon from '../../assets/home.svg';
// import breweryIcon from '../../assets/brewery.svg';
// import carIcon from '../../assets/car.svg';
// import bikeIcon from '../../assets/bike.svg';


const List = styled.ul`
  list-style: none;
  padding: 0px 10px;
  background-color: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-left: 1px solid black;
  h2 {
    color: #f28e1c
  }
  text-align: left;
`;

const ListItem = styled.li`
  padding: 10px;
  border: 1px solid #d1d1d1;
  background-color: #f28e1c;
  span {
    color: #eeeeee
  }
`;

const Title = styled.span`
  font-size: 18px;
  color: #eeeeee;
  margin-bottom: 5px;
  width: 75%;
  font-weight: bold;
`;

const Form = styled.form`
  display: grid;
  gap: 5px;
  width: 75%;
  align-items: space-between;
  text-align: left;
  h2 {
    color: #777;
  }
  `;

const Input = styled.input`
  width: 75%;
  height: 35px;
  border: 1px solid #ccc;
  background-color: #fff;
  outline: none;
  padding: 0 5px;
  font-size: 14px;
  color: #141414;
`;

const Label = styled.label`
  color: #777;
  font-family: "Raleway", sans-serif;
  font-size: 12px;
`;
// active bg: #f28e1c
// inactive bg: #eeeeee
const TravelMethodButton = styled.button`
  margin-top: 5px;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  border: none;
  outline: none;
  &:last-child {
    margin-left: 5px;
  }
`
const CarIcon = styled(DirectionsCar)`
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
`
const BikeIcon = styled(DirectionsBike)`
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
  align-self: right;
`

const SubmitButton = styled.button`
  padding: 10px 24px;
  background: ${props => props.buttonColor};
  color: ${props => props.buttonTextColor};
  border: 1px solid ${props => props.buttonTextColor};
  border-radius: .5rem;
  margin: 5px 0;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
`;

function RouteStep({ onDone }) {
  //or cycling-regular
  const [travelMethod, setTravelMethod] = useState('driving-car');
  const locator = useSelector(state => state.location);
  const [currentLocation, setCurrentLocation] = useState(locator.searchLocation.postcode || '');
  const dispatch = useDispatch();

  // const fetchRoute = () => {
  //   const params = {
      
  //   }
  // }

  return(<>
    {locator.searchLocation && locator.searchResult && <>
    <GridElement gridAutoFlow="row" columnStart="1" columnEnd="0" align="center">
      <Box>
        
      </Box>
      <Form>
          <h2>Your nearest open brewery is <span style={{color: '#f28e1c'}}>{locator.searchResult.name}</span> in <span style={{color: '#f28e1c'}}>{locator.searchResult.city}</span></h2>
          <Label>
            Change your location
            <Input 
              value={currentLocation}
              onChange={e => setCurrentLocation(e.target.value)}
              type="text" />
          </Label><br/>
          <Label>
            Travel Method<br/>
            <span>
              <TravelMethodButton 
                backgroundColor={travelMethod === 'driving-car' ? '#f28e1c' : '#eeeeee'} 
                color={travelMethod === 'driving-car' ? '#eeeeee' : '#f28e1c'} 
                onClick={e => {
                  e.preventDefault();
                  setTravelMethod('driving-car')
                }}>
                <CarIcon />
              </TravelMethodButton>
              <TravelMethodButton 
                backgroundColor={travelMethod === 'cycling-regular' ? '#f28e1c' : '#eeeeee'} 
                color={travelMethod === 'cycling-regular' ? '#eeeeee' : '#f28e1c'} 
                onClick={e => {
                  e.preventDefault();
                  setTravelMethod('cycling-regular')
                }}>
                <BikeIcon />
              </TravelMethodButton>
            </span>
          </Label>
          <SubmitButton 
            buttonColor={'#eeeeee'}
            buttonTextColor={'#f28e1c'}
            onClick={() => onDone(true)}>
            Show Route
          </SubmitButton>
        </Form>
    </GridElement>
    <GridElement gridAutoFlow="row" columnStart="0" columnEnd="0">
      <List>
        <Box>
            <h2>Breweries Open Today</h2>
            {locator.sortedBreweries && locator.sortedBreweries.map((brewery, index) => <ListItem key={brewery.name}>
              <Title>{index + 1}. {brewery.name}</Title><br/>
              <span>{brewery.address}, {brewery.zipcode}, {brewery.city}</span><br/>
              <span>Distance: {Math.round(brewery.distance)} km</span>
            </ListItem>)}
        </Box>
      </List>
    </GridElement>
    
    {/* <Icon src={travelMethod === 'driving-car' ? carIcon : bikeIcon} />
    <div>{travelMethod === 'driving-car' ? 'Car' : 'Bicycle'}</div> */}
    
  </>
    }
  </>)
}

export default RouteStep;