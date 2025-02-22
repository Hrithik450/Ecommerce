import styled, { keyframes } from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const SocialLogin = () => {
  return (
    <SocialContainer>
      <div className="social-container">
        <a
          href={`${import.meta.env.VITE_BACKEND_URL}/api/v1/oauth/google`}
          className="social-link"
        >
          <FcGoogle />
          <span>Google</span>
        </a>
        <a
          href={`${import.meta.env.VITE_BACKEND_URL}/api/v1/oauth/facebook`}
          className="social-link"
        >
          <FaFacebook
            style={{
              color: "#1877F2",
              backgroundColor: "white",
              borderRadius: "50%",
            }}
          />
          <span>Facebook</span>
        </a>
      </div>
    </SocialContainer>
  );
};

export default SocialLogin;

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

const SocialContainer = styled.div`
  .social-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    .social-link {
      animation: ${fadeIn} 1000ms ease-in-out;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 0;
      cursor: pointer;
      background: transparent;
      color: white;
      outline: none;
      border: 1px solid #bfb3f2;
      text-decoration: none;

      &:hover {
        background: black;
        border-color: #5f41e4;
      }

      svg,
      span {
        font-size: 1.3rem;

        @media (max-width: 479px) {
          font-size: 1rem;
        }
      }
    }
  }
`;
