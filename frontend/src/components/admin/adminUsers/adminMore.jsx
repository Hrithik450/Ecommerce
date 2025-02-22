import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import DotSpinner from "../../common/dotSpinner";
import { toggleMorePanel } from "../../../store/slices/admin/adminAuth/adminAuthSlice";
import { fetchUserData } from "../../../store/slices/admin/adminAuth/adminAuthThunks";
import UserOrderDetails from "./userOrderDetails";
import UserCartItems from "./userCartItems";

const UserMorePanel = ({ user }) => {
  const { userData, adminAuthLoading } = useSelector(
    (state) => state.adminAuth
  );
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleMorePanel());
  };

  useEffect(() => {
    const fetchMoreData = async () => {
      await dispatch(fetchUserData({ userID: user?.userID })).unwrap();
    };
    fetchMoreData();
  }, [dispatch]);

  return (
    <Container>
      <Header>
        <HeadTitle>{user?.userID}</HeadTitle>
        <CloseButton onClick={handleClose}>✕</CloseButton>
      </Header>

      {adminAuthLoading ? (
        <DotSpinner />
      ) : (
        <Overview>
          <Title>Refund Balance</Title>
          <TextValue>{userData?.RefundBalance}</TextValue>

          <Title>Cart Items</Title>
          <Value>
            <UserCartItems Items={userData?.cartItems} />
          </Value>

          <Title>Orders</Title>
          <Value>
            <UserOrderDetails orders={userData?.orders} />
          </Value>
        </Overview>
      )}
    </Container>
  );
};

export default UserMorePanel;

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
  overflow-x: auto;
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

const Overview = styled.div`
  display: grid;
  grid-template-columns: 1fr;

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

  @media (max-width: 479px) {
    padding: 0 1rem;
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

const TextValue = styled.p`
  font-size: 16px;
  margin: 5px 0 15px;
  color: rgba(255, 255, 255, 0.8);
  justify-self: flex-start;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const Value = styled.div`
  font-size: 16px;
  margin: 5px 0 15px;
  color: rgba(255, 255, 255, 0.8);
  justify-self: flex-start;
  max-width: 400px;
  overflow-x: auto;
  border: 1px solid #ddd;
  scrollbar-width: none;

  @media (max-width: 480px) {
    max-width: 100%;
    font-size: 14px;
  }
`;

const HeadTitle = styled.h2`
  font-size: 1.2rem;
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
