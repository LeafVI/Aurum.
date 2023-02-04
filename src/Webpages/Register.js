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
 width: 600px;
 height: 600px;
 box-shadow: 2px 2px 50px;
 text-align: center;
`;

const Form = styled.form`
margin-top: 0.5rem;
margin-bottom: 1rem;
display: flex;
flex-wrap: wrap;

justify-content:center;

@media (max-width: 1000px) {
 margin-top: 0    
}

`;

const Div = styled.div`
 display: flex;
 flex-direction: column;
`;

const Input = styled.input`
margin: 1rem;
padding: 20px;

@media (max-width: 1000px) {
  padding: 10px;  
  margin-bottom: 0 
}
`;

const Title = styled.h1`
margin-top: 3rem;
`;

const SignUpBtn = styled(Link)`
display: block;
margin: auto;
margin-top: 0.5rem;
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
  outline-style: solid;
  color: rgb(54, 69, 79);
}

@media (max-width: 1000px) {
 margin: 0
 padding: 10px;
 width: 150px;
 height: 30px;    
}

`;

const Agreement = styled.span`
margin-top: 1rem;
`;

export default function Register({ isLoggedIn }) {
  // Initializing all Data, Error and Navigate.
  const [RegData, setRegData] = React.useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    confPassword: '',
  });
  const [error, setError] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const [userError, setUserError] = React.useState(false);
  const [passError, setPassError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [confError, setConfError] = React.useState(false);
  const navigate = useNavigate();

  // handleChange function which changes RegData state to input with each change and better displays errors according to each input
  function handleChange(event) {
    const { name, value } = event.target;
    setError(false);
    setUserError(false);
    setEmailError(false);
    setPassError(false);
    setConfError(false);

    if (name === 'username' && value.length < 6) {
      setUserError(true);
    }
    if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      setEmailError(true);
    }
    if (name === 'password' && value.length < 8) {
      setPassError(true);
    }
    if (name === 'confPassword' && RegData.password != value) {
      setConfError(true);
    }

    setRegData((prevRegData) => {
      return {
        ...prevRegData,
        [name]: value,
      };
    });
  }

  // handleSubmit function which checks if any of the inputs are empty or not upto the requirements, and if they are it displays an error. If not, it registers the user and sets a localstorage item for the data
  function handleSubmit(event) {
    event.preventDefault();

    if (
      !RegData.email ||
      !RegData.password ||
      !RegData.username ||
      !RegData.firstname ||
      !RegData.lastname ||
      !RegData.confPassword ||
      error ||
      userError ||
      passError ||
      emailError ||
      confError
    ) {
      setError(true);
      setErrorText('Fill out the forms correctly please');
      return;
    }
    if (
      RegData.username.length < 6 ||
      !/\S+@\S+\.\S+/.test(RegData.email) ||
      RegData.password.length < 8 ||
      RegData.password != RegData.confPassword
    ) {
      setError(true);
      setErrorText('Fill out the forms correctly please');
      return;
    }

    localStorage.setItem('auth', JSON.stringify(RegData));
    localStorage.setItem('loggedin', true);
    navigate('/');
  }

  return (
    <Cont>
      <Logo to="/">Aurum.</Logo>
      <Container>
        <RegContainer>
          <Title>REGISTER</Title>
          {error && <span style={{ color: 'red' }}>{errorText}</span>}
          <Form>
            <Input
              type="text"
              name="firstname"
              value={RegData.firstname}
              placeholder="First Name"
              onChange={handleChange}
            />
            <Input
              type="text"
              name="lastname"
              value={RegData.lastname}
              placeholder="Last Name"
              onChange={handleChange}
            />
            <Div>
              <Input
                type="text"
                name="username"
                value={RegData.username}
                placeholder="Username"
                onChange={handleChange}
              />
              {userError && (
                <span style={{ color: 'red', fontSize: '14px' }}>
                  Username must be at least 6 letters.
                </span>
              )}
            </Div>
            <Div>
              <Input
                type="email"
                name="email"
                value={RegData.email}
                placeholder="Email"
                onChange={handleChange}
              />
              {emailError && (
                <span style={{ color: 'red', fontSize: '14px' }}>
                  Invalid Email.
                </span>
              )}
            </Div>
            <Div>
              <Input
                type="password"
                name="password"
                value={RegData.password}
                placeholder="Password"
                onChange={handleChange}
              />
              {passError && (
                <span style={{ color: 'red', fontSize: '14px' }}>
                  Password must be at least 8 letters.
                </span>
              )}
            </Div>
            <Div>
              <Input
                type="password"
                name="confPassword"
                value={RegData.confPassword}
                placeholder="Confirm Password"
                onChange={handleChange}
              />
              {confError && (
                <span style={{ color: 'red', fontSize: '14px' }}>
                  Passwords do not match.
                </span>
              )}
            </Div>

            <SignUpBtn onClick={handleSubmit}>SIGN UP</SignUpBtn>
          </Form>

          <Agreement>
            By Signing Up, I agree and consent with the <b>Privacy Policy</b>{' '}
            and all that it contains.
          </Agreement>
        </RegContainer>
      </Container>
    </Cont>
  );
}
