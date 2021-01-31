import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, ConfirmButton, GridElement } from './SetupWizard.style';
import homeIcon from '../../assets/home.svg';
import styled from "styled-components";
// import breweryIcon from '../../assets/brewery.svg';
// import carIcon from '../../assets/car.svg';
// import bikeIcon from '../../assets/bike.svg';
// import { ArrowThickRight } from '@styled-icons/open-iconic';

// const Icon = styled.img`
//   width: 32px;
//   height: 40px;
// `

// const ArrowIcon = styled(ArrowThickRight)`
//   color: ${props => props.color};
//   width: 32px;
//   height: 40px;
// `
function RouteStep({ onDone }) {
  //or cycling-regular
  const [travelMethod, setTravelMethod] = useState('driving-car');
  const locator = useSelector(state => state.location);
  const dispatch = useDispatch();

  return(<>
    {locator.searchLocation && locator.searchResult && <>
    <GridElement gridAutoFlow="row" columnStart="1" columnEnd="0">
      <Box style={{padding: '10px;'}}>
        <h2>The closest brewery to {locator.searchLocation.street} is {locator.searchResult.name}</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam expedita reprehenderit porro vero repellendus quisquam saepe accusamus sit, cupiditate aliquid voluptate eum hic, explicabo pariatur laborum rerum repudiandae blanditiis dignissimos.</p>
        <ConfirmButton 
          buttonColor={'#eeeeee'}
          buttonTextColor={'#3FB984'}
          onClick={() => onDone(true)}>
          View Route
        </ConfirmButton>
      </Box>
    </GridElement>
    <GridElement gridAutoFlow="row" columnStart="0" columnEnd="0">
      <div style={{borderLeft: '1px solid black'}}>
        <Box>
          <h2>Closest Breweries</h2>
          {locator.sortedBreweries && locator.sortedBreweries.map(brewery => <div key={brewery.name}>
            <h2>{brewery.name}</h2>
            <p>{brewery.address}</p>
            <p>{Math.round(brewery.distance)} KM</p>
          </div>)}
        </Box>
      </div>
    </GridElement>
    
    {/* <Icon src={travelMethod === 'driving-car' ? carIcon : bikeIcon} />
    <div>{travelMethod === 'driving-car' ? 'Car' : 'Bicycle'}</div> */}
    
  </>
    }
  </>)
}

export default RouteStep;