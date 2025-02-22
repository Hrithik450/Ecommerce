import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { AlertObject } from "../../components/common/Config";
import { toast } from "react-toastify";
import { toggleCancel } from "../../store/slices/order/orderSlice";
import { cancelOrder } from "../../store/slices/order/orderThunks";
import DotSpinner from "../common/dotSpinner";

const CancelOrder = () => {
  const dispatch = useDispatch();
  const { orderDetails, orderLoading } = useSelector((state) => state.order);
  const [formData, setformData] = useState({
    problem: "",
  });

  const handleClose = () => {
    dispatch(toggleCancel());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.problem === "") {
      return toast.error("Please provide a reason to cancel!!", AlertObject);
    }

    if (orderDetails?.orderID) {
      const res = await dispatch(
        cancelOrder({
          orderID: orderDetails?.orderID,
          reason: formData.problem,
          userID: orderDetails?.userID,
        })
      ).unwrap();
      if (res.success) {
        handleClose();
      }
    }
  };

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

      <SectionTitle>Are you sure?</SectionTitle>
      <ButtonParent>
        <CancelButton onClick={handleSubmit}>
          {orderLoading ? <DotSpinner /> : "Yes, Cancel"}
        </CancelButton>
        <CancelButton className="NotCancel" onClick={handleClose}>
          Don't Cancel
        </CancelButton>
      </ButtonParent>

      <SectionTitle>Reason for Cancellation</SectionTitle>
      <TextArea
        placeholder="describe your problem..."
        name="problem"
        onChange={handleChange}
        value={formData.problem}
        required
      ></TextArea>
    </Container>
  );
};

export default CancelOrder;

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

const TextArea = styled.textarea`
  background: transparent;
  padding: 0.75rem 1rem;
  width: 100%;
  height: 100px;
  font-size: 1rem;
  color: white;
`;

const ButtonParent = styled.div`
  grid-template-columns: 1fr 1fr;
  display: grid;
  margin: 1rem 0;
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
