import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import DotSpinner from "../../common/dotSpinner";
import {
  toggleUserBlock,
  toggleUserEdit,
} from "../../../store/slices/admin/adminAuth/adminAuthSlice";
import { deleteUser } from "../../../store/slices/admin/adminAuth/adminAuthThunks";

const DeleteUser = ({ user }) => {
  const { adminAuthLoading } = useSelector((state) => state.adminAuth);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleUserBlock());
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await dispatch(deleteUser({ userID: user?.userID })).unwrap();
    if (res.success) {
      handleClose();
      dispatch(toggleUserEdit());
    }
  };

  return (
    <Container>
      <Header>
        <HeadTitle>Are You Sure?</HeadTitle>
        <CloseButton onClick={handleClose}>✕</CloseButton>
      </Header>
      <Overview>
        <Title>User ID</Title>
        <Value>{user?.userID}</Value>

        <Title>Username</Title>
        <Value>{user?.username}</Value>

        <Title>Email</Title>
        <Value>{user?.email}</Value>
      </Overview>
      <ButtonParent>
        <CancelButton onClick={handleDelete}>
          {adminAuthLoading ? <DotSpinner /> : "Yes, Delete"}
        </CancelButton>
        <CancelButton className="NotCancel" onClick={handleClose}>
          Don't Delete
        </CancelButton>
      </ButtonParent>
    </Container>
  );
};

export default DeleteUser;

const Animation = keyframes`
from {
opacity: 0;
transform: translateX(100%);
} to {
opacity: 1;
transform: translateX(0%);
}
`;

const Container = styled.div`
  scrollbar-width: none;
  animation: ${Animation} 250ms ease-in-out;
  position: fixed;
  top: 0%;
  right: 0%;
  z-index: 99;
  background-color: #2b4162;
  background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);
  min-height: 100vh;
  max-height: 100vh;
  max-width: 450px;
  min-width: 450px;
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

  @media (max-width: 480px) {
    max-width: 100%;
    min-width: 100%;
    width: 100%;
    padding: 10px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 1rem 0;

  @media (max-width: 479px) {
    padding: 0 1rem;
  }
`;

const HeadTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0.5rem 0 1rem 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: white;
`;

const Overview = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0 1rem;

  .red {
    background: #dc3545;
  }

  .green {
    background: green;
  }

  .yellow {
    background: yellow;
    color: black;
  }
`;

const Title = styled.h4`
  font-size: 16px;
  font-weight: bold;
  margin: 5px 0;
  color: white;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const Value = styled.p`
  font-size: 16px;
  margin: 5px 0 15px;
  color: rgba(255, 255, 255, 0.8);
  justify-self: flex-end;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const ButtonParent = styled.div`
  grid-template-columns: 1fr 1fr;
  display: grid;
  margin: 1rem 0;
  padding: 0 1rem;
  gap: 1rem;

  .NotCancel {
    background-color: green;
  }
`;

const CancelButton = styled.button`
  background: #dc3545;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 900;
  border-radius: 5px;
  outline: none;
  border: 1px solid rgba(255, 255, 255, 0.4);
  cursor: pointer;
`;
