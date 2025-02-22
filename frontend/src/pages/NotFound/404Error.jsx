import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFound = () => {
  return (
    <NotFoundContainer>
      <ErrorImage
        src="https://res.cloudinary.com/duozomapm/image/upload/v1739505711/ErrorImage_xydo7l.png"
        alt="404 Error"
      />
      <ErrorCode>404</ErrorCode>
      <ErrorMessage>
        Oops! The page you are looking for does not exist.
      </ErrorMessage>
      <HomeButton to="/">Go Back Home</HomeButton>
    </NotFoundContainer>
  );
};

export default NotFound;

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #1e1e1e;
  color: #fff;
  text-align: center;
  padding: 20px;
`;

const ErrorImage = styled.img`
  margin-bottom: 20px;
  max-width: 600px;
  width: 100%;
`;

const ErrorCode = styled.h1`
  font-size: 6rem;
  font-weight: bold;
  color: #ff4757;
  margin: 0;
`;

const ErrorMessage = styled.p`
  font-size: 1.5rem;
  margin: 10px 0;
`;

const HomeButton = styled(Link)`
  margin-top: 20px;
  padding: 12px 25px;
  font-size: 1.2rem;
  background-color: #ff4757;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    background-color: #e84118;
  }
`;
