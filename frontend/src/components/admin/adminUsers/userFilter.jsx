import React from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch } from "react-redux";
import { userFilterOptions } from "../../common/Config";
import { toggleUserPanel } from "../../../store/slices/admin/adminAuth/adminAuthSlice";

const UserFilter = ({ searchParams, handlefilter }) => {
  const dispatch = useDispatch();

  const getfilterObject = () => {
    const filters = {};
    for (const [key, value] of searchParams) {
      if (value) {
        filters[key] = value.split(",");
      }
    }

    return filters;
  };
  const filters = getfilterObject();

  const handleClose = () => {
    dispatch(toggleUserPanel());
  };

  return (
    <FilterSection>
      <Header>
        <HeadTitle>Filter</HeadTitle>
        <CloseButton onClick={handleClose}>✕</CloseButton>
      </Header>

      <div className="menu">
        {Object.keys(userFilterOptions).map((filterItem, key) => (
          <div key={`filter-${key}`} className="categories">
            <h3>{filterItem}</h3>
            <div className="filter-options">
              {userFilterOptions[filterItem].map((item, iidx) => (
                <label key={`filter-${iidx}`}>
                  <input
                    type="checkbox"
                    checked={
                      filters &&
                      Object.keys(filters).length > 0 &&
                      filters[filterItem] !== "" &&
                      filters[filterItem]?.indexOf(item.id) > -1
                    }
                    onChange={() => handlefilter(filterItem, item.id)}
                  />
                  {item.label}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </FilterSection>
  );
};

export default UserFilter;

const Animation = keyframes`
from {
opacity: 0;
transform: translateX(100%);
} to {
opacity: 1;
transform: translateX(0%);
}
`;

const FilterSection = styled.div`
  animation: ${Animation} 250ms ease-in-out;
  scrollbar-width: none;
  position: fixed;
  top: 0%;
  right: 0%;
  z-index: 99;
  background-color: #2b4162;
  background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);
  min-height: 100vh;
  max-height: 100vh;
  max-width: 300px;
  min-width: 300px;
  overflow: hidden;
  overflow-y: auto;
  padding: 20px;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  color: white;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 15px;
  }

  @media (max-width: 479px) {
    max-width: 100%;
    min-width: 100%;
    width: 100%;
    padding: 1rem 2rem;
  }

  .filter-title {
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;

    svg {
      font-size: 1.5rem;
    }

    h2 {
      cursor: pointer;
      max-width: max-content;
    }
  }

  .categories {
    margin: 1rem 0;
    padding: 1rem 0;
    border-top: 1px solid rgba(255, 255, 255, 0.1);

    h3 {
      margin-bottom: 5px;
    }

    .filter-options {
      display: grid;
      label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin: 0.5rem 0;
      }
    }
  }

  @media (max-width: 579px) {
    .filter-title {
      margin: 1rem 0 1.5rem 1rem;
      h2 {
        font-size: 1.2rem;
      }
    }
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 1rem 0;
`;

const HeadTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: white;
`;
