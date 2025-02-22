import React from "react";
import styled from "styled-components";
import ReactStars from "react-rating-stars-component";

const TestimonialCard = ({ slide }) => {
  return (
    <Card>
      <Profile>
        <div className="avatar">
          {slide?.profile ? (
            <img src={slide?.profile} alt={slide?.username} />
          ) : (
            slide?.username && slide?.username[0]
          )}
        </div>
        <ProfileInfo>
          <Name>{slide?.username}</Name>
        </ProfileInfo>
      </Profile>
      {slide?.rating && (
        <ReactStars
          count={5}
          value={slide?.rating}
          size={28}
          isHalf={true}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#ffd700"
          edit={false}
        />
      )}
      <Quote>{slide?.review}</Quote>
    </Card>
  );
};

export default TestimonialCard;

const Card = styled.div`
  position: relative;
  background-color: #212121;
  color: #ffffff;
  padding: 1rem;
  height: 100%;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 4px;
    width: 100%;
    background: linear-gradient(90deg, #ff00ff, #ff7300);
  }

  @media (max-width: 479px) {
    padding: 1;
  }
`;

const Quote = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: #bdbdbd;
  margin: 1rem 0 0 0;

  @media (max-width: 479px) {
    font-size: 1rem;
  }
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;

  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    color: white;
    border-radius: 50%;
    overflow: hidden;
    font-size: 1.2rem;
    border: 1px solid white;
    background-color: #2b4162;
    background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media (max-width: 479px) {
      font-size: 1rem;
    }
  }
`;

const ProfileInfo = styled.div`
  flex: 7;
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem;
`;

const Name = styled.span`
  font-weight: bold;
  font-size: 1.1rem;
`;
