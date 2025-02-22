import React from "react";
import styled from "styled-components";
import { MdTune } from "react-icons/md";
import { filterOptions } from "../../components/common/Config";

const Filter = ({ searchParams, handlefilter }) => {
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

  return (
    <FilterSection>
      <input type="checkbox" id="filterCheckbox" />
      <label htmlFor="filterCheckbox" className="filter-title">
        <MdTune />
        <h2>Filters</h2>
      </label>

      <div className="menu">
        {Object.keys(filterOptions).map((filterItem, key) => (
          <div key={`filter-${key}`} className="categories">
            <h3>{filterItem}</h3>
            <div className="filter-options">
              {filterOptions[filterItem].map((item, iidx) => (
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

export default Filter;

const FilterSection = styled.div`
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  color: white;

  #filterCheckbox {
    display: none;
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
    position: relative;

    #filterCheckbox:checked ~ .menu {
      transform: translateX(0%);
    }

    .filter-title {
      margin: 1rem 0 1.5rem 1rem;
      h2 {
        font-size: 1.2rem;
      }
    }

    .menu {
      background-color: #2b4162;
      background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);
      border: 1px solid white;
      position: absolute;
      padding: 0 4rem 0 1rem;
      left: 0;
      top: 100%;
      z-index: 2;
      transform: translateX(-150%);
      overflow: hidden;
      transition: transform 0.5s ease-in-out;
    }
  }
`;
