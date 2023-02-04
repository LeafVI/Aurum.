import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

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
  `;

const Container = styled.div`
    font-family: 'inter';
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ), url('https://images.unsplash.com/photo-1615405988866-94a0a4b0eac1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    background-position: center;
  `;

const RegContainer = styled.div`
   background: white;
   border 2px solid rgba(1, 1, 1, 0.2);
   width: 400px;
   height: 400px;
   box-shadow: 2px 2px 50px;
   text-align: center;
 `;

const Form = styled.form`
  display: flex;
  flex-direction: column;
 `;

const Input = styled.input`
  margin: 0.5rem;
  padding: 20px;
 `;

const Title = styled.h1`
  margin-top: 3rem;
 `;

const SignUpBtn = styled.button`
  display: block;
  margin: auto;
  margin-top: 1rem;
  padding: 10px 20px;
  width: 300px;
  height: 60px;
  border: none;
  cursor: pointer;
  background-color: rgba(54, 69, 79, 0.3);
  border-radius: 10px;
  font-weight: 400;
  font-size: 25px;
  margin-bottom: 0.5rem;

  &:hover{
    background-color: white;
    border: 2px solid rgba(54, 69, 79, 0.3);
    color: rgb(54, 69, 79);
  }
 `;

const Register = styled(Link)`
 color: black
 `;
export default function Login({ isLoggedIn }) {
  // intializing error and data
  const navigate = useNavigate();
  const [loginData, setLoginData] = React.useState({
    email: '',
    password: '',
  });
  const [error, setError] = React.useState(false);
  const auth = JSON.parse(localStorage.getItem('auth'));

  function handleChange(event) {
    const { name, value } = event.target;

    setLoginData((prevLoginData) => {
      return {
        ...prevLoginData,
        [name]: value,
      };
    });
  }

  // handleSubmit function which checks if authorization exists and if it does, matching them to the inputs given by the user and logging them in if returns true, else displays an error.
  function handleSubmit(event) {
    event.preventDefault();

    if (
      auth?.email === loginData.email &&
      auth?.password === loginData.password
    ) {
      localStorage.setItem('loggedin', true);
      navigate('/');
    } else {
      setError(true);
    }
  }

  return (
    <Cont>
      <Logo to="/">Aurum.</Logo>
      <Container>
        <RegContainer>
          <Title>Login</Title>
          {error ? (
            <span style={{ margin: 0, color: 'red' }}>
              Your Credentials Do Not Match.
            </span>
          ) : (
            ''
          )}
          <Form>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
            />
            <Input
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
            />

            <SignUpBtn onClick={handleSubmit}>Login</SignUpBtn>
          </Form>
          <Register to="/Register">Register</Register>
        </RegContainer>
      </Container>
    </Cont>
  );
}
