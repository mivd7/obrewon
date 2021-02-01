import { useState } from 'react';
import styled from 'styled-components';
import {AltRoute} from '@styled-icons/material'
import { Background, GridElement, ModalWrapper } from '../wizard/SetupWizard.style';
import RouteStep from '../wizard/RouteStep';

const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
}

const AltRouteIcon = styled(AltRoute)`
  color: black;
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
`

const RoutePlanner = ({ position }) => {
  const positionClass = (position && POSITION_CLASSES[position]) || POSITION_CLASSES.bottomleft;
  const [configOpened, setConfigOpened] = useState(false)
  return (<>
    {!configOpened && 
      <div className={positionClass}>
        <div onClick={() => setConfigOpened(true)} className="leaflet-control leaflet-bar help-tool">
          <AltRouteIcon/>
        </div>
      </div>}
    {configOpened && 
      <Background>
        <ModalWrapper>
          <GridElement gridAutoFlow="column" align="center">
            <RouteStep onDone={() => setConfigOpened(false)}/>
          </GridElement>
        </ModalWrapper>
      </Background>}
    
  </> 
  )
}

export default RoutePlanner;