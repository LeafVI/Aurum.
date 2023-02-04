import React from 'react';
import styled from 'styled-components';
import ProductItem from './ProductItem';
import { ProductData } from '../data.js';

export default function Products() {
  const Container = styled.div`
    display: flex;
    margin-top: 4rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    font-family: 'inter';
  `;

  const Heading = styled.h1`
     font-size: 3rem;
     font-weight: bold;
     z-index: 4
  `;

  const ProductCont = styled.div`
     display: flex;
     flex-wrap: wrap;

     
  `
    return (
    <Container>
      <Heading>Products</Heading>
      <ProductCont>
        {/* Mapping over our Product data to display singular Products. */}
      {ProductData.map((Product) => (
        <ProductItem key={Product.id} Product={Product} />
      ))}
      </ProductCont>
    </Container>
  );
}
