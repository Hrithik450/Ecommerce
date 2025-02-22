import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { FaCheckCircle } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa6";
import { FaShippingFast } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { toggleTrack } from "../../store/slices/order/orderSlice";

const Icons = {
  "Order Confirmed": <FaCheckCircle />,
  "Order Dispatched": <FaBoxOpen />,
  "Order Shipped": <FaShippingFast />,
  "Out For Delivery": <FaTruck />,
  "Order Delivered": <FaHome />,
  "Order Cancelled": <MdCancel />,
};

const TrackOrder = () => {
  const { orderDetails } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleTrack());
  };

  const TrackData = orderDetails?.TrackStatus || null;

  return (
    <Container>
      <Header>
        <HeadTitle>Track Status-</HeadTitle>
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

export default TrackOrder;

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
  background: #666;
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
