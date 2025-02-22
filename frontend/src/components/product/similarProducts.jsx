import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch } from "react-redux";
import ProductCard from "../home/productCard";
import { getRandomProducts } from "../../store/slices/products/productThunks";

const SimilarProducts = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await dispatch(getRandomProducts()).unwrap();
      if (res.success) {
        setProducts(res.products);
      }
    };
    fetchProducts();
  }, [dispatch]);

  return (
    <TrendingSection>
      <Title>
        More <span>Products</span>
      </Title>
      <Grid>
        {products &&
          products.map((product, pidx) => (
            <ProductCard key={pidx} product={product} />
          ))}
      </Grid>
    </TrendingSection>
  );
};

export default SimilarProducts;

const TrendingSection = styled.div`
  max-width: 1180px;
  margin: auto;
  padding: 2rem 0 2rem 0;

  @media (max-width: 479px) {
    padding: 0rem 0.5rem 2rem 0.5rem;
  }
`;

const Animation = keyframes`
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const Title = styled.h2`
  animation: ${Animation} linear;
  animation-timeline: view();
  animation-range: entry 0% cover 50%;
  color: white;
  font-size: 2.5rem;
  text-align: center;

  span {
    background: linear-gradient(90deg, #ff00ff, #ff7300);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 479px) {
    font-size: 2rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;
  margin: 4rem 0;

  @media (max-width: 991px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (max-width: 479px) {
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    margin: 2rem 0;
  }
`;
