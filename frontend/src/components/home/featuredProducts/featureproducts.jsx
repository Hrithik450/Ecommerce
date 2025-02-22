import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getSectionProducts } from "../../../store/slices/products/productThunks";
import ProductCardShimmer from "../../common/shimmers/product/productCardShimmer";
import ProductCard from "../productCard";

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const { productLoading } = useSelector((state) => state.product);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await dispatch(
        getSectionProducts({ sectionName: "Featured Product" })
      ).unwrap();
      if (res.success) {
        setProducts(res.products);
      }
    };
    fetchProducts();
  }, [dispatch]);

  return (
    <FeaturedProduct>
      <Title>
        Featured <span>Products</span>
      </Title>
      <Grid>
        {productLoading
          ? [...Array(6)].map((_, pidx) => (
              <ProductCardShimmer key={`shimmer-${pidx}`} />
            ))
          : products &&
            products.map((product, pidx) => (
              <ProductCard key={pidx} product={product} />
            ))}
      </Grid>
    </FeaturedProduct>
  );
};

export default FeaturedProducts;

const FeaturedProduct = styled.div`
  min-height: 100vh;
  max-width: 1180px;
  margin: auto;
  padding: 2rem 1.5rem;

  @media (max-width: 479px) {
    padding: 2rem 0.5rem;
  }
`;

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

const Title = styled.h2`
  animation: ${Animation} linear;
  animation-timeline: view();
  animation-range: entry 0% cover 50%;
  color: white;
  font-size: 3rem;
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
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
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
