import React, { useState, useRef, useEffect } from "react";
import { useMap } from "react-leaflet";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getLocationByAddress, getRoute } from "../../actions/location";

const Form = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: ${(props) => (props.barOpened ? "30rem" : "4rem")};
  cursor: ${(props) => (props.barOpened ? "auto" : "pointer")};
  padding: 1rem;
  height: 1rem;
  border-radius: .5rem;
  transition: width 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  z-index: 9999;
  margin-top: 1rem;
  background: ${props => props.formColorPrimary};
  border: 1px solid ${props => props.formColorSecondary};
`;

const Input = styled.input`
  font-size: 20px;
  line-height: 1;
  width: 100%;
  margin-left: ${props => (props.barOpened ? "1rem" : "0rem")};
  transition: margin 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  border: none;
  background-color: inherit;
  color: #141414
  &:focus,
  &:active {
    outline: none;
  }
  &::placeholder {
    color: #eeeee;
  }
`;

const SearchButton = styled.button`
  line-height: 1;
  pointer-events: ${props => (props.barOpened ? "auto" : "none")};
  cursor: ${props => (props.barOpened ? "pointer" : "none")};
  background-color: transparent;
  border: none;
  outline: none;
  text-align: left;
  font-size: 14px;
  color: ${props => props.buttonTextColor}
`;

function SearchBar({ locator }) {
  const [input, setInput] = useState("");
  const [barOpened, setBarOpened] = useState(false);
  // const [searchQuerySubmitted, setSearchQuerySubmitted] = useState(false)
  const inputFocus = useRef();
  const dispatch = useDispatch();
  const map = useMap()
  
  const onFormSubmit = e => {
    e.preventDefault();
    setInput("");
    setBarOpened(false);
    dispatch(getLocationByAddress(input))
  };

  useEffect(() => {
    if(barOpened) {
      map.dragging.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();
      map.boxZoom.disable();
      map.keyboard.disable();
      if (map.tap) map.tap.disable();
    } else {
      map.dragging.enable();
      map.touchZoom.enable();
      map.doubleClickZoom.enable();
      map.scrollWheelZoom.enable();
      map.boxZoom.enable();
      map.keyboard.enable();
      if (map.tap) map.tap.enable();
    }
  }, [barOpened, map])

  useEffect(() => {
    if(locator.searchLocation && locator.searchResult) {
      const params = {
        travelMethod: locator.travelMethod || 'driving-car',
        start: {
          lat: locator.searchLocation.lat,
          lng: locator.searchLocation.lon
        },
        end: {
          lat: locator.searchResult.locationProperties.lat,
          lng: locator.searchResult.locationProperties.lng
        }
      };
      console.log('hi from search bar get route w/ params', params);
      dispatch(getRoute(params));
    }
  }, [locator, dispatch]);
  
  return (<>
      <Form
        barOpened={barOpened}
        onClick={() => {
          setBarOpened(true);
          if(inputFocus.current) {
            inputFocus.current.focus();
          }
        }}
        onBlur={() => {
          // setBarOpened(false);
        }}
        onSubmit={onFormSubmit}
        formColorPrimary={'#eeeeee'}
        formColorSecondary={'#f28e1c'}
      >
        {!barOpened && 
        <SearchButton 
          type="submit" 
          barOpened={barOpened}
          buttonTextColor={'#f28e1c'}>
          Click to search
        </SearchButton>}
       { barOpened && <Input
          onChange={e => setInput(e.target.value)}
          ref={inputFocus}
          value={input}
          barOpened={barOpened}
          placeholder="Search by postcode, address or city"
        />}
      </Form>
      
    </>
  );
}

export default SearchBar;