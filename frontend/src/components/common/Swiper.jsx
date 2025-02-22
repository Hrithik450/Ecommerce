import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Navigation, Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/parallax";

import styled from "styled-components";
import TestimonialCard from "../product/testimonalCard";

export default function ParallaxSwiper({ slides }) {
  return (
    <StyledSwiper
      spaceBetween={30}
      grabCursor={true}
      centeredSlides={true}
      loop={true}
      parallax={true}
      slidesPerView={"auto"}
      navigation={{
        nextEl: ".highlight-button-next",
        prevEl: ".highlight-button-prev",
      }}
      speed={800}
      autoplay={{ delay: 2000 }}
      modules={[Parallax, Navigation, Autoplay, Pagination]}
    >
      {slides &&
        slides?.map((slide, index) => (
          <SwiperSlide className="slide-content" key={`-${index}`}>
            <TestimonialCard slide={slide} />
          </SwiperSlide>
        ))}
    </StyledSwiper>
  );
}

const StyledSwiper = styled(Swiper)`
  max-width: 1180px;
  width: 100%;

  .slide-content {
    position: relative;
    overflow: hidden;
    border: 1px solid ${(props) => props.color};
  }

  .swiper-slide {
    background-color: #cdc1ff;
    background-image: linear-gradient(316deg, #cdc1ff 0%, #e5d9f2 74%);
    background-position: center;
    background-size: cover;
    box-shadow: 0 0 4px 3px rgba(0, 0, 0, 0.3);
    max-width: 400px;
    width: 100%;
    height: auto;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
  }

  @media (max-width: 479px) {
    max-width: 350px;
  }
`;
