import styled, { createGlobalStyle } from "styled-components";

export const Wrapper = styled.div`
  max-width: 300px;
  background: white;
  border-radius: 30px;
  border: 2px solid grey;
  padding: 3em;
  text-align: center;


  p {
      font-size: 1rem;
  }
`;

type ButtonWrapperProps = {
    correct: boolean;
    userClicked: boolean;
}

export const ButtonWrapper = styled.div<ButtonWrapperProps>`

transition: all 0.3s ease;

:hover {
    opacity: 30%
}

button {
    cursor: pointer;
    user-select: none;
    font-size: 0.8rem;
    width: 200px;
    margin: 5px 0;

    background : ${({correct, userClicked}) => 
    correct 
        ? 'green' 
        : !correct && userClicked
        ? 'red'
        : 'grey'
    }
}

`
