import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSpring, animated } from 'react-spring';

import close from '../../assets/close.svg';
import { getAddressByLocation } from '../../actions/user';
import SetupWizardStep from './SetupWizardStep';
import { Background, ModalWrapper, CloseModalButton, NextButton, BackButton, GridElement, Box} from './SetupWizard.style'

const SetupWizard = ({ showModal, closeWizard }) => {
  const [show, setShow] = useState(showModal)
  const [stepIndex, setStepIndex] = useState(0);
  const steps = ['welcome', 'location', 'route'];
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(user.geolocation && !user.address) {
      dispatch(getAddressByLocation(user.geolocation.coords))
    }
  }, [user, dispatch]);

  const handleNext = () => {
    setStepIndex(stepIndex + 1);
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
            <ModalWrapper>
              <GridElement gridAutoFlow="row" align="right">
                <Box>
                  <CloseModalButton
                    aria-label='Close modal'
                    src={close}
                    onClick={() => {
                      setShow(false);
                      closeWizard();
                    }} />
                </Box>
              </GridElement>
              <GridElement gridAutoFlow="column" align="center">
                <SetupWizardStep 
                  step={steps[stepIndex]} 
                  user={user} 
                  handleNext={handleNext} 
                  closeWizard={() => {
                    setShow(false)
                    closeWizard()
                  }}/>
              </GridElement>
              <GridElement gridAutoFlow="column" align="center">
                <Box>
                  <BackButton onClick={handleBack} color={stepIndex === 0 ? "#DCDAD1" : "#3fb984"}/>
                </Box>
                <Box>
                  <p>Step {stepIndex + 1} of {steps.length}</p>
                </Box>
                <Box>
                  <NextButton onClick={handleNext} color={stepIndex === steps.length ? "#DCDAD1" : "#3fb984"}/>
                </Box>
              </GridElement>
            </ModalWrapper>
          </animated.div>
        </Background>}
    </>
  );
};

export default SetupWizard;