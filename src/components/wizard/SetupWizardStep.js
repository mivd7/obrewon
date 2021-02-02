import { useState } from "react";
import toast from '../../assets/toast.svg';
import LocationStep from './LocationStep';
import RouteStep from './RouteStep';
import { ToastImg, Box } from './SetupWizard.style';

function WelcomeStep() {
  return(<Box> 
    <h1>Welcome to O'Brewon</h1>
    <p>The app for thirsty beer lovers, which will help you find the closest brewery near you and shows you how to get there. Let's get started!</p>
    <ToastImg src={toast} alt="biertje?"/>
  </Box>)
}

export const SetupWizardStep = ({step, user, handleNext, closeWizard}) => {
  //user has to have a location
  const [locationStepDone, setLocationStepDone] = useState(false);
  return (<>
    {step === 'welcome' && <WelcomeStep/>}
    {step === 'location' && <LocationStep user={user} onLocationConfirmed={() => {
      setLocationStepDone(true);
      handleNext();
    }}/>}
    {step === 'route' && locationStepDone && <RouteStep onDone={closeWizard} user={user}/>}
    {step === 'route' && !locationStepDone && <p>You didn't set your location yet. Please go back a step and tell O'Brewon where you're at</p>}
  </>);
}

export default SetupWizardStep;
