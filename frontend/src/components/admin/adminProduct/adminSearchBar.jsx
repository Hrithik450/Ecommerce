import React, { useState } from "react";
import styled from "styled-components";

const AdminSearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <SearchBarContainer onSubmit={handleSearch}>
      <SearchInput
        type="text"
        placeholder="Search a Anything..."
        value={searchTerm}
        onChange={handleChange}
      />
      <SearchButton type="submit">Search</SearchButton>
    </SearchBarContainer>
  );
};

export default AdminSearchBar;

const SearchBarContainer = styled.form`
  margin: 1rem 0;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #2b4162;
  background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);
  border: 1px solid rgba(2552, 255, 255, 0.4);
`;

const SearchInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  padding: 0.8rem 1rem;
  margin-right: 5px;
  font-size: 16px;
  color: white;
  flex-grow: 1;

  @media (max-width: 479px) {
    font-size: 14px;
  }
`;

const SearchButton = styled.button`
  padding: 0.8rem 2rem;
  font-weight: 900;
  font-size: 1rem;
  background: linear-gradient(90deg, #ff00ff, #ff7300);
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    border: 1px solid white;
    background-color: #2b4162;
    background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);
  }
`;
