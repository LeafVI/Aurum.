import React from 'react';
import styled from 'styled-components';
import Navbar from '../Components/Navbar';
import Newsletter from '../Components/Newsletter';
import Footer from '../Components/Footer';
import { UilTrashAlt } from '@iconscout/react-unicons';
import { UilPlus } from '@iconscout/react-unicons';
import { UilMinus } from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';

export default function Cart({ isLoggedIn }) {
  const Container = styled.div`
   font-family: 'inter';
   overflow-x: hidden;
  `;

  const CartCont = styled.div`
   padding: 100px;
   flex-direction: column;

   @media (max-width: 1000px) {
   padding: 0;   
  }
  `;

  const CartInfo = styled.div`
   display: flex;
   margin-top: 5rem;

   @media (max-width: 1000px) {
    flex-direction: column;   
  }
  `;

  const Heading = styled.h1`
   font-size: 3rem;
   text-align: center;

   @media (max-width: 1000px) {
    font-size: 1.5rem;   
  }
  `;

  const Item = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 1000px) {
   flex-direction: column;   
   justify-content: center;
  }
 `;

  const CartItems = styled.div`
   flex: 3;
  `;

  const Image = styled.img`
    width: 300px;

    @media (max-width: 1000px) {
     width: 250px;
     margin-bottom: 2rem;
    }
  `;

  const ItemInfo = styled.div`
   display: flex;
   width: 100%;
   justify-content: space-between;

   @media (max-width: 1000px) {
     margin: auto;
  }
  `;

  const ProductInfo = styled.div`
   display: flex;
   flex-direction: column;
   margin-left: 3rem;

   @media (max-width: 1000px) {
    margin-left:   
    
  }
  `;

  const Name = styled.span`
   font-size: 30px;
   font-weight: bold;
   margin-bottom: 3rem;

   @media (max-width: 1000px) {
    font-size: 15px;   
    white-space: no-wrap;
  }
  `;

  const Size = styled.span`
  font-weight: bold;
  font-size: 30px;

  @media (max-width: 1000px) {
   font-size: 15px;   
  }
  `;

  const Wrapper = styled.div`
   display: flex;
   align-items: center;
  `;

  const AmountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10rem;
  flex-direction: column;
 
  @media (max-width: 1300px) {
    margin-right: 5px;
  }
 `;

  const Amount = styled.span`
 padding: 20px;
 border: 2px solid black;
 border-radius: 15px;
 margin: 0 1rem;
 box-sizing: border-box;

 @media (max-width: 1000px) {
 padding: 10px;     
}
 `;

  const CheckoutList = styled.div`
  flex: 1;
  border: 2px solid rgba(0, 0, 0, 0.5);
  background-color: rgba(200, 200, 200, 0.1);
  max-height: 600px;
  margin-left: 2rem;
  position: relative;
  height: 500px;
  box-sizing: border-box;

  @media (max-width: 1000px) {
   
   width: 320px;
  }

 `;
  const Price = styled.span`
    margin-top: 2rem;
    margin-bottom: 2rem;
    font-weight: 800;
    font-size: 3rem;
   
    @media (max-width: 1000px) {
     font-size: 1rem 
    }
  `;

  const ProductPrice = styled.div`
   margin-bottom: 2rem;
  `;

  const Hr = styled.hr`
  margin: 2rem 0rem;

  @media (max-width: 1000px) {
      
  }
  `;

  const Hr2 = styled.hr`
    margin: 0;
    position: relative;
    top: 40px;
  `;

  const TotalCont = styled.div`
   display: flex;
   flex-direction: column;
   
  `;

  const Span = styled.span`
  text-align: center;
  margin-top: 5rem;
  
  `;
  const Button = styled(Link)`
   margin-top: 2rem; 
   padding: 7px;
   box-sizing: border-box;
   border: none;
   background: rgba(0, 0, 0, 0.5);
   color: white;
   font-weight: 800;
   cursor: pointer;
   text-shadow: 1px 1px 1px black;
   text-align: center;
  `;

  const Total = styled.span`
   font-size: 20px;
   font-weight: bold;
   text-align: center;
   margin-top: 5rem;
 

  `;

  // Intializing Summary Values and Data
  let Delivery = 0;
  let subTotal = 0;
  let ObjectArray = [];

  // function checker which uses a for loop to check the total number of items in localStorage, and if even one of them exists, pushes it into ObjectArray.
  function checker() {
    for (let i = 0; i < 7; i++) {
      if (localStorage.getItem(`cartitem${i}`)) {
        ObjectArray.push(JSON.parse(localStorage.getItem(`cartitem${i}`)));
      }
    }
  }
  checker();

  // cartData state which initializes as objectArray after checker has run.
  const [cartData, setCartData] = React.useState(ObjectArray);

  // function handleDelete which filters the previous Cartdata according to if given id matches id of any of the objects present in CartData.
  function handleDelete(pID) {
    setCartData((prevArray) =>
      prevArray.filter((prevObject) => prevObject.id !== pID)
    );
    localStorage.removeItem(`cartitem${pID}`);
  }

  function handleIncrement(pID) {
    setCartData((prevState) => {
      const newState = prevState.map((obj) => {
        if (obj.id === pID) {
          return { ...obj, Amount: obj.Amount + 1 };
        }

        return obj;
      });

      return newState;
    });
  }

  function handleDecrement(pID) {
    setCartData((prevState) => {
      const newState = prevState.map((obj) => {
        if (obj.id === pID) {
          if (obj.Amount > 0) {
            return { ...obj, Amount: obj.Amount - 1 };
          } else {
            return { ...obj };
          }
        }

        return obj;
      });

      return newState;
    });
  }

  // function handleCheckout which removes all cartitems stored in check out and makes a singular Array of data to be set in localstorage and given to checkout Page.
  function handleCheckout(Data) {
    for (let i = 0; i < 6; i++) {
      if (localStorage.getItem(`cartitem${i}`)) {
        localStorage.removeItem(`cartitem${i}`);
      }
    }
    localStorage.setItem('data', JSON.stringify(Data));
  }

  return (
    <Container>
      <Navbar />
      <CartCont>
        <Heading>YOUR CART ({cartData.length})</Heading>
        <CartInfo>
          <CartItems>
            {/* Mapping over cartData to display Cart Items. */}
            {cartData?.map((Object) => {
              subTotal += JSON.parse(Object.Price * Object.Amount);
              return (
                <>
                  <Item>
                    <Image src={Object.IMG} />
                    <ItemInfo>
                      <ProductInfo>
                        <Name>ITEM: {Object.Title}</Name>
                        <Size>ID: {Object.id}</Size>
                      </ProductInfo>
                      <AmountContainer>
                        <ProductPrice>
                          <Price>${Object.Price}</Price>
                        </ProductPrice>
                        <Wrapper>
                          <UilMinus
                            cursor="pointer"
                            cursor="pointer"
                            onClick={() => handleDecrement(Object.id)}
                          />
                          <Amount>{Object.Amount}</Amount>
                          <UilPlus
                            cursor="pointer"
                            onClick={() => handleIncrement(Object.id)}
                          />
                          <UilTrashAlt
                            style={{ alignSelf: 'center', marginLeft: '5px' }}
                            cursor="pointer"
                            onClick={() => handleDelete(Object.id)}
                          />
                        </Wrapper>
                      </AmountContainer>
                    </ItemInfo>
                  </Item>
                  <Hr />
                </>
              );
            })}

            {/* If there isn't any data in the cart, then the cart displays No items. */}
            {cartData == '' && (
              <Total style={{ marginLeft: '50%' }}>No Items in Cart.</Total>
            )}
          </CartItems>
          <CheckoutList>
            <Heading>Cart Summary</Heading>
            <TotalCont>
              <Span>Subtotal: ${subTotal}</Span>
              <Hr2 />
              <Span>Delivery Costs: ${Delivery}</Span>
              <Hr2 />
              <Total>TOTAL: ${subTotal + Delivery}</Total>
              {/* Displays the checkout button if there is more than one item in the cart.*/}
              {cartData.length > 0 && (
                <Button onClick={() => handleCheckout(cartData)} to="/Checkout">
                  CHECKOUT
                </Button>
              )}
            </TotalCont>
          </CheckoutList>
        </CartInfo>
      </CartCont>
      <Newsletter />
      <Footer />
    </Container>
  );
}
