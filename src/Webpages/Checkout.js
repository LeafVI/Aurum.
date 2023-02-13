import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import cardValidator from 'card-validator';
import CreditCardInput from 'react-credit-card-input';

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

const ZipDiv = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
`;

const CCDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PhoneDiv = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
`;

const Input = styled.input`
  margin: 1rem;
  padding: 20px;

  @media (max-width: 1000px) {
   margin: 0.5rem;
   padding: 10px;   
  }
 `;

const ZipInput = styled.input.attrs({ maxLength: 5 })`
 margin-top: 0.5rem;
 margin-bottom: 0.3rem;
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
    creditCard: {
      cardNumber: '',
      cardExpiry: '',
      cardCVC: '',
    },
    zipCode: '',
    address1: '',
    address2: '',
  });

  const [phoneError, setPhoneError] = React.useState(false);
  const [ccError, setCCError] = React.useState(false);
  const [zipCodeError, setZipCodeError] = React.useState(false);
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
    setPhoneError(false);
    setPlaced(false);

    setCheckOutData((prevCheckoutData) => {
      return {
        ...prevCheckoutData,
        phoneNo: event,
      };
    });
  }

  function handleCC(e) {
    const { name, value } = e.target;
    setError(false);
    setCCError(false);
    setPlaced(false);

    if (name === 'cardNumber') {
      const cardType = cardValidator.number(
        checkoutData.creditCard.cardNumber
      ).card;
      if (!cardType || !checkoutData.creditCard.cardNumber.length >= 16) {
        setCCError(true);
      }
    }

    setCheckOutData((prevCheckoutData) => {
      return {
        ...prevCheckoutData,
        creditCard: {
          [name]: value,
        },
      };
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setError(false);
    setPlaced(false);
    setZipCodeError(false);

    if (name === 'zipCode' && value.length != 5) {
      setZipCodeError(true);
      const re = /^[0-9\b]+$/;
      if (value === '' || re.test(value) === false) {
        return;
      }
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

    if (!isValidPhoneNumber(checkoutData.phoneNo)) {
      setPhoneError(true);
      return;
    }

    if (
      !checkoutData.firstname ||
      !checkoutData.lastname ||
      !checkoutData.phoneNo ||
      !checkoutData.creditCard ||
      !checkoutData.zipCode ||
      phoneError ||
      zipCodeError ||
      ccError
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
          {error && (
            <span style={{ color: 'red' }}>
              Fill the form correctly please.
            </span>
          )}
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

            <CCDiv>
              <CreditCardInput
                cardNumberInputProps={{
                  name: 'cardNumber',
                  value: checkoutData.creditCard.cardNumber,
                  onChange: handleCC,
                }}
                cardExpiryInputProps={{
                  name: 'cardExpiry',
                  value: checkoutData.creditCard.cardExpiry,
                  onChange: handleCC,
                }}
                cardCVCInputProps={{
                  name: 'cardCVC',
                  value: checkoutData.creditCard.cardCVC,
                  onChange: handleCC,
                }}
                fieldClassName="form-group"
                onError={() => setCCError(true)}
              />
            </CCDiv>

            <PhoneDiv>
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

              {phoneError && (
                <p style={{ color: 'red', fontSize: '15px', margin: '0.3rem' }}>
                  Invalid Phone number.
                </p>
              )}
            </PhoneDiv>

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

            <ZipDiv>
              <ZipInput
                type="text"
                name="zipCode"
                value={checkoutData.zipCode}
                onChange={handleChange}
                placeholder="Zipcode (Five Digits)"
                pattern="[0-9]+"
              />
              {zipCodeError && (
                <p
                  style={{
                    color: 'red',
                    fontSize: '15px',
                    margin: '0',
                    marginTop: '0.5rem',
                    marginBottom: '0.5rem',
                  }}
                >
                  Zip Code should be 5 digits long.
                </p>
              )}
            </ZipDiv>

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
