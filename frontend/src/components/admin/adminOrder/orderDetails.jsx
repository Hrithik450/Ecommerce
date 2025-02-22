import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { toggleOrderPanel } from "../../../store/slices/admin/adminOrder/adminOrderSlice";

const AdminOrderDetails = () => {
  const dispatch = useDispatch();
  const { orderDetail } = useSelector((state) => state.adminOrder);

  const handleClose = () => {
    dispatch(toggleOrderPanel());
  };

  return (
    <Container>
      <Header>
        <HeadTitle>Order Details-</HeadTitle>
        <CloseButton onClick={handleClose}>✕</CloseButton>
      </Header>

      <Overview>
        <Title>User ID</Title>
        <Value>{orderDetail?.userID}</Value>

        <Title>Username</Title>
        <Value>{orderDetail?.username}</Value>

        <Title>Order ID</Title>
        <Value>{orderDetail?.orderID}</Value>

        <Title>Order Date</Title>
        <Value>{orderDetail?.orderDate}</Value>

        <Title>Order Price</Title>
        <Value>₹{orderDetail?.ToTalOrderAmout}</Value>

        <Title>Payment method</Title>
        <Value>{orderDetail?.paymentMethod}</Value>

        <Title>Payment Status</Title>
        <Value>
          {orderDetail?.orderStatus === "Cancelled"
            ? orderDetail.paymentMethod === "COD"
              ? "Not Paid"
              : "Refunded"
            : orderDetail?.orderStatus === "Confirmed"
            ? orderDetail.paymentMethod === "COD"
              ? "Pending"
              : "Paid"
            : orderDetail?.orderStatus === "Dispatched"
            ? orderDetail.paymentMethod === "COD"
              ? "Pending"
              : "Paid"
            : orderDetail?.orderStatus === "Shipped"
            ? orderDetail.paymentMethod === "COD"
              ? "Pending"
              : "Paid"
            : orderDetail?.orderStatus === "Out For Delivery"
            ? orderDetail.paymentMethod === "COD"
              ? "Pending"
              : "Paid"
            : orderDetail?.orderStatus === "Delivered" && "Paid"}
        </Value>

        {orderDetail?.paymentMethod === "COD" ? (
          <>
            <Title>Amount to be Pay</Title>
            <Value>
              ₹
              {orderDetail?.orderStatus === "Delivered" ||
              orderDetail?.orderStatus == "Cancelled"
                ? 0
                : orderDetail?.totalAmount}
            </Value>
          </>
        ) : (
          <>
            <Title>Amount Paid</Title>
            <Value>₹{orderDetail?.totalAmount}</Value>
          </>
        )}

        {orderDetail?.orderStatus === "Cancelled" &&
          orderDetail?.paymentMethod !== "COD" && (
            <>
              <Title>Amount Refunded</Title>
              <Value>{orderDetail?.ToTalOrderAmout}</Value>
            </>
          )}

        <Title>Order Status</Title>
        <Status
          className={
            orderDetail?.orderStatus === "Confirmed"
              ? "Yellow"
              : orderDetail?.orderStatus === "Dispatched"
              ? "Orange"
              : orderDetail?.orderStatus === "Shipped"
              ? "Blue"
              : orderDetail?.orderStatus === "Out For Delivery"
              ? "Purple"
              : orderDetail?.orderStatus === "Delivered"
              ? "Green"
              : orderDetail?.orderStatus === "Cancelled"
              ? "Red"
              : "Gray"
          }
        >
          {orderDetail?.orderStatus}
        </Status>
      </Overview>

      <SectionTitle>Order Details</SectionTitle>
      {orderDetail &&
        orderDetail?.cartItems &&
        orderDetail?.cartItems?.length > 0 &&
        orderDetail?.cartItems?.map((item, iidx) => (
          <Grid key={`order-${iidx}`}>
            <FirstChild>{item?.productName}</FirstChild>
            <SecondChild>Quantity: {item?.quantity}</SecondChild>
            <ThirdChild>Price: ₹{item?.salePrice * item?.quantity}</ThirdChild>
          </Grid>
        ))}

      {orderDetail?.orderStatus === "Cancelled" && (
        <div>
          <SectionTitle>Reason for Cancellation</SectionTitle>
          <DetailText>{orderDetail?.reason}</DetailText>
        </div>
      )}
    </Container>
  );
};

export default AdminOrderDetails;

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
    padding: 10px;
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

  .Yellow {
    background: #ffc107;
    color: black;
  }

  .Orange {
    background: #fd7e14;
  }

  .Blue {
    background: #007bff;
  }

  .Purple {
    background: #6f42c1;
  }

  .Green {
    background: #28a745;
  }

  .Red {
    background: #dc3545;
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

const Status = styled.span`
  justify-self: flex-end;
  padding: 5px 15px;
  background-color: #4caf50;
  color: #fff;
  font-weight: bold;
  border-radius: 5px;
  text-transform: capitalize;
  cursor: pointer;

  @media (max-width: 480px) {
    padding: 4px 10px;
    font-size: 14px;
  }
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: white;
  border-bottom: 2px solid #ddd;
  padding-bottom: 5px;
  margin: 2rem 0 0.5rem 0;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const DetailText = styled.p`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  margin: 3px 0;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const FirstChild = styled.div`
  ${DetailText}
`;

const SecondChild = styled.div`
  ${DetailText};
  justify-self: flex-end;
`;

const ThirdChild = styled.div`
  ${DetailText};
  justify-self: flex-end;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 0 0 1rem 0;
`;
