import L from 'leaflet';
import beer from '../assets/beer.svg';
import youAreHere from '../assets/you-are-here-marker.svg';
import home from '../assets/home.svg';

const youAreHereIcon = new L.Icon({
    iconUrl: youAreHere,
    iconRetinaUrl: youAreHere,
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [1,-15],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    className: 'leaflet-div-icon'
});

const beerIcon = new L.Icon({
  iconUrl: beer,
  iconRetinaUrl: beer,
  iconSize: [32, 40],
  iconAnchor: [16, 40],
  popupAnchor: [0, -35],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  className: 'leaflet-beer-icon'
});

const animatedBeerIcon = new L.Icon({
  iconUrl: beer,
  iconRetinaUrl: beer,
  iconSize: [32, 40],
  iconAnchor: [16, 40],
  popupAnchor: [0, -35],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  className: 'animated-beer-icon'
});

const homeIcon = new L.Icon({
  iconUrl: home,
  iconRetinaUrl: home,
  iconSize: [32, 40],
  iconAnchor: [16, 40],
  popupAnchor: [0, -35],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  className: 'leaflet-home-icon'
});

export {
  youAreHereIcon,
  beerIcon,
  animatedBeerIcon,
  homeIcon
}