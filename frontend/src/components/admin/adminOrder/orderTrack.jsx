import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { FaCheckCircle } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa6";
import { FaShippingFast } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DotSpinner from "../../common/dotSpinner";
import { updateOrderstatus } from "../../../store/slices/admin/adminOrder/adminOrderThunks";
import { toggleTrackPanel } from "../../../store/slices/admin/adminOrder/adminOrderSlice";

const Icons = {
  "Order Confirmed": <FaCheckCircle />,
  "Order Dispatched": <FaBoxOpen />,
  "Order Shipped": <FaShippingFast />,
  "Out For Delivery": <FaTruck />,
  "Order Delivered": <FaHome />,
  "Order Cancelled": <MdCancel />,
};

const AdminTrackOrder = ({ filters, page }) => {
  const { orderDetail, adminOrderLoading } = useSelector(
    (state) => state.adminOrder
  );
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    TrackStatus: "",
    deliveryDate: null,
  });

  const handleClose = () => dispatch(toggleTrackPanel());

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prevState) => ({
      ...prevState,
      deliveryDate: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(
        updateOrderstatus({
          order: orderDetail,
          TrackStatus: formData.TrackStatus,
          deliveryDate: formData.deliveryDate,
          filterParams: filters,
          page: page,
        })
      ).unwrap();
      if (response.success) handleClose();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const TrackData = orderDetail?.TrackStatus || null;

  return (
    <Container>
      <Header>
        <HeadTitle>Track Status</HeadTitle>
        <CloseButton onClick={handleClose}>✕</CloseButton>
      </Header>

      <TimelineContainer>
        {TrackData?.map((track, tidx) => {
          const isLastItem = tidx === TrackData.length - 1;
          const isCancelled = track?.title === "Order Cancelled";
          const isOrderCancelled = TrackData.some(
            (t) => t.title === "Cancelled"
          );

          return (
            <Step key={`track-${tidx}`}>
              <IconWrapper
                className={
                  isCancelled
                    ? "cancelLine"
                    : track?.status === "done"
                    ? "activeLine"
                    : ""
                }
              >
                {Icons[track?.title]}
              </IconWrapper>
              <StepContent>
                <Title>{track?.title}</Title>
                {tidx !== TrackData.length - 1 ? (
                  track?.time && (
                    <Time>
                      {track?.time}, {track?.date}
                    </Time>
                  )
                ) : (
                  <Time>
                    {track?.time || "Expected By"}, {track?.date}
                  </Time>
                )}
              </StepContent>
              {tidx < TrackData.length - 1 && (
                <VerticalLine
                  className={
                    isOrderCancelled
                      ? "cancelLine"
                      : track?.status === "done" &&
                        TrackData[tidx + 1]?.status === "done"
                      ? "activeLine"
                      : ""
                  }
                />
              )}
            </Step>
          );
        })}
      </TimelineContainer>

      <SectionTitle>Shipping Address</SectionTitle>
      <ShippingInfo>
        {["username", "address", "city", "pincode", "phone", "email"].map(
          (field) => (
            <DetailText key={field}>
              {orderDetail?.addressInfo?.[field]}
            </DetailText>
          )
        )}
      </ShippingInfo>

      {orderDetail?.orderStatus !== "Delivered" &&
        orderDetail?.orderStatus !== "Cancelled" && (
          <DatePickerWrapper>
            <Label>Delivery Date:</Label>
            <StyledDatePicker
              selected={formData.deliveryDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="DD/MM/YYYY"
            />
          </DatePickerWrapper>
        )}

      {orderDetail?.orderStatus !== "Delivered" &&
        orderDetail?.orderStatus !== "Cancelled" && (
          <>
            <Select
              name="TrackStatus"
              value={formData.TrackStatus}
              onChange={handleChange}
            >
              <option value="">Track Status</option>
              <option value="Dispatched">Order Dispatched</option>
              <option value="Shipped">Order Shipped</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Order Delivered</option>
            </Select>

            <Button onClick={handleSubmit}>
              {adminOrderLoading ? <DotSpinner /> : "Update Now"}
            </Button>
          </>
        )}
    </Container>
  );
};

export default AdminTrackOrder;

const Animation = keyframes`
from {
opacity: 0;
transform: translateX(100%);
} to {
opacity: 1;
transform: translateX(0%);
}
`;

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
  font-family: Arial, sans-serif;
  max-width: 100%;
  width: 100%;
`;

const Step = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: relative;

  .activeLine {
    background: #4a956c;
    color: white;
  }

  .cancelLine {
    background: red;
    color: white;
  }
`;

const IconWrapper = styled.div`
  background: white;
  color: #4a90e2;
  padding: 8px;
  border-radius: 50%;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const VerticalLine = styled.div`
  position: absolute;
  top: 30px;
  left: 16px;
  width: 4px;
  height: 50px;
  background: #333;
  z-index: 1;
`;

const StepContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Time = styled.div`
  font-size: 14px;
  color: gray;
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

const Title = styled.h4`
  font-size: 16px;
  font-weight: bold;
  margin: 5px 0;
  color: white;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const Select = styled.select`
  border-radius: 5px;
  text-align: center;
  padding: 0.5rem;
  font-size: 1rem;
  color: white;
  outline: none;
  border: none;
  width: 100%;
  font-weight: 900;
  background-color: #f7accf;
  background-image: linear-gradient(147deg, #f7accf 0%, #ff1053 74%);

  option {
    color: black;
    font-weight: 900;
  }
`;

const Button = styled.button`
  width: 100%;
  color: white;
  margin: 1rem 0 0 0;
  padding: 0.5rem;
  font-weight: 900;
  font-size: 1rem;
  outline: none;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background-color: #007bff;

  &:hover {
    background-color: #0056b3;
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

const ShippingInfo = styled.div`
  margin: 20px 0;

  @media (max-width: 480px) {
    text-align: left;
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

const DatePickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 100%;
  margin: 20px 0;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
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
