import { Provider } from 'react-redux';
import MapView from './components/map/MapView';
import './App.css';
import breweries from './data/breweries';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <MapView breweries={breweries} />
    </Provider>
  );
}
export default App;