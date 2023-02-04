import React from 'react';
import Navbar from '../Components/Navbar';
import Carousel from '../Components/Carousel';
import Products from '../Components/Products'
import Newsletter from '../Components/Newsletter'
import Footer from '../Components/Footer'

export default function Home({ isLoggedIn }) {
  
  
  
  return (
    <>
      <Navbar />
      <Carousel />
      <Products />
      <Newsletter />
      <Footer />
    </>
  );
}
