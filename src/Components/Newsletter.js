import React from 'react';
import styled from 'styled-components';
import { UilMessage } from '@iconscout/react-unicons';

export default function Newsletter() {
  const Container = styled.div`
    font-family: 'inter';
    background-color: rgba(242, 195, 207, .3);
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 8rem;
  `;

  const Heading = styled.h1`
    font-weight: bold;
    font-size: 4rem;
    margin: 0;
  `;

  const Description = styled.p`
    font-size: 1.5rem;
  `;

  const InputCont = styled.div`
    display: flex;
    border: 2px solid black;
    background: white;
    align-items: center;
  `;

  const Input = styled.input`
    border: none;
    background: transparent;
    padding: 20px 40px;
    
    &:focus{
      outline: none;
    }
  `;

  return (
    <Container>
      <Heading>Newsletter</Heading>
      <Description>
        Timely updates regarding our products, just an email away.
      </Description>
      <InputCont>
        <Input />
        <UilMessage cursor="pointer"/>
      </InputCont>
    </Container>
  );
}
