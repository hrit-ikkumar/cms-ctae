import React from "react";
import styled, { keyframes } from "styled-components";

function LoadingSpinner({ large }) {
  return <SpinnerContainer large={large ? true : false}></SpinnerContainer>;
}

export default LoadingSpinner;

const spin = keyframes`
  from {
    transform: rotate(1deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  width: ${({ large }) => (large ? "60px" : "30px")};
  height: ${({ large }) => (large ? "60px" : "30px")};
  border-radius: 50%;
  border: 4px solid #ccc;
  border-top-color: var(--primaryColor);
  animation: ${spin} 0.5s linear infinite;
`;
