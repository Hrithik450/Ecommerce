import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";

const InputField = ({ type, placeholder, icon, name, value, onChange }) => {
  const isPasswordType = type === "password";
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const handlePassword = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  return (
    <InputContainer>
      <div className="input-wrapper">
        {icon && <div className="icon">{icon}</div>}
        <div className={isPasswordType ? "password" : ""}>
          {isPasswordType &&
            (isPasswordShown ? (
              <FaEyeSlash onClick={handlePassword} />
            ) : (
              <FaEye onClick={handlePassword} />
            ))}
          <input
            type={isPasswordType && isPasswordShown ? "text" : type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            required
          />
        </div>
      </div>
    </InputContainer>
  );
};

export default InputField;

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

const InputContainer = styled.div`
  animation: ${fadeIn} 1000ms ease-in-out;
  .input-wrapper {
    width: 100%;
    position: relative;
    margin: 1rem 0;

    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 50%;
      left: 1rem;
      transform: translateY(-50%);
      color: #bfb3f2;
      font-size: 1.1rem;
    }

    input {
      width: 100%;
      cursor: pointer;
      padding: 1rem 2.5rem;
      background: rgba(0, 0, 0, 0.1);
      outline: none;
      color: white;
      border: 1px solid #bfb3f2;
      font-size: 1.1rem;

      &::placeholder {
        color: white;
      }

      &:focus {
        border-color: #5f41e4;
      }

      @media (max-width: 479px) {
        font-size: 1rem;
      }
    }

    .password {
      position: relative;

      svg {
        position: absolute;
        top: 50%;
        right: 1rem;
        transform: translateY(-50%);
        color: #bfb3f2;
        font-size: 1.3rem;
        cursor: pointer;
      }
    }
  }
`;
