import React, { useRef, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
// import { NavigateNext } from '@styled-icons/material/NavigateNext'
// import { NavigateBefore } from '@styled-icons/material/NavigateBefore';
// import {Zap} from '@styled-icons/octicons';
import close from '../../assets/close.svg';
import { Container, NavButtonContainer } from "../ui";
import SetupWizardStep from "./SetupWizardStep";

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  position: relative;
  border-radius: 10px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  button {
    padding: 10px 24px;
    background: transparent;
    color: #3FB984;
    border: none;
    margin: 0 10px;
    font-weight: bold;
    font-size: 16px;
  }
  p {
    font-size: 20px;
    margin: 0;
  }
`;

const CloseModalButton = styled.img`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
`;




const SetupWizard = ({ showModal }) => {
  const modalRef = useRef();
  const [show, setShow] = useState(showModal)
  const [stepIndex, setStepIndex] = useState(0);
  const steps = ['welcome', 'transportation', 'location'];
  const handleNext = () => {
    setStepIndex(stepIndex + 1);
  }

  const handleBack = () => {
    setStepIndex(stepIndex - 1);
  }

  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`
  });

  return(
    <>
      {show && 
        <Background ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
              <ModalContent>
              <Container>
                <SetupWizardStep step={steps[stepIndex]}/>
                <NavButtonContainer>
                  <button>Back</button>
                  <button>Next</button>
                </NavButtonContainer>
              </Container>
                {/* <SetupWizardContent step={steps[stepIndex]} onNext={handleNext} onPrevious={handlePrev}/> */}
              </ModalContent>
            </ModalWrapper>
            <CloseModalButton
                aria-label='Close modal'
                src={close}
                onClick={() => setShow(false)}
              />
          </animated.div>
        </Background>}
    </>
  );
};

export default SetupWizard;