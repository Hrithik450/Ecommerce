import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { getHeroProducts } from "../../../store/slices/products/productThunks";
import ShimmerHeroSection from "../../common/shimmers/home/HeroShimmer";

const Hero = () => {
  const [HeroProducts, setHeroProducts] = useState([]);
  const { productLoading } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await dispatch(getHeroProducts()).unwrap();
      if (res.success) {
        setHeroProducts(res.products);
      }
    };
    fetchProducts();
  }, [dispatch]);

  return (
    <HeroSection>
      {productLoading ? (
        <Loading>
          <ShimmerHeroSection />
        </Loading>
      ) : (
        <>
          <div className="container">
            <div className="part-1">
              <img src={HeroProducts[1]?.image} alt="" />
              <div className="text-content">
                <p className="head-tag">Combo Mega Discount 🎉</p>
                <h3>{HeroProducts[1]?.typeName}</h3>
                <h2>
                  <span>{HeroProducts[1]?.saleDiscount}%</span> OFF
                </h2>
                <p className="price-tag">
                  Starting At <span>₹{HeroProducts[1]?.salePrice}</span>
                </p>
                <a className="button" href="/products/MxBNGHpNwU3fjwrRNkbo">
                  SHOP NOW!
                </a>
              </div>
            </div>
            <div className="part-2">
              <img src={HeroProducts[2]?.image} alt="" />
              <div className="text-content">
                <h3>{HeroProducts[2]?.typeName}</h3>
                <p className="price-tag">
                  <span>{HeroProducts[2]?.discount}%</span>
                  {HeroProducts[2]?.saleDiscount}% OFF
                </p>
                <a className="button" href="#ForYou">
                  DEAL NOW!
                </a>
              </div>
            </div>
            <div className="part-3">
              <img src={HeroProducts[3]?.image} alt="" />
              <div className="text-content">
                <h3>{HeroProducts[3]?.typeName}</h3>
                <p className="price-tag">
                  Starting At<span>₹{HeroProducts[3]?.salePrice}</span>
                </p>
                <a className="button" href="/products">
                  GRAB NOW!
                </a>
              </div>
            </div>
            <div className="part-4">
              <img src={HeroProducts[4]?.image} alt="" />
              <div className="text-content">
                <h3>{HeroProducts[4]?.typeName}</h3>
                <p className="price-tag">
                  Starting At <span>₹{HeroProducts[4]?.salePrice}</span>
                </p>
                <a className="button" href="/products/dw98VI8uCO2p9708XAK2">
                  GET YOURS!
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </HeroSection>
  );
};

export default Hero;

const Animation = keyframes`
    from {
      transform: translate3d(0px, 300px, 0px) rotateZ(25deg);
    }
    to {
      transform: translate3d(0px, 0px, 0px) rotateZ(0deg);
    }
  `;

const HeroSection = styled.section`
  min-height: 100vh;
  max-width: 1180px;
  margin: auto auto 1rem auto;
  height: auto;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  .container {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    gap: 0.25rem;
    padding: 12rem 1.5rem 1.5rem 1.5rem;
    color: white;
    overflow: hidden;
    width: 100%;

    .part-1 {
      animation: ${Animation} 1s ease-in-out;
      height: 100%;
      grid-column: span 2;
      grid-row: span 2;
      position: relative;
      border: 1px solid white;
      overflow: hidden;

      img {
        object-fit: cover;
        height: 100%;
        width: 100%;
        transition: all 0.3s ease-in-out;

        &:hover {
          transform: scale(1.1);
        }
      }

      .text-content {
        position: absolute;
        bottom: 2rem;
        left: 2rem;

        p {
          font-weight: 800;
          font-size: 1.25rem;
          span {
            background: red;
            padding: 0.125rem 0.25rem;
          }
        }

        .head-tag {
          font-family: "Anton", sans-serif;
          color: rgba(255, 255, 255, 0.7);
        }

        .price-tag {
          font-family: "Anton", sans-serif;
          margin: 0.5rem 0 2rem 0;

          span {
            padding: 0.125rem 0.25rem;
          }
        }

        h3 {
          background: linear-gradient(90deg, #ff00ff, #ff7300);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 3.5rem;
          font-family: "Anton", sans-serif;
        }

        h2 {
          font-size: 5rem;
          font-family: "Anton", sans-serif;
        }

        .button {
          font-family: "Anton", sans-serif;
          background: linear-gradient(90deg, #ff00ff, #ff7300);
          text-decoration: none;
          cursor: pointer;
          padding: 1rem 3rem;
          font-weight: 900;
          font-size: 1rem;
          color: white;
        }

        @media (max-width: 820px) {
          left: 1rem;
        }

        @media (max-width: 599px) {
          left: 10px;
          bottom: 1.5rem;
          .button {
            padding: 0.75rem 1.5rem;
            font-weight: 900;
            font-size: 0.7rem;
          }

          .price-tag {
            margin: 0.5rem 0 1.5rem 0;
            font-size: 0.9rem;
          }

          h2 {
            font-size: 3rem;
          }

          h3 {
            font-size: 1.5rem;
          }

          .head-tag {
            font-size: 0.9rem;
          }
        }
      }
    }

    .part-2 {
      animation: ${Animation} 1s ease-in-out;
      position: relative;
      border: 1px solid white;
      height: 100%;
      overflow: hidden;

      img {
        object-fit: cover;
        height: 100%;
        width: 100%;
        transition: all 0.3s ease-in-out;

        &:hover {
          transform: scale(1.1);
        }
      }

      .text-content {
        position: absolute;
        top: 1rem;
        left: 1rem;

        h3 {
          font-family: "Anton", sans-serif;
          font-weight: 800;
          font-size: 2rem;
        }

        p {
          font-family: "Anton", sans-serif;
          color: white;
          font-weight: bold;
          font-size: 2rem;
          span {
            position: relative;
            font-size: 1.25rem;
            padding: 0.25rem 0rem;
            color: red;

            &::before {
              content: "";
              position: absolute;
              top: 50%;
              left: 0%;
              transform: translateY(-50%);
              width: 100%;
              height: 2px;
              background: red;
            }
          }
        }

        .price-tag {
          font-family: "Anton", sans-serif;
          font-weight: bold;
          margin: 0.5rem 0 2rem 0;
        }

        .button {
          font-family: "Anton", sans-serif;
          text-decoration: none;
          cursor: pointer;
          padding: 1rem 1rem;
          font-weight: 900;
          font-size: 1rem;
          color: white;
          background-color: #2b4162;
          background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);
          border: 1px solid white;
        }

        @media (max-width: 599px) {
          left: 10px;
          .button {
            padding: 1rem 2rem;
            font-weight: 900;
            font-size: 0.7rem;
          }

          .price-tag {
            margin: 0.5rem 0 1.5rem 0;
            font-size: 1.3rem;

            span {
              font-size: 0.9rem;
            }
          }

          h3 {
            font-size: 1.5rem;

            span {
              display: block;
            }
          }
        }
      }
    }

    .part-3 {
      animation: ${Animation} 1s ease-in-out;
      border: 1px solid white;
      height: 100%;
      grid-row-start: 2;
      grid-column-start: 3;
      position: relative;
      overflow: hidden;
      img {
        object-fit: cover;
        height: 100%;
        width: 100%;
        transition: all 0.3s ease-in-out;

        &:hover {
          transform: scale(1.1);
        }
      }

      .text-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: max-content;
        text-align: center;

        h3 {
          font-family: "Anton", sans-serif;
          font-weight: 800;
          font-size: 1.5rem;
        }

        p {
          font-family: "Anton", sans-serif;
          font-weight: 800;
          font-size: 1.3rem;
          span {
            padding: 0.25rem 0.5rem;
          }
        }

        .price-tag {
          font-family: "Anton", sans-serif;
          margin: 1rem 0 2rem 0;
          color: rgba(255, 255, 255, 0.8);
        }

        .button {
          font-family: "Anton", sans-serif;
          text-decoration: none;
          cursor: pointer;
          padding: 1rem 1rem;
          font-weight: 900;
          font-size: 1rem;
          color: white;
          background-color: #2b4162;
          background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);
          border: 1px solid white;
        }

        @media (max-width: 599px) {
          .button {
            padding: 1rem 2rem;
            font-weight: 900;
            font-size: 0.7rem;
          }

          .price-tag {
            margin: 0.5rem 0 1.5rem 0;
            font-size: 0.8rem;
          }

          h3 {
            font-size: 1rem;
          }
        }
      }
    }

    .part-4 {
      animation: ${Animation} 1s ease-in-out;
      border: 1px solid white;
      height: 100%;
      grid-row: span 2;
      position: relative;
      overflow: hidden;

      img {
        object-fit: cover;
        height: 100%;
        width: 100%;
        transition: all 0.3s ease-in-out;

        &:hover {
          transform: scale(1.1);
        }
      }

      .text-content {
        position: absolute;
        left: 1rem;
        bottom: 2rem;
        h3 {
          font-family: "Anton", sans-serif;
          font-size: 2.5rem;
          span {
            background: linear-gradient(90deg, #ff00ff, #ff7300);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }

        p {
          font-family: "Anton", sans-serif;
          font-weight: 800;
          font-size: 1.3rem;
          span {
            background: red;
            padding: 0.25rem 0.5rem;
          }
        }

        .price-tag {
          font-family: "Anton", sans-serif;
          margin: 1.5rem 0 2rem 0;
        }

        .button {
          font-family: "Anton", sans-serif;
          background: linear-gradient(90deg, #ff00ff, #ff7300);
          text-decoration: none;
          cursor: pointer;
          padding: 1rem 3rem;
          font-weight: 900;
          font-size: 1rem;
          color: white;
        }

        @media (max-width: 1024px) {
          left: 1rem;
        }

        @media (max-width: 599px) {
          left: 10px;
          .button {
            padding: 1rem 2rem;
            font-weight: 900;
            font-size: 0.7rem;
          }

          .price-tag {
            margin: 1rem 0 1.5rem 0;
            font-size: 0.8rem;
          }

          h3 {
            font-size: 1.5rem;
          }
        }
      }
    }

    @media (max-width: 991px) {
      padding: 8rem 1rem 1.5rem 1rem;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;

      .part-1 {
        grid-row: span 2;
        grid-column-start: 1;
      }

      .part-3 {
        grid-row-start: 3;
        grid-column-start: 1;
      }

      .part-4 {
        grid-row-start: 2;
        grid-column-start: 2;
        grid-row: span 2;
      }
    }

    @media (max-width: 479px) {
      padding: 8.5rem 1rem 1.5rem 1rem;
      min-height: 125vh;
    }
  }
`;

const Loading = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column: span 4;
`;
