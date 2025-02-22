import React from "react";
import styled, { keyframes } from "styled-components";
import { adminfilterOptions } from "../../common/Config";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toggleFilterPanel } from "../../../store/slices/admin/adminOrder/adminOrderSlice";

const AdminFilter = ({
  searchParams,
  handlefilter,
  selectedDate,
  onDateChange,
}) => {
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
    dispatch(toggleFilterPanel());
  };

  return (
    <FilterSection>
      <Header>
        <HeadTitle>Filter</HeadTitle>
        <CloseButton onClick={handleClose}>✕</CloseButton>
      </Header>

      <div className="menu">
        {Object.keys(adminfilterOptions).map((filterItem, key) => (
          <div key={`filter-${key}`} className="categories">
            <h3>{filterItem}</h3>
            <div className="filter-options">
              {adminfilterOptions[filterItem].map((item, iidx) => (
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

      <DatePickerWrapper>
        <Label>Select a Date:</Label>
        <StyledDatePicker
          selected={selectedDate}
          onChange={(date) => {
            const indianDate = new Date(date.getTime() + 5.5 * 60 * 60 * 1000);
            onDateChange(indianDate);
          }}
          dateFormat="dd/MM/yyyy"
          placeholderText="DD/MM/YYYY"
        />
        <Button onClick={() => onDateChange(null)}>Clear Date</Button>
      </DatePickerWrapper>
    </FilterSection>
  );
};

export default AdminFilter;

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

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const Button = styled.button`
  background: linear-gradient(90deg, #ff00ff, #ff7300);
  padding: 0.5rem 0;
  font-size: 16px;
  font-weight: bold;
  color: white;
  cursor: pointer;
`;

const DatePickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  color: white;
`;
