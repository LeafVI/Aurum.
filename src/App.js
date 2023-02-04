import React from 'react';
import Home from './Webpages/Home';
import ProductPage from './Webpages/ProductPage';
import ProductDetail from './Webpages/ProductDetail';
import Register from './Webpages/Register';
import Login from './Webpages/Login';
import Cart from './Webpages/Cart';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Checkout from './Webpages/Checkout'

function App() {

  // Checking if User is logged in
  
  const [isLoggedIn, setisLoggedIn] = React.useState(
    localStorage.getItem('loggedin') ? true : false
  );
  

  // Setting up Routes
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Products" element={<ProductPage />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Cart" element={<Cart/>} />
        <Route path="/Products/:productId" element={<ProductDetail/>} />
        <Route path='/Checkout' element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
