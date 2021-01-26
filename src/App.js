import MapView from './components/MapView';
import './App.css';
import breweries from './data/breweries';

function App() {
  return (
    <div className="App">
      <MapView breweries={breweries} />
    </div>
  );
}
export default App;