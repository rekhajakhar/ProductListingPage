import './App.css';
import './css/cart.css';
import ProductListing from './components/ProductListing';
import ProductTable from './components/ProductTable';
import CartContainer from './components/CartContainer';
import AutoCompleteSearchBox from './components/searchBox/AutoCompleteSearchBox';

function App() {
  return (
    <div>
      <AutoCompleteSearchBox />
    </div>
  )
}

export default App

