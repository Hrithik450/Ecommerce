import React from "react";
import styled, { keyframes } from "styled-components";

const CategoryShimmer = () => {
  return <ShimmerWrapper></ShimmerWrapper>;
};

export default CategoryShimmer;

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
    rgba(200, 200, 200, 0.1) 25%,
    /* Light gray */ rgba(220, 220, 220, 0.3) 50%,
    /* Slightly darker gray */ rgba(200, 200, 200, 0.1) 75%
  );
  background-size: 200% 100%;
  animation: ${shimmerAnimation} 1.5s infinite linear;
  width: 100%;
`;

const ShimmerWrapper = styled(ShimmerEffect)`
  display: grid;
  grid-template-rows: auto auto auto;
  overflow: hidden;
  text-align: center;
  height: 265px;
  background-color: white;
  border: 1px solid #ddd;

  @media (max-width: 479px) {
    height: 175.6px;
  }
`;
