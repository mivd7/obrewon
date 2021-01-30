// import React, { useState } from "react";
import styled from 'styled-components';
import toast from '../../assets/toast.svg';

const ToastImg = styled.img`
  width: 25%;
  height: 25%;
  border-radius: 10px 0 0 10px;
  margin: 10px 0;
`;

export function SetupWizardStep({step, stepIndex}) {
  function WelcomeStep() {
    return(<> 
      <h1>Welcome to O'Brewon</h1>
      <p>The app for thirsty people and beer lovers, which finds the closest brewery near you. Let's get started!</p>
      <ToastImg src={toast} alt="biertje?"/>
    </>)
  }

  function WelcomeStep() {
    return(<> 
      <h1>Welcome to O'Brewon</h1>
      <p>The app for thirsty people and beer lovers, which finds the closest brewery near you. Let's get started!</p>
      <ToastImg src={toast} alt="biertje?"/>
    </>)
  }
  return (<>
    {step === 'welcome' && <WelcomeStep/>}
  </>);
}

export default SetupWizardStep;
