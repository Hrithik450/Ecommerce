import React from "react";
import styled, { keyframes } from "styled-components";

const AboutPage = () => {
  const storedData = JSON.parse(sessionStorage.getItem("productData"));

  return (
    <Container>
      <Header>
        <Title>TEAM ANOX</Title>
        <TextContent>
          <div className="description">
            <Description className="para-1">
              At Team Anox, every piece is crafted to make a statement. Our
              designs blend individuality with superior craftsmanship, ensuring
              style and quality that stand the test of time
            </Description>
            <Description className="para-2">
              We don’t just follow trends—we create timeless fashion. With
              premium fabrics and precision detailing, Team Anox delivers bold,
              lasting style for those who dare to stand out.
            </Description>
          </div>
          <StatsContainer>
            <Stat>
              <h1>{storedData?.totalProducts || 16}+</h1>
              <p>Products</p>
            </Stat>
            <Stat>
              <h1>2025</h1>
              <p className="length">
                Years of <span>Started</span>
              </p>
            </Stat>
            <Stat>
              <h1>{storedData?.totalValue || "10k"}+</h1>
              <p>Total Valuation</p>
            </Stat>
          </StatsContainer>
        </TextContent>
      </Header>

      <ImagesContainer>
        <div className="img-block-1">
          <Image
            className="image image-1"
            src="https://res.cloudinary.com/duozomapm/image/upload/v1739085930/Leonardo_Phoenix_10_Render_a_highresolution_4K_cinematic_image_3_isszeh.jpg"
            alt="TEAM ANOX"
            rotation="-20deg"
          />
          <Image
            className="image image-2"
            src="https://res.cloudinary.com/duozomapm/image/upload/v1739086038/Leonardo_Phoenix_10_Generate_a_highresolution_4K_cinematic_ima_0_wwxr4v.jpg"
            alt="TEAM ANOX"
            rotation="10deg"
          />
        </div>
        <div className="img-block-2">
          <Image
            className="image image-3"
            src="https://res.cloudinary.com/duozomapm/image/upload/v1739085930/Leonardo_Phoenix_10_Render_a_highresolution_4K_cinematic_image_0_jocybw.jpg"
            alt="TEAM ANOX"
            rotation="5deg"
          />
          <Image
            className="image image-4"
            src="https://res.cloudinary.com/duozomapm/image/upload/v1739086038/Leonardo_Phoenix_10_Generate_a_highresolution_4K_cinematic_ima_1_ne3zns.jpg"
            alt="TEAM ANOX"
            rotation="-20deg"
          />
        </div>
      </ImagesContainer>
    </Container>
  );
};

export default AboutPage;

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
  background: transparent;
  max-width: 1280px;
  margin: auto;
  height: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15rem 3rem 5rem 3rem;
  overflow: hidden;

  @media (max-width: 479px) {
    padding: 10rem 0 0 0;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
  gap: 2rem;

  @media (max-width: 991px) {
    flex-direction: column;
  }

  @media (max-width: 479px) {
    padding: 2rem;
  }
`;

const Title = styled.div`
  animation: ${Animation} 1000ms ease-in-out;
  flex: 1;
  text-align: left;
  font-size: 3rem;
  font-weight: bold;
  background: linear-gradient(90deg, #ff00ff, #ff7300);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 479px) {
    margin: 0 0 2rem 0;
  }
`;

const TextContent = styled.div`
  flex: 2;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  .description {
    display: flex;
    gap: 2rem;

    @media (max-width: 479px) {
      gap: 1rem;
      flex-direction: column;
    }
  }
`;

const Description = styled.div`
  animation: ${Animation} 1000ms ease-in-out;
  text-align: right;
  font-size: 1.1rem;
  line-height: 1.8;
  color: white;
  text-align: left;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 60px 0 30px 0;

  @media (max-width: 762px) {
    gap: 3rem;
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 479px) {
    grid-template-columns: 1fr;
  }
`;

const Stat = styled.div`
  animation: ${Animation} 1000ms ease-in-out;
  text-align: left;

  & > h1 {
    font-size: 3rem;
    color: white;
    margin: 0;
  }

  & > p {
    font-size: 18px;
    color: white;
  }
`;

const ImagesContainer = styled.div`
  max-width: 1160px;
  width: 100%;
  animation: ${Animation} linear;
  animation-timeline: view();
  animation-range: entry 0% cover 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 0 0 0;

  @media (max-width: 762px) {
    flex-direction: column;
  }

  @media (max-width: 479px) {
    padding: 1rem 0 0 0;
  }

  .img-block-2,
  .img-block-1 {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 991px) {
      flex-direction: column;
    }

    @media (max-width: 479px) {
      flex-wrap: wrap;
    }

    .image {
      position: relative;
      width: 320px;
      height: 440px;
    }

    .image-1 {
      left: 10%;
      transform: rotate(-15deg);

      @media (max-width: 991px) {
        left: 11%;
        top: 0%;
        z-index: 2;
      }

      @media (max-width: 762px) {
        left: 0%;
      }
    }

    .image-2 {
      top: 2%;
      left: 1%;
      z-index: 2;
      transform: rotate(15deg);

      @media (max-width: 991px) {
        left: 12%;
        top: -11%;
      }

      @media (max-width: 762px) {
        left: 0%;
      }
    }

    .image-3 {
      top: -2%;
      right: 4%;
      z-index: 1;

      @media (max-width: 991px) {
        top: 1%;
        right: 0%;
      }

      @media (max-width: 762px) {
        right: 0%;
        z-index: 2;
        transform: rotate(-15deg);
      }
    }

    .image-4 {
      top: 2%;
      right: 20%;
      transform: rotate(-15deg);

      @media (max-width: 991px) {
        top: -4%;
        right: 12%;
        z-index: 2;
        transform: rotate(-10deg);
      }

      @media (max-width: 762px) {
        right: 0%;
        transform: rotate(15deg);
      }
    }
  }
`;

const Image = styled.img`
  max-width: 100%;
  vertical-align: middle;
  display: inline-block;
  border: 2px solid white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;
