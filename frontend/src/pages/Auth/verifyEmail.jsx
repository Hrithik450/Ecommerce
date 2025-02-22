import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { verifyemail } from "../../store/slices/auth/authThunks";
import DotSpinner from "../../components/common/dotSpinner";

const Verifyemail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authLoading } = useSelector((state) => state.auth);
  const [code, setcode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    const newCode = [...code];

    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setcode(newCode);

      const lastFillIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFillIndex < 5 ? lastFillIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setcode(newCode);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    const res = await dispatch(
      verifyemail({ code: verificationCode })
    ).unwrap();
    if (res?.success) {
      navigate("/");
    }
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  return (
    <AuthSection>
      <Container>
        <Header>
          <h1>Hruthik M</h1>
        </Header>
        <Body>
          <div className="form-container">
            <h2>Verify Your Email</h2>
            <p>Enter the 6-digit code sent to your email address.</p>
            <form onSubmit={handleSubmit}>
              <div className="code-container">
                {code &&
                  code.map((digit, cidx) => (
                    <input
                      key={`digit-${cidx}`}
                      ref={(el) => (inputRefs.current[cidx] = el)}
                      type="text"
                      maxLength="6"
                      value={digit}
                      onChange={(e) => handleChange(cidx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(cidx, e)}
                    />
                  ))}
              </div>

              <button>{authLoading ? <DotSpinner /> : "Verify Email"}</button>
            </form>
          </div>
        </Body>
      </Container>
    </AuthSection>
  );
};

export default Verifyemail;

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
    }

    p {
      animation: ${Animation} 1000ms ease-in-out;
      font-size: 1rem;
      color: white;
      text-align: center;
      margin: 1.5rem 0;

      @media (max-width: 479px) {
        font-size: 0.9rem;
      }
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
          text-align: center;
          vertical-align: middle;
          font-size: 1.3rem;
          font-weight: 800;
          outline: none;
          border: 1px solid #bfb3f2;
          &:focus {
            border-color: #5f41e4;
          }

          @media (max-width: 479px) {
            height: 2.1rem;
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
        font-size: 1.2rem;
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
