import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AlertObject } from "../common/Config";
import { signup } from "../../store/slices/auth/authThunks";
import InputField from "../common/input";
import DotSpinner from "../common/dotSpinner";
import SocialLogin from "./social";
import StrengthMeter from "./strengthMeter";

const SignUpPage = ({ handleAuth }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [strength, setStrength] = useState(0);
  const { authLoading } = useSelector((state) => state.auth);
  const [AuthData, setAuthData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setAuthData({
      ...AuthData,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (strength !== 4) {
      return toast.error("Please create a strong password", AlertObject);
    }

    const result = await dispatch(signup(AuthData)).unwrap();
    if (result?.success) {
      navigate("/verify-email");
    }
  };

  return (
    <SignUpSection>
      <div className="signup-container">
        <h2>Create Account</h2>
        <SocialLogin />
        <p className="separator">
          <span>or</span>
        </p>
        <form onSubmit={handleSubmit}>
          <InputField
            type={"text"}
            placeholder={"Username"}
            icon={<FaUserAlt />}
            name={"username"}
            value={AuthData.username}
            onChange={handleChange}
          />
          <InputField
            type={"email"}
            placeholder={"Email Address"}
            icon={<MdEmail />}
            name={"email"}
            value={AuthData.email}
            onChange={handleChange}
          />
          <InputField
            type={"password"}
            placeholder={"Create Password"}
            icon={<FaLock />}
            name={"password"}
            value={AuthData.password}
            onChange={handleChange}
          />
          <StrengthMeter
            password={AuthData.password}
            setStrength={setStrength}
          />
          <button className="signup-btn">
            {authLoading ? <DotSpinner /> : "Sign Up"}
          </button>

          <span className="login">
            Already have a account?{" "}
            <a onClick={() => handleAuth(true)}>Login</a>
          </span>
        </form>
      </div>
    </SignUpSection>
  );
};

export default SignUpPage;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const SignUpSection = styled.div`
  position: relative;
  animation: ${fadeIn} 1000ms ease-in-out;
  .signup-container {
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 5px;
      width: 100%;
      background: linear-gradient(90deg, #ff00ff, #ff7300);
    }

    width: 100%;
    padding: 3rem;
    border: 1px solid white;
    background-color: #2b4162;
    background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);
    box-shadow: 0 0 2px 2px rgba(255, 255, 255, 0.1);

    @media (max-width: 479px) {
      padding: 2rem 1.5rem;
    }

    h2 {
      animation: ${fadeIn} 1000ms ease-in-out;
      text-align: center;
      font-size: 2rem;
      color: white;
      padding-bottom: 2rem;
      font-weight: 800;

      @media (max-width: 479px) {
        font-size: 1.7rem;
      }
    }

    form {
      text-align: center;

      .forget-password {
        animation: ${fadeIn} 1000ms ease-in-out;
        display: block;
        width: 100%;
        text-align: end;
        color: white;
        font-size: 1.1rem;
        cursor: pointer;
        margin: 1rem 0;

        &:hover {
          text-decoration: underline;
        }

        @media (max-width: 479px) {
          font-size: 1rem;
        }
      }

      .signup-btn {
        animation: ${fadeIn} 1000ms ease-in-out;
        width: 100%;
        padding: 1rem 0;
        font-size: 1.2rem;
        font-weight: 800;
        border-radius: 40px;
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

      .login {
        animation: ${fadeIn} 1000ms ease-in-out;
        display: block;
        color: white;
        margin: 1rem 0;
        font-size: 1.2rem;

        a {
          color: #5f41e4;
          cursor: pointer;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }

        @media (max-width: 479px) {
          font-size: 1rem;
        }
      }
    }

    .separator {
      animation: ${fadeIn} 1000ms ease-in-out;
      color: white;
      position: relative;
      text-align: center;
      margin: 1.5rem 0;

      &:after {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        width: 100%;
        height: 1%;
        background: #bfb3f2;
      }

      span {
        position: relative;
        background: #fff;
        color: black;
        padding: 2px 10px;
        z-index: 1;
        font-weight: 600;
        font-size: 1.1rem;

        @media (max-width: 479px) {
          font-size: 1rem;
        }
      }
    }
  }
`;
