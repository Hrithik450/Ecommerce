import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { object } from "../../components/common/Config";
import useOAuthSuccess from "../../hooks/googleauth";
import useUserID from "../../hooks/auth";
import Navbar from "../../components/layout/Navbar/Navbar";
import Footer from "../../components/layout/Footer";
import Hero from "../../components/home/hero/hero";
import FeaturedProducts from "../../components/home/featuredProducts/featureproducts";
import Categories from "../../components/home/category/categories";
import ForYouProducts from "../../components/home/forYou/forYou";

const Home = () => {
  useUserID();
  const isLoading = useOAuthSuccess();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <HomeSection>
        <Navbar object={object} />
        <Hero />
        <ForYouProducts />
      </HomeSection>
      <Categories />
      <HomeSection>
        <FeaturedProducts />
      </HomeSection>
      <HomeSection>
        <Footer header={true} />
      </HomeSection>
    </>
  );
};

export default Home;

const HomeSection = styled.section`
  position: relative;
  background-color: #2b4162;
  background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);
`;
