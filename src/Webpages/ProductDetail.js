import React from 'react';
import styled from 'styled-components';
import Navbar from '../Components/Navbar';
import Newsletter from '../Components/Newsletter';
import Footer from '../Components/Footer';
import { UilPlus } from '@iconscout/react-unicons';
import { UilMinus } from '@iconscout/react-unicons';
import { ProductData } from '../data';
import { useParams, Link } from 'react-router-dom';

export default function ProductDetail(props) {
  const [count, setCount] = React.useState(0);
  const [isLoggedIn, setisLoggedIn] = React.useState(
    localStorage.getItem('loggedin') ? true : false
  );

  function Add() {
    setCount((prevCount) => prevCount + 1);
  }

  function Subtract() {
    setCount((prevCount) => {
      if (prevCount > 0) {
        return prevCount - 1;
      } else {
        return prevCount;
      }
    });
  }

  const Container = styled.div`
    font-family: 'inter';
  `;
  const DetailContainer = styled.div`
     display: flex;
     margin-top: 10rem;

     @media (max-width: 1000px) {
      margin-top: 2rem;
      flex-direction: column;
    }
  `;

  const ImgContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const InfoContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 20rem;

    @media (max-width: 1000px) {
     margin-bottom: 5rem 
    }
  `;

  const Image = styled.img`
  @media (max-width: 1000px) {
   width: 300px
  }
  `;

  const Title = styled.h1`
     font-weight: 200;
     text-align: center;
     font-size: 4rem;
     margin-bottom: 1rem;

     @media (max-width: 1000px) {
      font-size: 2rem;
      text-wrap: wrap; 
    }
  `;

  const Description = styled.p`
    text-align: center;
    font-weight: 300;

    @media (max-width: 1000px) {
     font-size: 10px 
    }
  `;

  const Price = styled.span`
    margin-top: 2rem;
    margin-bottom: 2rem;
    font-weight: 800;
    font-size: 3rem;
    text-align: center;
  `;

  const Buy = styled.div`
    width: 100%
    margin-top: 5rem;
    margin-left: 5rem;
    display: flex;
    justify-content: center;

    @media (max-width: 1000px) {
     margin-left: 2rem 
    }
  `;

  const Cart = styled.button` 
  padding: 10px;
  width: 250px;
   font-weight: 600;
   font-size: 1.5rem
   border: none;
   cursor: pointer;
   background-color: transparent;
   color: black;
   border: 2px solid #1a1a1a;
   box-shadow: 1px 1px 5px #1a1a1a;

   @media (max-width: 1000px) {
    font-size: 15px;
    margin-right: 2.5rem;
    text-align: center; 
  }
  `;

  const AmountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10rem;


 `;

  const Amount = styled.span`
 padding: 20px;
 border: 2px solid black;
 border-radius: 15px;
 margin: 0 1rem;
 box-sizing: border-box;
 `;

  const Error = styled.span`
  align-self: center;
  margin-left: 2rem;
  color: red;
  font-size: 15px;

  @media (max-width: 1000px) {
   position: relative;
   top: 10rem;
   right: 13.5rem;  
   margin: -1.8rem;
   white-space: no-wrap
  }
 `;

  const OurLink = styled(Link)`
 padding: 10px;
 width: 250px;
  font-weight: 600;
  font-size: 1.5rem;
  cursor: pointer;
  background-color: transparent;
  color: black;
  border: 2px solid #1a1a1a;
  box-shadow: 1px 1px 5px #1a1a1a;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1000px) {
   font-size: 15px;
   margin-right: 2.5rem;
   text-align: center;   
  }
 `;

 // Intializing error and bought.
  const [error, setError] = React.useState(false);
  const [bought, setBought] = React.useState(false);

  
  const styles = {
    color: error ? 'red' : bought ? 'black' : 'red',
  };

  // const productID uses a function, useParams to check the id of the url given to it in the ProductItem Component and thisProduct then uses that id to find the specific product  that the user clicked on, it then uses it's data to display the required Product.
  const { productId } = useParams();
  console.log(productId);
  const thisProduct = ProductData.find(
    (prod) => prod.id === JSON.parse(productId)
  );

  
// localStorage setter for the product that user Added to cart, returns an error if user added 0 items to cart.
  function handleClick(amount, title, img, price) {
    if (amount === 0) {
      setError(true);
    } else {
      setError(false);
      const object = {
        Amount: amount,
        Title: title,
        IMG: img,
        Price: price,
        id: productId,
      };
      localStorage.setItem(`cartitem${productId}`, JSON.stringify(object));
      setBought(true);
    }
  }

  return (
    <Container>
      <Navbar />
      <DetailContainer>
        <ImgContainer>
          <Image src={thisProduct?.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{thisProduct?.title}</Title>
          <Description>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum
            veritatis nulla magni commodi ipsum. Accusantium, totam dolores nemo
            qui beatae non est possimus rerum dolore, asperiores, inventore
            quasi nulla dolorum error aliquid tempora facere iste illum earum
            laborum similique excepturi.
          </Description>
          <Price>${thisProduct?.price}</Price>
          <Buy>
            <AmountContainer>
              <UilMinus cursor="pointer" onClick={Subtract} />
              <Amount>{count}</Amount>
              <UilPlus cursor="pointer" onClick={Add} />
            </AmountContainer>
            {isLoggedIn ? (
              <Cart
                onClick={() =>
                  handleClick(
                    count,
                    thisProduct?.title,
                    thisProduct?.img,
                    thisProduct?.price
                  )
                }
              >
                ADD TO CART
              </Cart>
            ) : (
              <OurLink to="/Login">ADD TO CART</OurLink>
            )}
            {error ? (
              <Error>Cannot add 0 items to cart.</Error>
            ) : bought ? (
              <Error style={styles}>Item has been added to cart.</Error>
            ) : (
              ''
            )}
          </Buy>
        </InfoContainer>
      </DetailContainer>
      <Newsletter />
      <Footer />
    </Container>
  );
}
