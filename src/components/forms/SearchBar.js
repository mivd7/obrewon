import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getLocationByAddress } from "../../actions/location";

const Form = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #F4F4F4;
  /* Change width of the form depending if the bar is opened or not */
  width: ${(props) => (props.barOpened ? "30rem" : "4rem")};
  /* If bar opened, normal cursor on the whole form. If closed, show pointer on the whole form so user knows he can click to open it */
  cursor: ${(props) => (props.barOpened ? "auto" : "pointer")};
  padding: 1rem;
  height: 1rem;
  border-radius: .5rem;
  border: .1rem solid black;
  transition: width 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  z-index: 9999;
  margin-top: 1rem;
`;

const Input = styled.input`
  font-size: 14px;
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
    color: grey;
  }
`;

const Button = styled.button`
  line-height: 1;
  pointer-events: ${props => (props.barOpened ? "auto" : "none")};
  cursor: ${props => (props.barOpened ? "pointer" : "none")};
  background-color: transparent;
  border: none;
  outline: none;
  color: black;
`;

function SearchBar() {
  const [input, setInput] = useState("");
  const [barOpened, setBarOpened] = useState(false);
  const formRef = useRef();
  const inputFocus = useRef();
  const dispatch = useDispatch();

  const onFormSubmit = e => {
    e.preventDefault();
    setInput("");
    setBarOpened(false);
    dispatch(getLocationByAddress(input))
  };
  
  return (<>
      <Form
        barOpened={barOpened}
        onClick={() => {
          setBarOpened(true);
          if(inputFocus.current) {
            inputFocus.current.focus();
          }
        }}
        onFocus={() => {
          setBarOpened(true);
          if(inputFocus.current) {
            inputFocus.current.focus();
          }
        }}
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