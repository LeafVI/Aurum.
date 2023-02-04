import React from 'react';
import styled from 'styled-components';
import { UilShoppingCart } from '@iconscout/react-unicons';
import { UilUserCircle } from '@iconscout/react-unicons';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [DropMenu, setDropMenu] = React.useState(false);

  const Nav = styled.nav`
     display: flex;
     align-items: center;
     justify-content: space-between;
     width: 100%;
     font-family: 'Inter';
     margin-top: 1rem;
     box-sizing: border-box;
  `;

  const Left = styled.div`
     display: flex;
     flex: 1
  `;

  const Middle = styled.div`
    display: flex;
    flex: 1;
    
   
  `;

  const Logo = styled(Link)`
        font-size: 35px;
        font-weight: bold;
        margin-left: 2rem;
        cursor: pointer;
        text-decoration: none;
        color: black;


        &:hover{
          color: #1a1a1a;
        }
        
        @media (max-width: 1000px) {
         font-size: 25px;
        }
  `;

  const Right = styled.div`
     color: black;   
     display: flex;
     align-items: center;
     margin-right: 1rem;
     box-sizing: border-box;

     @media (max-width: 1000px) {
       flex-direction: column;
       
    }
 `;

  const Login = styled(Link)`
     font-size: 15px;
     margin-right: 15px;
     display: flex;
     align-items: center;
     cursor: pointer;
     text-decoration: none;
     color: black;
     text-decoration: none;


     &:hover{
      color: #2b2b2b;
    }
    
    @media (max-width: 1000px) {
      font-size: 15px;
      margin-right: 5px;
      margin-bottom: 10px;
}
 `;

  const Products = styled(Link)`
 font-size: 20px;
 display: flex;
 align-items: center;
 cursor: pointer;
 text-align: center;
 font-weight: 200;
 margin-left: 50px;
 margin-top: 1rem;
text-decoration: none;
color: black;  

 &:hover{
  color: #2b2b2b;
}

@media (max-width: 1000px) {
  margin-bottom: 10px;
  position: relative;
  right: 25px;
  font-size: 15px;
}
`;

  const Register = styled(Link)`
     font-size: 15px;
     margin-right: 15px;
     display: flex;
     align-items: center;
     cursor: pointer;
     text-decoration: none;
     color: black;
     text-decoration: none;

     &:hover{
      color: #2b2b2b;
    }
    
    @media (max-width: 1000px) {
      margin-bottom: 10px;
    }
 `;

  const Cart = styled(Link)`
  color: black;
  text-decoration: none;

  @media (max-width: 1000px) {
   
}
 `;

  const Username = styled.span`
 font-size: 15px;
 margin-right: 25px;
 display: flex;
 align-items: center;
 cursor: pointer;
 text-decoration: none;
 color: black;
 text-decoration: none;
 
 
 @media (max-width: 1000px) {
      
}
 `;

  const Dropdown = styled.div`
  margin-top: 0.2rem;
  
  display:flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: ${DropMenu ? '10px' : 'initial'}
 `;

  const DropDownContent = styled.div`
  height: initial;
  width: 100%;
  border: none;
  border-radius: 5px;
  margin-right:2rem;
  
  position: relative;
  z-index: 1;
  display: ${DropMenu ? 'block' : 'none'};
  background: black;
  text-align: center;
  box-shadow: 1px 1px 5px black;
  transform: ${DropMenu ? 'translateY(10px)' : ''};

  &::after{
    content: " ";
  position: absolute;
  right: 25px;
  top: -11px;
  border-top: none;
  border-right: 15px solid transparent;
  border-left: 15px solid transparent;
  border-bottom: 15px solid black;
  
  }
 `;

  const DropDownOptions = styled.span`
   cursor: pointer;
   color: white;

   &:hover{
     color: grey;
   }
 `;

  // Intializing navigate and user logged in cookies.

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    localStorage.getItem('loggedin') ? true : false
  );

  function handleClick() {
    localStorage.removeItem('loggedin');
    navigate('/Login');
  }

  return (
    <Nav>
      <Left>
        <Logo to="/">Aurum.</Logo>
      </Left>
      <Middle>
        <Products to="/Products">Products</Products>
      </Middle>
      <Right>
        {/* Checks if user is logged in and if they are, displays Username instead of login or register options. */}
        {isLoggedIn ? (
          <>
            <UilUserCircle style={{}} />
            <Dropdown
              onMouseEnter={() => {
                setTimeout(function () {
                  setDropMenu((prev) => !prev);
                }, 500);
              }}
              onMouseLeave={() => {
                setDropMenu((prev) => !prev);
              }}
            >
              <Username>
                {JSON.parse(localStorage.getItem('auth')).username}
              </Username>
              <DropDownContent>
                <DropDownOptions onClick={() => handleClick()}>
                  Log Out
                </DropDownOptions>
              </DropDownContent>
            </Dropdown>
          </>
        ) : (
          <>
            <Login to="/Login">Login</Login>
            <Register to="/Register">Register</Register>
          </>
        )}
        {/* Cart Icon which only redirects user to Cart Screen if user is logged in. */}
        <Cart to={isLoggedIn ? '/Cart' : '/Login'}>
          <UilShoppingCart cursor="pointer"></UilShoppingCart>
        </Cart>
      </Right>
    </Nav>
  );
}
