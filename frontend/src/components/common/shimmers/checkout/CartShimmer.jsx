import React from "react";
import styled, { keyframes } from "styled-components";

const CartShimmer = () => {
  return <ShimmerWrapper></ShimmerWrapper>;
};

export default CartShimmer;

const shimmerAnimation = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
`;

const ShimmerEffect = styled.div`
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.15) 25%,
    rgba(255, 255, 255, 0.25) 50%,
    rgba(255, 255, 255, 0.15) 75%
  );
  background-size: 100% 100%;
  animation: ${shimmerAnimation} 1.5s infinite linear;
  width: 100%;
`;

const ShimmerWrapper = styled(ShimmerEffect)`
  display: grid;
  grid-template-rows: auto auto auto;
  overflow: hidden;
  text-align: center;
  height: 208px;
`;
