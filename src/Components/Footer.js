import React from 'react';
import styled from 'styled-components';

export default function Footer() {
  const Footer = styled.div`
   display: flex;
   justify-content: center;
   margin-top: 3rem;
   background: black;
   height: 20px;
  `;

  const Copyright = styled.span`
   color: white;
  `;

  return (
    <Footer>
      <Copyright>© 2022 LeafVI, All rights reserved.</Copyright>
    </Footer>
  );
}
