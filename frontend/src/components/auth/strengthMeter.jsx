import React from "react";
import { Check, X } from "lucide-react";
import styled, { keyframes } from "styled-components";

const PasswordCriteria = ({ password }) => {
  const criteria = [
    { label: "At least 8 chracters", met: password.length >= 8 },
    { label: "Contains Uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains Lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains a number", met: /\d/.test(password) },
    {
      label: "Contains a special chracter",
      met: /[^A-Za-z0-9]/.test(password),
    },
  ];

  return (
    <div className="label-container">
      {criteria.map((item, iidx) => (
        <div key={`item-${iidx}`} className="label">
          {item.met ? (
            <Check className="item-green" />
          ) : (
            <X className="item-gray" />
          )}
          <span className={item.met ? "item-green" : "item-gray"}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const getStrength = (pass) => {
  let strength = 0;
  if (pass.length >= 8) strength++;
  if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
  if (pass.match(/\d/)) strength++;
  if (pass.match(/[^A-Za-z0-9]/)) strength++;
  return strength;
};

const getStrengthText = (strength) => {
  if (strength === 0) return "Very weak";
  if (strength === 1) return "Weak";
  if (strength === 2) return "Medium";
  if (strength === 3) return "Good";
  return "Strong";
};

const getColor = (strength) => {
  if (strength === 0) return "dark-red";
  if (strength === 1) return "red";
  if (strength === 2) return "neutral";
  if (strength === 3) return "green";
  return "dark-green";
};

const StrengthMeter = ({ password, setStrength }) => {
  const strength = getStrength(password);
  setStrength(strength);

  return (
    <PasswordStrengthMeter>
      <div className="header">
        <span>Password strength</span>
        <span>{getStrengthText(strength)}</span>
      </div>

      <div className="strength-index">
        {[...Array(4)].map((_, idx) => (
          <div
            key={`arr-${idx}`}
            className={`index ${
              idx < strength ? getColor(strength) : "index-gray"
            }`}
          ></div>
        ))}
      </div>
      <PasswordCriteria password={password} />
    </PasswordStrengthMeter>
  );
};

export default StrengthMeter;

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

const PasswordStrengthMeter = styled.div`
  color: white;
  margin: 2rem 0;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;

    span {
      animation: ${fadeIn} 1000ms ease-in-out;
    }
  }

  .strength-index {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    align-items: center;
    gap: 0.25rem;

    .index {
      animation: ${fadeIn} 1000ms ease-in-out;
      height: 8px;
      width: 100%;
      border: 1px solid white;
    }

    .index-gray {
      background: gray;
    }

    .dark-red {
      background: #ef4444;
    }

    .red {
      background: #f87171;
    }

    .neutral {
      background: #f59e0b;
    }

    .green {
      background: #fbbf24;
    }

    .dark-green {
      background: #10b981;
    }
  }

  .label-container {
    width: 100%;
    text-align: left;
    margin-top: 0.5rem;

    .label {
      animation: ${fadeIn} 1000ms ease-in-out;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .item-green {
        color: #10b981;
      }

      .item-gray {
        color: gray;
      }
    }
  }
`;
