import React from 'react';
import Navbar from '../Components/Navbar';
import styled from 'styled-components';
import Products from '../Components/Products';
import Footer from '../Components/Footer'
import Newsletter from '../Components/Newsletter'

export default function ProductPage({ isLoggedIn }) {
  const Container = styled.div`
  `;



  return (
    <Container>
      <Navbar />
      <Products />
      <Newsletter />
      <Footer />
    </Container>
  );
}
