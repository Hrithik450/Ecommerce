import React from "react";
import styled, { keyframes } from "styled-components";

const ShimmerHeroSection = () => {
  return (
    <ShimmerWrapper>
      <ShimmerPart1 />
      <ShimmerPart2 />
      <ShimmerPart3 />
      <ShimmerPart4 />
    </ShimmerWrapper>
  );
};

export default ShimmerHeroSection;

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

const ShimmerWrapper = styled.section`
  padding: 12rem 1.5rem 1.5rem 1.5rem;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  gap: 0.25rem;
  color: white;
  overflow: hidden;
  width: 100%;

  @media (max-width: 991px) {
    padding: 8rem 1rem 1.5rem 1rem;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
`;

const ShimmerPart1 = styled(ShimmerEffect)`
  grid-column: span 2;
  grid-row: span 2;
  overflow: hidden;
  height: 564.4px;

  @media (max-width: 991px) {
    grid-row: span 2;
    grid-column-start: 1;
  }
`;

const ShimmerPart2 = styled(ShimmerEffect)`
  height: 100%;
  overflow: hidden;
`;

const ShimmerPart3 = styled(ShimmerEffect)`
  height: 100%;
  grid-row-start: 2;
  grid-column-start: 3;
  overflow: hidden;

  @media (max-width: 991px) {
    grid-row-start: 3;
    grid-column-start: 1;
  }
`;

const ShimmerPart4 = styled(ShimmerEffect)`
  height: 100%;
  grid-row: span 2;
  overflow: hidden;

  @media (max-width: 991px) {
    grid-row-start: 2;
    grid-column-start: 2;
    grid-row: span 2;
  }
`;
