import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { NavigateNext } from '@styled-icons/material/NavigateNext'
import { NavigateBefore } from '@styled-icons/material/NavigateBefore';

import close from '../../assets/close.svg';
import SetupWizardStep from "./SetupWizardStep";
import { getAddressByLocation } from '../../actions/user';

const WizardStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  text-align: center;
`;

const NavButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

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
  line-height: 1.2;
  color: #141414;
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

const NextButton = styled(NavigateNext)`
  color: ${props => props.color}
  width: 5rem;
  height: 5rem;
  cursor: pointer;
`

const BackButton = styled(NavigateBefore)`
  color: ${props => props.color}
  width: 5rem;
  height: 5rem;
  cursor: pointer;
`

const SetupWizard = ({ showModal }) => {
  const [show, setShow] = useState(showModal)
  const [stepIndex, setStepIndex] = useState(0);
  const steps = ['welcome', 'location', 'transportation'];
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(user.geolocation && !user.address) {
      dispatch(getAddressByLocation(user.geolocation.coords))
    }
  }, [user, dispatch]);

  const handleNext = () => {
    if(steps[stepIndex + 1]) {
      setStepIndex(stepIndex + 1);
    }
  }

  const handleBack = () => {
    if(stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
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
        <Background>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
              <ModalContent>
              <WizardStepContainer>
                <SetupWizardStep step={steps[stepIndex]} user={user} handleNext={handleNext}/>
                <NavButtonContainer>
                  <BackButton onClick={handleBack} color={stepIndex === 0 ? "#DCDAD1" : "#3fb984"}/>
                  <p>Step {stepIndex + 1} of {steps.length}</p>
                  <NextButton onClick={handleNext} color={stepIndex === steps.length ? "#DCDAD1" : "#3fb984"}/>
                </NavButtonContainer>
              </WizardStepContainer>
              </ModalContent>
            </ModalWrapper>
            <CloseModalButton
                aria-label='Close modal'
                src={close}
                onClick={() => setShow(false)} />
          </animated.div>
        </Background>}
    </>
  );
};

export default SetupWizard;