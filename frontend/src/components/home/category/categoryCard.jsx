import React from "react";
import styled, { keyframes } from "styled-components";
import { FaExternalLinkAlt } from "react-icons/fa";

const Collections = {
  "round-neck": "Round Neck",
  "v-neck": "V Neck",
  "full-sleeve": "Full Sleeve",
  "half-sleeve": "Half Sleeve",
  hoodie: "Hoodie",
  oversize: "Oversize",
};

const CategoryCard = ({ product }) => {
  const calculateDiscountPercentage = (salePrice, price) => {
    if (salePrice >= price) {
      return 0;
    }
    const discountAmount = price - salePrice;
    const discountPercentage = (discountAmount / price) * 100;
    return discountPercentage.toFixed(2);
  };

  return (
    <Card href={`/${product.catRef}`}>
      <div className="icon">
        <FaExternalLinkAlt />
      </div>
      <img src={product?.image} alt="" />
      <div className="text-content">
        <p>
          <span className="off">
            {calculateDiscountPercentage(product?.salePrice, product?.price)}%
          </span>
          <span className="sym">OFF</span>
        </p>
        <h3>{product?.typeName}</h3>
      </div>
    </Card>
  );
};

export default CategoryCard;

const Animation = keyframes`
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const Card = styled.a`
  animation: ${Animation} linear;
  animation-timeline: view();
  animation-range: entry 0% cover 50%;
  overflow: hidden;
  display: block;
  text-decoration: none;
  position: relative;
  width: 100%;
  cursor: pointer;

  img {
    width: 100%;
  }

  .icon {
    animation: ${Animation} 0.3s ease-in-out;
    cursor: pointer;
    display: none;
    position: absolute;
    color: white;
    right: 1rem;
    top: 1rem;
    z-index: 2;
    svg {
      font-size: 1.5rem;
    }
    @media (max-width: 479px) {
      right: 0.8rem;
      top: 0.8rem;
      svg {
        font-size: 1rem;
      }
    }
  }

  .text-content {
    position: absolute;
    bottom: 1rem;
    left: 2rem;

    h3 {
      color: white;
      font-size: 1.5rem;
      margin-bottom: 0.7rem;
      width: max-content;
      text-align: center;
      cursor: pointer;
    }

    p {
      text-align: left;
      color: white;
      font-size: 1.2rem;
      font-weight: 800;
      cursor: pointer;
      margin-bottom: 0.2rem;

      .sym {
        padding-left: 0.5rem;
      }

      .off {
        padding: 0 0.5rem;
        border-radius: 3px;
        background: linear-gradient(90deg, #ff00ff, #ff7300);
      }
    }

    @media (max-width: 479px) {
      left: 1rem;
      transform: translateX(0%);

      h3 {
        font-size: 1rem;
      }

      p {
        font-size: 0.8rem;
      }
    }
  }

  &:hover {
    img {
      transform: scale(1.1);
      transition: transform 0.3s ease;
    }

    .icon {
      display: block;
    }
  }
`;
