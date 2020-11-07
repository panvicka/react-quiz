import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
 html {
     height:100%;
 }

 body {
     background-color:grey;
     font-family: 'Nunito', sans-serif;

 }

 * {
     padding: 0;
     margin: 0;
     box-sizing: border-box;
 }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  >p {
      color: white;
  }

  .score {
      color: white;
  }
`;
