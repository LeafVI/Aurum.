import React from 'react';
import styled from 'styled-components';
import { UilShoppingBag } from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';

export default function ProductItem({ Product }) {
  const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  opacity: 0;
  cursor: pointer;
  background-color: white;
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;

  const Img = styled.img`
    min-width: 280px;
    height: 300px;
  `;

  const Bag = styled(Link)`
    color: black;
    text-decoration: none;
  `;

  const Container = styled.div`
     display: flex;
     overflow: hidden;
     background-color: lightblue;
     padding: 2rem;
     max-width: 350px;
     margin: 12px;
     align-items: center;
     justify-content: center;
     transition: all 0.5s ease;

     &:hover {
       transition: all 0.5s ease;
       background-color: red;
     }
     &:hover ${Icon}{
       opacity: 1;
     }
     &:hover ${Img}{
       transition: all 0.5s ease;
       opacity: 0.5;
     }

     @media (max-width: 1000px) {
      width: 100vw; 
    }
  `;

  return (
    <Container>
      <Img src={Product.img} />
      <Icon>
        {/* A routing link which opens the specific product detail page for the product clicked on. */}
        <Bag to={`/Products/${Product.id}`}>
          <UilShoppingBag />
        </Bag>
      </Icon>
    </Container>
  );
}
