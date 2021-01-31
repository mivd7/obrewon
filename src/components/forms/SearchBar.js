import React, { useState, useRef, useEffect } from "react";
import { useMap } from "react-leaflet";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getLocationByAddress } from "../../actions/location";

const Form = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #eeeeee;
  width: ${(props) => (props.barOpened ? "30rem" : "4rem")};
  cursor: ${(props) => (props.barOpened ? "auto" : "pointer")};
  padding: 1rem;
  height: 1rem;
  border-radius: .5rem;
  border: .1rem solid #F28E1C;
  transition: width 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  z-index: 9999;
  margin-top: 1rem;
`;

const Input = styled.input`
  font-size: 20px;
  line-height: 1;
  background-color: transparent;
  width: 100%;
  margin-left: ${props => (props.barOpened ? "1rem" : "0rem")};
  border: none;
  color: black;
  transition: margin 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  &:focus,
  &:active {
    outline: none;
  }
  &::placeholder {
    color: #F28E1C;
  }
`;

const Button = styled.button`
  line-height: 1;
  pointer-events: ${props => (props.barOpened ? "auto" : "none")};
  cursor: ${props => (props.barOpened ? "pointer" : "none")};
  background-color: transparent;
  border: none;
  outline: none;
  color: #F28E1C;
  text-align: left;
  font-size: 14px;
`;

function SearchBar({ locator }) {
  const [input, setInput] = useState("");
  const [barOpened, setBarOpened] = useState(false);
  const formRef = useRef();
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
  return (<>
      <Form
        barOpened={barOpened}
        onClick={() => {
          setBarOpened(true);
          if(inputFocus.current) {
            inputFocus.current.focus();
          }
        }}
        // onFocus={() => {
        //   setBarOpened(true);
        //   if(inputFocus.current) {
        //     inputFocus.current.focus();
        //   }
        // }}
        onBlur={() => {
          setBarOpened(false);
        }}
        onSubmit={onFormSubmit}
        ref={formRef}
      >
        {!barOpened && <Button type="submit" barOpened={barOpened}>
          Click to search
        </Button>}
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