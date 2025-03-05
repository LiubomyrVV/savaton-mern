import styled, { keyframes } from "styled-components";

// Fade-in animation
const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px; /* Padding for smaller screens */
  z-index: 1000;
`;
export const LoginButton = styled.button`

  background: none;

  color: #fff;

  border: none;

  cursor: pointer;

  font-size: 16px;

  margin-top: 15px;

  text-decoration: underline;


  &:hover {

    color: lightgray;

  }


  @media (max-width: 480px) {

    font-size: 14px;

  }

`;
export const Modal = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 30px;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  width: 90%;
  max-width: 400px;
  text-align: center;
  position: relative;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

export const Title = styled.h2`
  color: #fff;
  margin-bottom: 20px;
  font-size: 22px;

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Input = styled.input`
  padding: 12px;
  border: none;
  border-radius: 5px;
  outline: none;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 16px;
  width: 94%; 

  &::placeholder {
    color: #ddd;
  }

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 14px;
  }
`;

export const Error = styled.span`
  color: red;
  font-size: 14px;
  text-align: left;
`;

export const Button = styled.button`
  background: red;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
  width: 100%;

  &:hover {
    background: darkred;
  }

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 14px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  color: white;
  cursor: pointer;
`;
