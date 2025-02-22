import React from "react";
import styled from "styled-components";
import Navbar from "../../components/layout/Navbar/Navbar";
import { object } from "../../components/common/Config";
import AboutPage from "../../components/about/about";
import Footer from "../../components/layout/Footer";

const About = () => {
  return (
    <AboutSection>
      <Navbar object={object} />
      <AboutPage />
      <Footer header={true} />
    </AboutSection>
  );
};

export default About;

const AboutSection = styled.section`
  background-color: #2b4162;
  background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);
`;
