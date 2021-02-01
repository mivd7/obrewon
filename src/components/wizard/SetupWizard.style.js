import styled from 'styled-components';
import { NavigateNext } from '@styled-icons/material/NavigateNext'
import { NavigateBefore } from '@styled-icons/material/NavigateBefore';

export const ConfirmButton = styled.button`
  padding: 10px 24px;
  background: ${props => props.buttonColor};
  color: ${props => props.buttonTextColor};
  border: 1px solid ${props => props.buttonTextColor};
  border-radius: .5rem;
  margin: 5px 10px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
`;

export const Form = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  height: 1rem;
  border-radius: .5rem;
  transition: width 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  margin-top: 1rem;
  background: ${props => props.formColorPrimary};
  border: 1px solid ${props => props.formColorSecondary};
`;

export const Input = styled.input`
  font-size: 14px;
  line-height: 1;
  width: 100%;
  margin-left: ${props => (props.barOpened ? "1rem" : "0rem")};
  transition: margin 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  border: none;
  background-color: inherit;
  color: #141414;
  outline: none;
  &::placeholder {
    color: #eeeee;
  }
`;

export const SearchButton = styled.button`
  line-height: 1;
  pointer-events: auto;
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
  text-align: left;
  font-size: 14px;
  font-weight: bold;
  color: ${props => props.buttonTextColor}
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
    font-size: 16px;
    margin: 0;
  }
  @media (max-width: 400px) {
    width: 100%;
  }
`;

export const GridElement = styled.div`
  display: grid;
  grid-auto-flow: ${props => props.gridAutoFlow};
  grid-column-end: ${props => props.columnEnd};
  grid-column-start: ${props => props.columnStart};
  align-items: ${props => props.align};
  justify-items: ${props => props.align};
`;

export const Box = styled.div`
  color: black;
  height: auto;
  margin: ${props => props.margin};
  padding: 0 17px;
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