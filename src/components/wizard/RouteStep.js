import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { DirectionsCar, DirectionsBike, ToggleOff, ToggleOn } from '@styled-icons/material';

import { GridElement } from './SetupWizard.style';
import { getLocationByAddress, getRoute, updateTravelMethod } from '../../actions/location';

const List = styled.ul`
  position: relative;
  max-height: 400px;
  list-style: none;
  padding: 0px 10px;
  background-color: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-left: 1px solid black;
  overflow:hidden; 
  overflow-y:scroll;
  h2 {
    color: #f28e1c
  }
  text-align: left;
`;

const ListItem = styled.li`
  padding: 10px;
  border: 1px solid #d1d1d1;
  background-color: ${props => (props.isOpen ? "#f28e1c" : "#eee")};
  span {
    color: ${props => (props.isOpen ? "#eee" : "#141414")}
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
  h2, p {
    color: #777;
    gap: 0;
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
  color: ${props => props.color};
`;

const Label = styled.label`
  color: #777;
  font-family: "Raleway", sans-serif;
  font-size: 12px;
`;

const SwitchContainer = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
`
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
`
const ToggleOffIcon = styled(ToggleOff)`
  color: #f28e1c;
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
`
const ToggleOnIcon = styled(ToggleOn)`
  color: #f28e1c;
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
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
  const location = useSelector(state => state.location);
  const [showAllBreweries, setShowAllBreweries] = useState(false);
  const [locationInputValue, setLocationInputValue] = useState('');
  const [travelMethod, setTravelMethod] = useState('driving-car');
  const [searchSuccess, setSearchSuccess] = useState(false)
  const [searchError, setSearchError] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    if(location.searchQuery && locationInputValue === '') {
      //await searchLocation then set input value to zipcode
      setLocationInputValue(location.searchQuery)
    }
    if(location.travelMethod) {
      setTravelMethod(location.travelMethod);
    }
  }, [location, locationInputValue])

  useEffect(() => {
    if(location.searchLocation && location.searchResult && searchSuccess) {
      const params = {
        travelMethod: location.travelMethod || 'driving-car',
        start: {
          lat: location.searchLocation.lat,
          lng: location.searchLocation.lon
        },
        end: {
          lat: location.searchResult.locationProperties.lat,
          lng: location.searchResult.locationProperties.lng
        }
      };
      setSearchSuccess(false);
      dispatch(getRoute(params));
    }
  }, [location, dispatch, searchSuccess]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(locationInputValue) {
      dispatch(updateTravelMethod(travelMethod)); 
      dispatch({type: 'RESET_ROUTE'});    
      dispatch(getLocationByAddress(locationInputValue))
        .then((result) => {
          if(result) {
            setSearchError(false);
            setSearchSuccess(true)
          } else {
            setSearchSuccess(false);
            setSearchError(true)
          }
        })
        .then(() => {
          if(!searchError) {
            onDone(true)
          }
        })
    }
  }

  const toggleOpenFilter = (showAll) => {
    if(showAll) {
      dispatch({type: 'DISABLE_OPEN_FILTER'})
    } else {
      dispatch({type: 'ENABLE_OPEN_FILTER'})
    }
  }


  return(<>
    {location.searchLocation && location.searchResult && <>
    <GridElement gridAutoFlow="row" columnStart="0" columnEnd="0" align="center">
      <Form>
          <h2>Your nearest brewery is 
            <span style={{color: '#f28e1c'}}>{location.searchResult.name}</span> in <span style={{color: '#f28e1c'}}>{location.searchResult.city}</span>
            {location.filteredBreweries.indexOf(location.searchResult) === -1 && <span> but it's not opened today!</span>}</h2>
          
          {location.route && location.route.features && location.route.features[0].properties.summary.distance && <p>Travel distance: {Math.round(location.route.features[0].properties.summary.distance / 1000)} km</p>}
          <Label>
            Change your location
            <Input 
              color={searchError ? '#ff523f' : '#141414'}
              value={locationInputValue}
              onChange={e => setLocationInputValue(e.target.value)}
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
                  setTravelMethod('driving-car');
                }}>
                <CarIcon />
              </TravelMethodButton>
              <TravelMethodButton 
                backgroundColor={travelMethod === 'cycling-regular' ? '#f28e1c' : '#eeeeee'} 
                color={travelMethod === 'cycling-regular' ? '#eeeeee' : '#f28e1c'} 
                onClick={e => {
                  e.preventDefault();
                  setTravelMethod('cycling-regular');
                }}>
                <BikeIcon />
              </TravelMethodButton>
            </span>
              {travelMethod === 'driving-car' ? 
                <p style={{marginTop: 5, color: '#f28e1c'}}>Don't drink and drive!</p> : 
                <p style={{marginTop: 5, color: '#f28e1c'}}>Wear a helmet on your way back!</p>}
          </Label>
          <SubmitButton
            type="submit" 
            buttonColor={'#eeeeee'}
            buttonTextColor={'#f28e1c'}
            onClick={e => handleSubmit(e)}>
            Show Route
          </SubmitButton>
        </Form>
    </GridElement>
    <GridElement gridAutoFlow="row" columnStart="0" columnEnd="0">
      <List>
        <h2>{!showAllBreweries ? 'Closest Breweries Open Today' : 'Closest Breweries'}</h2>
        <SwitchContainer>
          <span onClick={() => {
            setShowAllBreweries(!showAllBreweries);
            toggleOpenFilter(!showAllBreweries)
          }}>
            {showAllBreweries ? <ToggleOnIcon/> : <ToggleOffIcon/>}
          </span>
        </SwitchContainer>
        {showAllBreweries && location.breweries && location.breweries.map((brewery, index) => 
          <div key={brewery.name}>
            <ListItem isOpen={location.filteredBreweries.indexOf(brewery) !== -1}>
              <Title>{index + 1}. {brewery.name}</Title><br/>
              <span>{brewery.address}, {brewery.zipcode}, {brewery.city}</span><br/>
              {location.filteredBreweries.indexOf(brewery) !== -1 ? <span>Distance: {Math.round(brewery.distance)} km</span> : <span style={{color: 'red'}}>Not opened today!</span>}
              
            </ListItem>
          </div>)}
        {!showAllBreweries && location.filteredBreweries && location.filteredBreweries.map((brewery, index) => <ListItem isOpen={location.filteredBreweries.indexOf(brewery) !== -1} key={brewery.name}>
          <Title>{index + 1}. {brewery.name}</Title><br/>
          <span>{brewery.address}, {brewery.zipcode}, {brewery.city}</span><br/>
          <span>Distance: {Math.round(brewery.distance)} km</span>
        </ListItem>)}
      </List>
    </GridElement>
  </>
    }
  </>)
}

export default RouteStep;