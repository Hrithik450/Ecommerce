import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import LoginPage from "../../components/auth/login";
import SignUpPage from "../../components/auth/signup";

const AuthPage = () => {
  const [login, setlogin] = useState(true);
  const handleAuth = (boolean) => {
    setlogin(boolean);
  };

  return (
    <AuthSection>
      <div className="container">
        <Header>
          <h1>ANOX</h1>
        </Header>
        <Body>
          <div className="form-container">
            {login ? (
              <LoginPage handleAuth={handleAuth} />
            ) : (
              <SignUpPage handleAuth={handleAuth} />
            )}
          </div>
        </Body>
      </div>
    </AuthSection>
  );
};

export default AuthPage;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0%);
  }
`;

const AuthSection = styled.section`
  background-color: #2b4162;
  background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);

  min-height: 100vh;
  overflow: hidden;

  .container {
    max-width: 1280px;
    margin: auto;
  }
`;

const Header = styled.div`
  animation: ${fadeIn} 1000ms ease-in-out;
  padding: 1.5rem 0 0 0;
  width: max-content;
  h1 {
    color: white;
    font-size: 3rem;
  }

  @media (max-width: 1280px) {
    padding: 1.5rem 0 0 3rem;
  }

  @media (max-width: 479px) {
    padding: 1.5rem 0 0 1rem;

    h1 {
      font-size: 2.5rem;
    }
  }
`;

const Body = styled.div`
  width: 100%;

  .form-container {
    max-width: 450px;
    width: 100%;
    margin: auto;
    padding: 3rem 0;

    @media (max-width: 479px) {
      padding: 4rem 1rem;
    }
  }
`;
