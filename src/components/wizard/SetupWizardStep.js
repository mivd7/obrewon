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

export const SetupWizardStep = ({step, handleNext, closeWizard}) => {
  //user has to have a location
  return (<>
    {step === 'welcome' && <WelcomeStep/>}
    {step === 'location' && <LocationStep onLocationConfirmed={handleNext}/>}
    {step === 'route' && <RouteStep onDone={closeWizard}/>}
  </>);
}

export default SetupWizardStep;
