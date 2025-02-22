import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { deleteAddress } from "../../store/slices/address/addressThunks";

const AddressCard = ({ addr, selectedId, setCurrentSelectedAddress }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleDelete = async () => {
    if (user !== null) {
      await dispatch(
        deleteAddress({ userID: user?.userID, AddressID: addr?.AddressID })
      ).unwrap();
    }
  };

  return (
    <MainCont>
      <CardContainer
        onClick={
          setCurrentSelectedAddress
            ? () => setCurrentSelectedAddress(addr)
            : null
        }
        className={selectedId?.AddressID === addr.AddressID ? "active" : ""}
      >
        <Info>
          <strong>Address:</strong>
          {addr?.address}
        </Info>
        <Info>
          <strong>City:</strong>
          {addr?.city}
        </Info>
        <Info>
          <strong>Pincode:</strong>
          {addr?.pincode}
        </Info>
        <Info>
          <strong>Phone:</strong>
          {addr?.phone}
        </Info>
        <Info>
          <strong>Email:</strong>
          {addr?.email}
        </Info>
        <ButtonContainer>
          <Button variant="delete" onClick={handleDelete}>
            Delete
          </Button>
        </ButtonContainer>
      </CardContainer>
    </MainCont>
  );
};

export default AddressCard;

const MainCont = styled.div`
  .active {
    border: 2px solid white;
  }
`;

const CardContainer = styled.div`
  width: 100%;
  padding: 20px;
  background: transparent;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Info = styled.p`
  margin: 5px 0;
  color: white;
  font-size: 1rem;
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 0 0;
`;

const Button = styled.button`
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  color: #fff;
  font-weight: 800;

  ${(props) =>
    props.variant === "edit"
      ? `
        background-color: #007bff;
        &:hover {
          background-color: #0056b3;
        }
      `
      : `
        background-color: #dc3545;
        &:hover {
          background-color: #a71d2a;
        }
      `}
`;
