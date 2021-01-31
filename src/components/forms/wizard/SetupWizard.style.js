import styled from 'styled-components';
import { NavigateNext } from '@styled-icons/material/NavigateNext'
import { NavigateBefore } from '@styled-icons/material/NavigateBefore';

export const ConfirmButton = styled.button`
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

export const SearchButton = styled.button`
  padding: 10px 24px;
  background: black;
  color: white;
  border: none;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
`;

export const Form = styled.form`
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

export const Input = styled.input`
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

export const ToastImg = styled.img`
  width: 25%;
  height: 25%;
  border-radius: 10px 0 0 10px;
  margin: 10px 0;
`;

export const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const ModalWrapper = styled.div`
  width: 800px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  padding: .75rem;
  text-align: center;
  color: #000;
  position: relative;
  border-radius: 10px;
  line-height: 1.2;
  color: #141414;
  p {
    font-size: 20px;
    margin: 0;
  }
`;

export const GridElement = styled.div`
  display: grid;
  grid-auto-flow: ${props => props.gridAutoFlow};
  align-items: ${props => props.align};
  justify-items: ${props => props.align};
`;

export const Box = styled.div`
  color: black;
  height: auto;
`

export const CloseModalButton = styled.img`
  cursor: pointer;
  width: 32px;
  height: 32px;
  padding-right: 10px;
`;

export const NextButton = styled(NavigateNext)`
  color: ${props => props.color}
  width: 5rem;
  height: 5rem;
  cursor: pointer;
`

export const BackButton = styled(NavigateBefore)`
  color: ${props => props.color}
  width: 5rem;
  height: 5rem;
  cursor: pointer;
`