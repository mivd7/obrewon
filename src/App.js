import MapView from './components/map/MapView';
import './App.css';
import breweries from './data/breweries';

function App() {
  return (
    <div className="App">
      {/* <LayerTest/> */}
      <MapView breweries={breweries} />
    </div>
  );
}
export default App;