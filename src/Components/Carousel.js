import React from 'react';
import styled from 'styled-components';
import { sliderItems } from '../data.js';
import { UilArrowLeft } from '@iconscout/react-unicons';
import { UilArrowRight } from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';

export default function Carousel() {
  const Carousel = styled.div`
     display: flex;
     align-items: center;
     margin-top: 1rem;
     width: 100vw;
     height: 90vh;
     overflow: hidden;
     font-family: 'Inter';
  `;

  const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
  `;

  const SlidesContainer = styled.div`
     display: flex;
     transition: all 1.5s ease;
     transform: translateX(${(props) => props.slideIndex * -100}vw)
  `;

  const Slide = styled.div`
     display: flex;
     align-items: center;
     background-color: ${(props) => '#' + props.bg};
     width: 100vw;
     
     @media (max-width: 1000px) {
      height: 50vh 
    }
  `;

  const Img = styled.div`
     flex: 2;
     display: flex; 
     justify-content: center;
  `;

  const Image = styled.img`
  @media (max-width: 1000px) {
    width: 250px;   
  }
  `;

  const Info = styled.div`
     flex: 1;
     position: relative;
     right: 10rem;
     bottom: 5rem;
     text-align: center;

     @media (max-width: 1000px) {
      right: 2.5rem;
      bottom: 2rem; 
    }
  `;

  const Title = styled.h1`
    font-weight: bold;
    font-size: 3rem;
    
    @media (max-width: 1000px) {
     font-size: 20px; 
    }
  `;

  const Description = styled.p`
    font-size: 20px;

    @media (max-width: 1000px) {
     font-size: 10px 
    }
  `;

  const Button = styled(Link)`
    cursor: pointer;
    color: white;
    background-color: black;
    border: none;
    border-radius: 10px;
    font-weight: bold;
    padding: 1rem 2rem;
    text-decoration: none;

    @media (max-width: 1000px) {
      margin-top: 2rem;
      padding: 5px;
    }
  `;

  const Arrow = styled.div`
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      height: 50px;
      width: 50px;
      border-radius: 50%;
      background-color: white;
      left: ${(props) => props.direction === 'left' && '10px'};
      right: ${(props) => props.direction === 'right' && '20px'};
      margin: auto;
      cursor: pointer;

      @media (max-width: 1000px) {
       height: 20px;
       width: 20px;
      }
  `;

  // Initializing Slide number

  const [slideNo, setSlideNo] = React.useState(0);


  // Function handleClick which changes the slide number on arrow click.
  function handleClick() {
    setSlideNo((prevSlideNo) => (prevSlideNo === 0 ? 1 : 0));
  }

  return (
    <Carousel>
      <Container>
        <SlidesContainer slideIndex={slideNo}>
       {/* Mapping over sliderItems */}
          {sliderItems.map((slides) => (
            <Slide bg={slides.bg}>
              <Img>
                <Image src={slides.img} />
              </Img>
              <Info>
                <Title>{slides.title}</Title>
                <Description>{slides.desc}</Description>
                <Button to={`/Products/${slides.id}`}>Shop Now</Button>
              </Info>
            </Slide>
          ))}
        </SlidesContainer>
        <Arrow direction="left" onClick={handleClick}>
          <UilArrowLeft />
        </Arrow>
        <Arrow direction="right" onClick={handleClick}>
          <UilArrowRight />
        </Arrow>
      </Container>
    </Carousel>
  );
}
