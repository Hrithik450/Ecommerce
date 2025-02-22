import React from "react";
import { FaArrowRight } from "react-icons/fa";
import styled, { keyframes } from "styled-components";

const Footer = ({ header }) => {
  return (
    <Container>
      {header && (
        <Header>
          <Title>
            Style Speaks, <br />
            <span>
              Quality Defines <Highlight>Your Identity.</Highlight>
            </span>
          </Title>
          <Subtitle>
            This tagline captures the essence of a premium t-shirt eCommerce
            brand by emphasizing how fashion is a form of self-expression, while
            quality ensures lasting impressions.
          </Subtitle>
          <BtnCont>
            <Button href="/products">
              <span>Explore More</span>
              <RightIcon />
            </Button>
          </BtnCont>
        </Header>
      )}
      <FooterComp>
        <ContactInfo>
          <h3>ABOUT US</h3>
          <h1>TEAM ANOX</h1>
          <p>
            A bold statement that reflects individuality and the superior
            craftsmanship of your t-shirts. It conveys that every piece is
            designed to make a statement while delivering exceptional quality
            that stands the test of time. - Team Anox
          </p>
        </ContactInfo>
        <FooterLinks>
          <Section>
            <SectionTitle>Pages</SectionTitle>
            <LinkList>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/products">Products</a>
              </li>
              <li>
                <a href="/products?Collections=hoodie">Hoodie</a>
              </li>
              <li>
                <a href="/products?Collections=round-neck">Round Neck</a>
              </li>
              <li>
                <a href="/products?Collections=oversize">Oversize</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
            </LinkList>
          </Section>
          <Section>
            <SectionTitle>Social</SectionTitle>
            <LinkList>
              <li>
                <a href="https://www.instagram.com/anoxfashion?utm_source=qr&igsh=cTRwaXRmdHBzd3Y2">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/hruthik-m-3595a0329?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://youtube.com/@mhrithik450?si=0a4luiMfbWBBLmoI">
                  Youtube
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/share/15Qw2rcR8o/">
                  Facebook
                </a>
              </li>
            </LinkList>
          </Section>
          <Section className="policy-section">
            <SectionTitle>Policy</SectionTitle>
            <LinkList>
              <li>
                <a href="/terms-and-conditions">Terms and Conditions</a>
              </li>
              <li>
                <a href="/privacy-policy">Privacy Policy</a>
              </li>
              <li>
                <a href="/shipping-policy">Shipping Policy</a>
              </li>
              <li>
                <a href="/contact-us">Contact Us</a>
              </li>
              <li>
                <a href="/refund-policy">Cancellation and Refunds</a>
              </li>
            </LinkList>
          </Section>
          <Section className="subscribe">
            <SectionTitle>Subscribe</SectionTitle>
            <LinkList className="address">
              <p>
                Get all the latest information on events, sales and offers. Sign
                up for newsletter:
              </p>
            </LinkList>
            <input placeholder="Email Address" />
            <div className="btn-cont">
              <button>Submit</button>
            </div>
          </Section>
        </FooterLinks>
      </FooterComp>
      <div className="bottom-footer">
        <a href="/privacy-policy">Privacy Policy</a>
        <p className="bottom-2">
          © 2025-2026 All rights reserved | Designed and Developed by{" "}
          <a href="https://hruthik.onrender.com">
            <span>Hruthik M</span>
          </a>
        </p>
        <a href="/terms-and-conditions" className="bottom-3">
          Terms and Conditions
        </a>
      </div>
    </Container>
  );
};

export default Footer;

const Animation = keyframes`
  from {
    transform: scale(0.7);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const Container = styled.div`
  max-width: 1480px;
  margin: auto;
  padding: 2rem 0;
  color: #fff;
  text-align: center;

  .bottom-footer {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    gap: 0.5rem;
    font-size: 1.1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    padding: 1rem 0 0 0;
    a {
      text-decoration: none;
      cursor: pointer;
      color: white;

      &:hover {
        text-decoration: underline;
      }

      span {
        color: blue;
      }
    }

    @media (max-width: 991px) {
      grid-template-columns: 1fr 1fr;
      row-gap: 1rem;

      .bottom-2 {
        grid-column: span 2;
      }

      .bottom-3 {
        grid-row-start: 1;
        grid-column-start: 2;
      }
    }

    @media (max-width: 479px) {
      font-size: 0.9rem;
      p {
        max-width: 90%;
        margin: auto;
      }
    }
  }

  @media (max-width: 762px) {
    padding: 2rem 0;
  }

  @media (max-width: 479px) {
    padding: 0 1rem 2rem 1rem;
  }
`;

const Header = styled.div`
  padding: 8rem 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 479px) {
    padding: 2rem 20px;
  }
`;

const Title = styled.h1`
  animation: ${Animation} linear;
  animation-timeline: view();
  animation-range: entry 0% cover 40%;
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 20px;

  @media (max-width: 991px) {
    text-align: left;
  }

  @media (max-width: 479px) {
    font-size: 3rem;
  }
`;

const Highlight = styled.span`
  background: linear-gradient(90deg, #ff00ff, #ff7300);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  animation: ${Animation} linear;
  animation-timeline: view();
  animation-range: entry 0% cover 40%;

  max-width: 550px;
  font-size: 1.1rem;
  font-weight: 300;
  margin: 2rem auto;

  @media (max-width: 991px) {
    text-align: left;
    margin: 2rem 0;
  }
`;

const BtnCont = styled.div`
  animation: ${Animation} linear;
  animation-timeline: view();
  animation-range: entry 0% cover 40%;
  overflow: hidden;
  margin-top: 1.5rem;

  @media (max-width: 991px) {
    text-align: left;
  }

  @media (max-width: 479px) {
    margin-top: 3rem;
  }
`;

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  background: linear-gradient(90deg, #ff00ff, #ff7300);
  color: white;
  padding: 0 0.5rem;
  font-weight: bold;
  border-radius: 50px;
  text-decoration: none;
  font-size: 2.5rem;
  white-space: nowrap;
  gap: 0.5rem;

  &:hover {
    opacity: 0.8;
  }

  span {
    font-size: 1.2rem;
    padding: 1rem 0.5rem;
  }
`;

const RightIcon = styled(FaArrowRight)`
  color: black;
  border-radius: 50%;
  background: white;
  padding: 0.7rem;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const FooterComp = styled.div`
  animation: ${Animation} linear;
  animation-timeline: view();
  animation-range: entry 0% cover 40%;
  display: flex;
  justify-content: space-between;
  margin: auto;
  padding: 5rem 20px;

  @media (max-width: 991px) {
    width: 100%;
    flex-direction: column;
  }

  @media (max-width: 479px) {
    width: 100%;
    flex-wrap: wrap;
    padding: 1rem;
  }
`;

const ContactInfo = styled.div`
  flex: 1;
  margin: 2rem auto;
  text-align: left;

  h1 {
    margin: 1rem 0;
    font-size: 2.5rem;
  }

  p {
    max-width: 70%;
    line-height: 1.5;
  }

  @media (max-width: 470px) {
    p {
      max-width: 100%;
    }
  }
`;

const FooterLinks = styled.div`
  flex: 2;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1.5fr;
  gap: 1rem;

  @media (max-width: 479px) {
    grid-template-columns: 1fr 1fr;

    .policy-section {
      grid-row-start: 2;
      grid-column: span 2;
    }

    .subscribe {
      grid-column: span 2;
    }
  }
`;

const Section = styled.div`
  .address {
    text-align: left;
    a {
      display: block;
      color: white;
      margin: 1rem 0;
    }
  }

  input {
    width: 100%;
    margin: 1rem 0;
    padding: 0.6rem 1rem;
    border-radius: 40px;
    border: 1px solid white;
    background-color: #2b4162;
    background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);
    color: white;
    font-size: 1.1rem;
  }

  .btn-cont {
    width: 100%;
    text-align: left;
  }

  button {
    padding: 0.5rem 2rem;
    border-radius: 40px;
    font-size: 1.1rem;
    cursor: pointer;
    font-weight: 800;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 1.3rem 0;
  text-align: left;

  @media (max-width: 479px) {
    font-size: 1.2rem;
  }
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    text-align: left;
    margin: 1rem 0;
    font-size: 1.2rem;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }

    a {
      text-decoration: none;
      color: white;
    }

    @media (max-width: 479px) {
      font-size: 1rem;
    }
  }
`;
