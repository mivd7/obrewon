// import { useMemo } from "react";
import { Rectangle } from "react-leaflet";
import questionMark from '../../assets/question.png';

const Help = ({ position }) => {
  return (
    <div className="leaflet-bottom leaflet-left">
      <div className="leaflet-control-layers leaflet-control help-control">
        <Rectangle/>
      </div>
    </div>
  )
}

export default Help;