import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { parse, isValidNumber } from 'libphonenumber-js';

const Logo = styled(Link)`
  font-family: 'inter';      
  font-size: 35px;
        font-weight: bold;
        cursor: pointer;
        text-decoration: none;
        color: black;
        position: absolute;
        left: 2rem;
        top: 20px;

        &:hover{
          color: #1a1a1a;
        }
        
  `;

const Cont = styled.div`
   position: relative;
   overflow-x: hidden;
  `;

const Container = styled.div`
    font-family: 'inter';
    width: 100vw;
    height: 100vh;
    background-color: #fbf0f4;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;

    justify-content: space-around;
    align-items: center;
    background-position: center;

    @media (max-width: 1000px) {
     flex-direction: column;
     height: 100%    

    }
  `;

const CartCont = styled.div`
  background: white;
   border 2px solid rgba(1, 1, 1, 0.2);
   width: 600px;
   height: 600px;
   box-shadow: 2px 2px 50px;
   text-align: center;

   @media (max-width: 1000px) {
   width: 300px;
   height: 600px;   
   margin-top: 10rem;
   margin-bottom: 2rem;
  }

  `;

const RegContainer = styled.div`
  background: white;
  border 2px solid rgba(1, 1, 1, 0.2);
  width: 600px;
  height: 600px;
  box-shadow: 2px 2px 50px;
  text-align: center;
  display: flex;
  flex-direction: column;

  @media (max-width: 1000px) {
  width: 300px;
  height: 600px;   
  margin-top: 10rem;
 }
`;

const Form = styled.form`
  margin-top: 0.5rem;
  @media (max-width: 1000px) {
   margin: 0   
  }
 `;

const Input = styled.input`
  margin: 1rem;
  padding: 20px;

  @media (max-width: 1000px) {
   margin: 0.5rem;
   padding: 10px;   
  }
 `;

const Title = styled.h1`
  margin-top: 3rem;
 `;

const BBtn = styled.button`
  display: block;
  margin: auto;
  padding: 10px 20px;
  width: 300px;
  height: 60px;
  border: none;
  cursor: pointer;
  background-color: rgba(54, 69, 79, 0.3);
  border-radius: 10px;
  font-weight: 400;
  font-size: 25px;
  text-decoration: none;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover{
    background-color: white;
    border: 2px solid rgba(54, 69, 79, 0.3);
    color: rgb(54, 69, 79);
  }
  
  @media (max-width: 1000px) {
   padding: 0;
   width: 200px;
   margin-top: 1rem;   
   height: 40px;
  }
  `;

const Div = styled.div`
    
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3rem;
    outline-style: solid;
  `;

const Span = styled.span`
    margin: 1rem;
    
    padding: 10px;
  `;

const TotalSpan = styled.span`
   font-weight: bold;
   
  `;

const PInputStyle = {
  width: '40px',
};

export default function Checkout() {
  const [checkoutData, setCheckOutData] = React.useState({
    firstname: '',
    lastName: '',
    phoneNo: '',
    creditCard: '',
    zipCode: '',
    address1: '',
    address2: '',
  });

  const [countryCode, setCountryCode] = React.useState('PK');
  const [error, setError] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const [placed, setPlaced] = React.useState(false);

  // Initialiing Data and Total value, then Mapping over the data to return a "Summary" of the order
  let Total = 0;
  const data = JSON.parse(localStorage.getItem('data'));
  const dataItems = data.map((object) => {
    Total += object.Price * object.Amount;

    return (
      <>
        <Div>
          <Span>{object.Title}</Span>
          <Span>Price: ${object.Price}</Span>
          <Span>Amount: {object.Amount}</Span>
        </Div>
      </>
    );
  });

  function handlePhone(event) {
    setCheckOutData((prevCheckoutData) => {
      return {
        ...prevCheckoutData,
        phoneNo: event,
      };
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setError(false);
    setPlaced(false);

    if (name === 'phoneNo' && value.length != 11) {
      setError(true);
      setErrorText(
        'Invalid Phone Number (Should be 11 digits and start with 03).'
      );
    } else if (name === 'phoneNo' && !/^03/.test(value)) {
      setError(true);
      setErrorText(
        'Invalid Phone Number (Should be 11 digits and start with 03).'
      );
    }
    if (name === 'creditCard' && !/^(?:4[0-9]{12}(?:[0-9]{3})?)$/.test(value)) {
      setError(true);
      setErrorText('Invalid Visa Credit Card Number.');
    }
    if (name === 'zipCode' && value.length != 5) {
      setError(true);
      setErrorText('Zip Code should be 5 letters.');
    }

    setCheckOutData((prevCheckoutData) => {
      return {
        ...prevCheckoutData,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !checkoutData.firstname ||
      !checkoutData.lastname ||
      !checkoutData.phoneNo ||
      !checkoutData.creditCard ||
      !checkoutData.zipCode ||
      error
    ) {
      setError(true);
      setErrorText('Fill out the forms correctly please');
      return;
    }
    if (
      checkoutData.phoneNo.length != 11 ||
      !/^03/.test(checkoutData.phoneNo) ||
      !/^(?:4[0-9]{12}(?:[0-9]{3})?)$/.test(checkoutData.creditCard) ||
      checkoutData.zipCode.length != 5
    ) {
      setError(true);
      setErrorText('Fill out the forms correctly please');
      return;
    }
    setPlaced(true);
  }

  return (
    <Cont>
      <Logo to="/">Aurum.</Logo>
      <Container>
        <RegContainer>
          <Title>Checkout</Title>
          {error && <span style={{ color: 'red' }}>{errorText}</span>}
          {placed && (
            <span style={{ color: 'black' }}> Your order has been placed </span>
          )}
          <Form>
            <Input
              type="text"
              name="firstname"
              value={checkoutData.firstname}
              onChange={handleChange}
              placeholder="First Name"
            />

            <Input
              type="text"
              name="lastname"
              value={checkoutData.lastname}
              onChange={handleChange}
              placeholder="Last Name"
            />

            <PhoneInput
              value={checkoutData.phoneNo}
              onChange={handlePhone}
              placeholder="Phone Number"
              style={{ width: '250px', padding: '30px' }}
              defaultCountry="PK"
              countries={['PK']}
              maxlength="12"
              id="phoneInputID"
            />

            <Input
              type="text"
              name="creditCard"
              value={checkoutData.creditCard}
              onChange={handleChange}
              placeholder="Credit Card No. (VISA)"
            />

            <Input
              type="text"
              name="address1"
              value={checkoutData.address1}
              onChange={handleChange}
              placeholder="Address"
            />

            <Input
              type="text"
              name="address2"
              value={checkoutData.address2}
              onChange={handleChange}
              placeholder="2nd Address"
            />

            <Input
              type="text"
              name="zipCode"
              value={checkoutData.zipCode}
              onChange={handleChange}
              placeholder="Zipcode (Five Digits)"
            />

            <BBtn onClick={handleSubmit}>Place Order</BBtn>
          </Form>
        </RegContainer>
        <CartCont>
          <Title>Your Order</Title>
          <TotalSpan>TOTAL: ${Total}</TotalSpan>
          {dataItems}
        </CartCont>
      </Container>
    </Cont>
  );
}
