import styled from 'styled-components';

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

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