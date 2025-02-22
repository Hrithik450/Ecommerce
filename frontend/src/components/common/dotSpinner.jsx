import React from "react";
import styled, { keyframes } from "styled-components";

const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  margin: 0 5px;
  background-color: ${({ color }) => color || "white"};
  border-radius: 50%;
  animation: ${bounce} 1.4s infinite ease-in-out;
  animation-delay: ${({ delay }) => delay || "0s"};
`;

const DotSpinner = () => {
  return (
    <SpinnerContainer>
      <Dot delay="0s" />
      <Dot delay="0.2s" />
      <Dot delay="0.4s" />
    </SpinnerContainer>
  );
};

export default DotSpinner;
