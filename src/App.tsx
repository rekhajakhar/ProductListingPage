import './App.css';
import './css/cart.css';
import "./components/infiniteScroll/infiniteScroll.css";

import ProductListing from './components/ProductListing';
import ProductTable from './components/ProductTable';
import CartContainer from './components/CartContainer';
import AutoCompleteSearchBox from './components/searchBox/AutoCompleteSearchBox';
import InfiniteList from './components/infiniteScroll/InfiniteList';

function App() {
  return (
    <div>
      <InfiniteList />
    </div>
  )
}

export default App

