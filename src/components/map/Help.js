import questionMark from '../../assets/question.png';

const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
}


const Help = ({ position }) => {
  const positionClass = (position && POSITION_CLASSES[position]) || POSITION_CLASSES.bottomleft;
  return (
    <div className={positionClass}>
      <div className="leaflet-control leaflet-bar help-tool">
        <img src={questionMark} alt="?"/>
      </div>
    </div>
  )
}

export default Help;