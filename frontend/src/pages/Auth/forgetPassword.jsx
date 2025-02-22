import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { forgetPassword } from "../../store/slices/auth/authThunks";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authLoading } = useSelector((state) => state.auth);
  const [formData, setformData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(forgetPassword(formData)).unwrap();
    if (res.success) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  return (
    <AuthSection>
      <Container>
        <Header>
          <h1>ANOX</h1>
        </Header>
        <Body>
          <div className="form-container">
            <h2>Forgot Password?</h2>
            <p>Enter your registered email address.</p>
            <form onSubmit={handleSubmit}>
              <div className="code-container">
                <input
                  placeholder="Email Address.."
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  required
                />
              </div>
              <button>
                {authLoading ? <DotSpinner /> : "Send Reset Link"}
              </button>
            </form>
          </div>
        </Body>
      </Container>
    </AuthSection>
  );
};

export default ForgetPassword;

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

const Animation = keyframes`
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
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

const Container = styled.div`
  height: 100%;
  max-width: 1280px;
  margin: auto;
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
  animation: ${Animation} 1000ms ease-in-out;
  width: 100%;
  padding: 0 1rem;
  margin: 4rem 0;

  .form-container {
    max-width: 450px;
    width: 100%;
    margin: auto;
    padding: 3rem 0;
    border: 1px solid white;

    @media (max-width: 479px) {
      padding: 3rem 1rem;
    }

    h2 {
      animation: ${Animation} 1000ms ease-in-out;
      font-size: 2rem;
      text-align: center;
      color: white;
      font-weight: 800;

      @media (max-width: 479px) {
        font-size: 1.8rem;
      }
    }

    p {
      animation: ${Animation} 1000ms ease-in-out;
      font-size: 1rem;
      color: white;
      text-align: center;
      margin: 1.5rem 0;
    }

    form {
      max-width: 70%;
      margin: auto;
      text-align: center;

      @media (max-width: 450px) {
        max-width: 100%;
      }

      .code-container {
        display: flex;
        gap: 1rem;

        input {
          animation: ${Animation} 1000ms ease-in-out;
          background: rgba(0, 0, 0, 0.1);
          height: 2.5rem;
          color: white;
          width: 100%;
          border-radius: 5px;
          font-size: 1rem;
          padding: 0 1rem;
          font-weight: 800;
          outline: none;
          border: 1px solid #bfb3f2;
          &:focus {
            border-color: #5f41e4;
          }
        }
      }

      .resend-email {
        animation: ${fadeIn} 1000ms ease-in-out;
        display: block;
        width: 100%;
        text-align: end;
        color: white;
        font-size: 1rem;
        cursor: pointer;
        margin: 1.2rem 0 0.2rem 0;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }

      button {
        animation: ${Animation} 1000ms ease-in-out;
        width: 100%;
        margin: 1rem 0 0 0;
        padding: 0.7rem 0;
        font-size: 1.1rem;
        font-weight: 800;
        border-radius: 10px;
        color: white;
        outline: none;
        border: 1px solid #4320df;
        background: #5f41e4;

        &:hover {
          background: #4320df;
        }

        @media (max-width: 479px) {
          padding: 0.7rem 0;
          font-size: 1rem;
        }
      }
    }
  }
`;
