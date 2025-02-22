import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { toggleOrder } from "../../store/slices/order/orderSlice";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { orderDetails } = useSelector((state) => state.order);

  const handleClose = () => {
    dispatch(toggleOrder());
  };

  return (
    <Container>
      <Header>
        <HeadTitle>Order Details-</HeadTitle>
        <CloseButton onClick={handleClose}>✕</CloseButton>
      </Header>

      <Overview>
        <Title>Order ID</Title>
        <Value>{orderDetails?.orderID}</Value>

        <Title>Order Date</Title>
        <Value>{orderDetails?.orderDate}</Value>

        <Title>Order Price</Title>
        <Value>₹{orderDetails?.ToTalOrderAmout}</Value>

        <Title>Payment method</Title>
        <Value>{orderDetails?.paymentMethod}</Value>

        <Title>Payment Status</Title>
        <Value>
          {orderDetails?.orderStatus === "Cancelled"
            ? orderDetails.paymentMethod === "COD"
              ? "Not Paid"
              : "Refunded"
            : orderDetails?.orderStatus === "Confirmed"
            ? orderDetails.paymentMethod === "COD"
              ? "Pending"
              : "Paid"
            : orderDetails?.orderStatus === "Dispatched"
            ? orderDetails.paymentMethod === "COD"
              ? "Pending"
              : "Paid"
            : orderDetails?.orderStatus === "Shipped"
            ? orderDetails.paymentMethod === "COD"
              ? "Pending"
              : "Paid"
            : orderDetails?.orderStatus === "Out For Delivery"
            ? orderDetails.paymentMethod === "COD"
              ? "Pending"
              : "Paid"
            : orderDetails?.orderStatus === "Delivered" && "Paid"}
        </Value>

        {orderDetails?.paymentMethod === "COD" ? (
          <>
            <Title>Amount to be Pay</Title>
            <Value>
              ₹
              {orderDetails?.orderStatus === "Delivered" ||
              orderDetails?.orderStatus == "Cancelled"
                ? 0
                : orderDetails?.totalAmount}
            </Value>
          </>
        ) : (
          <>
            <Title>Amount Paid</Title>
            <Value>₹{orderDetails?.totalAmount}</Value>
          </>
        )}

        {orderDetails?.orderStatus === "Cancelled" &&
          orderDetails?.paymentMethod !== "COD" && (
            <>
              <Title>Amount Refunded</Title>
              <Value>₹{orderDetails?.ToTalOrderAmout}</Value>
            </>
          )}

        <Title>Order Status</Title>
        <Status
          className={
            orderDetails?.orderStatus === "Confirmed"
              ? "Yellow"
              : orderDetails?.orderStatus === "Dispatched"
              ? "Orange"
              : orderDetails?.orderStatus === "Shipped"
              ? "Blue"
              : orderDetails?.orderStatus === "Out For Delivery"
              ? "Purple"
              : orderDetails?.orderStatus === "Delivered"
              ? "Green"
              : orderDetails?.orderStatus === "Cancelled"
              ? "Red"
              : "Gray"
          }
        >
          {orderDetails?.orderStatus}
        </Status>
      </Overview>

      <SectionTitle>Order Details</SectionTitle>
      {orderDetails &&
        orderDetails.cartItems &&
        orderDetails.cartItems.length > 0 &&
        orderDetails.cartItems.map((item, iidx) => (
          <Grid key={`order-${iidx}`}>
            <FirstChild>{item?.productName}</FirstChild>
            <SecondChild>Quantity: {item?.quantity}</SecondChild>
            <ThirdChild>Price: ₹{item?.salePrice * item?.quantity}</ThirdChild>
          </Grid>
        ))}

      {orderDetails?.orderStatus === "Cancelled" && (
        <div>
          <SectionTitle>Reason for Cancellation</SectionTitle>
          <DetailText>{orderDetails?.reason}</DetailText>
        </div>
      )}

      <SectionTitle>Shipping Address</SectionTitle>
      <ShippingInfo>
        <DetailText>{orderDetails?.addressInfo?.username}</DetailText>
        <DetailText>{orderDetails?.addressInfo?.address}</DetailText>
        <DetailText>{orderDetails?.addressInfo?.city}</DetailText>
        <DetailText>{orderDetails?.addressInfo?.pincode}</DetailText>
        <DetailText>{orderDetails?.addressInfo?.phone}</DetailText>
        <DetailText>{orderDetails?.addressInfo?.email}</DetailText>
      </ShippingInfo>
    </Container>
  );
};

export default OrderDetails;

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
  z-index: 101;
  background-color: #2b4162;
  background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);
  min-height: 100vh;
  max-height: 100vh;
  max-width: 450px;
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
    width: 100%;
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

const ShippingInfo = styled.div`
  margin-top: 10px;

  @media (max-width: 480px) {
    text-align: left;
  }
`;
