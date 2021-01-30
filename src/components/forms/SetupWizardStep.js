// import React, { useState } from "react";
import styled from 'styled-components';
import toast from '../../assets/toast.svg';
import LocationStep from './LocationStep';

const ToastImg = styled.img`
  width: 25%;
  height: 25%;
  border-radius: 10px 0 0 10px;
  margin: 10px 0;
`;


function WelcomeStep() {
  return(<> 
    <h1>Welcome to O'Brewon</h1>
    <p>The app for thirsty beer lovers, which will help you find the closest brewery near you and shows you how to get there. Let's get started!</p>
    <ToastImg src={toast} alt="biertje?"/>
  </>)
}

export const SetupWizardStep = ({step, user, handleNext}) => {
  return (<>
    {step === 'welcome' && <WelcomeStep/>}
    {step === 'location' && <LocationStep user={user} onLocationConfirmed={handleNext}/>}
    {step === 'transportation' && <>
      <iframe title="We're the brews!" width="560" height="315" src="https://www.youtube.com/embed/K1ktUkwsoQM" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      <p>Here be details of the closest brewery and calculate route based on transportation method</p>
    </>}
  </>);
}

export default SetupWizardStep;
