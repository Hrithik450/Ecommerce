import React, { useState } from "react";
import styled from "styled-components";
import { IoArrowBackSharp } from "react-icons/io5";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resendEmail } from "../../store/slices/auth/authThunks";
import Orders from "../../components/account/orders";
import AddressShimmer from "../../components/common/shimmers/account/AddressShimmer";
import Address from "../../components/account/address";

const Account = () => {
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [showOrders, setShowOrders] = useState(false);
  const { orderList, RefundBalance } = useSelector((state) => state.order);
  const { user, authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleResend = async () => {
    const res = await dispatch(resendEmail()).unwrap();
    if (res.success) {
      navigate("/verify-email");
    }
  };

  return (
    <StyledAccountConayainer>
      <StyledImageContainer>
        <a href="/">
          <IoArrowBackSharp className="back-svg" />
        </a>
        <StyledImage
          src={
            "https://res.cloudinary.com/duozomapm/image/upload/v1737799706/AnuvBanner2_lp8bqd.jpg"
          }
        />
      </StyledImageContainer>
      <Header>
        {orderList && orderList.length > 0 && (
          <Title
            onClick={() => setShowOrders(true)}
            className={`${showOrders ? "active" : ""}`}
          >
            My Orders
          </Title>
        )}
        <Title
          onClick={() => setShowOrders(false)}
          className={`${showOrders ? "" : "active"}`}
        >
          Profile
        </Title>
      </Header>
      <div className="address">
        {showOrders ? (
          <Orders />
        ) : (
          <>
            {authLoading ? (
              [...Array(1)].map((_, pidx) => (
                <AddressShimmer key={`shimmer-${pidx}`} />
              ))
            ) : (
              <Profile>
                <ProTitle>UserID:</ProTitle>
                <Value>{user?.userID}</Value>

                <ProTitle>Username:</ProTitle>
                <Value>{user?.username}</Value>

                <ProTitle>Refund Balance:</ProTitle>
                <Value>
                  ₹{RefundBalance !== undefined ? RefundBalance : "0"}
                </Value>

                <ProTitle>Email Address:</ProTitle>
                <Value>
                  {user?.email}

                  {user?.isVerified ? (
                    <a className="verifed">
                      {" "}
                      verified <IoCheckmarkDoneCircle />
                    </a>
                  ) : (
                    <a className="verify" onClick={handleResend}>
                      {" "}
                      verify <IoCheckmarkCircleSharp />
                    </a>
                  )}
                </Value>
              </Profile>
            )}
            <Address
              selectedId={currentSelectedAddress}
              setCurrentSelectedAddress={setCurrentSelectedAddress}
            />
          </>
        )}
      </div>
    </StyledAccountConayainer>
  );
};

export default Account;

const StyledAccountConayainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #2b4162;
  background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);

  .address {
    max-width: 1200px;
    padding: 0 1rem;
    margin: 0 auto;
    width: 100%;
    color: white;
  }
`;

const StyledImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 300px;
  width: 100%;

  .back-svg {
    cursor: pointer;
    border-radius: 50%;
    position: absolute;
    background: black;
    padding: 0.5rem;
    font-size: 2rem;
    color: white;
    top: 1rem;
    left: 2rem;

    @media (max-width: 479px) {
      left: 1rem;
    }
  }
`;

const Header = styled.nav`
  max-width: 1200px;
  width: 100%;
  padding: 0 1rem;
  margin: 20px auto;
  display: flex;
  gap: 1rem;

  .active {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const StyledImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
`;

const Title = styled.h3`
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 20px;
  font-size: 1.1rem;
  color: white;
  text-align: left;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;

  @media (max-width: 579px) {
    font-size: 1rem;
  }
`;

const Profile = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 0 0 3rem 0;
  row-gap: 1rem;
`;

const ProTitle = styled.strong`
  font-size: 1.2rem;

  @media (max-width: 479px) {
    font-size: 0.9rem;
  }
`;

const Value = styled.p`
  font-size: 1.2rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.6);

  a {
    text-decoration: none;
    cursor: pointer;
    color: white;
    max-width: max-content;
    background-color: #4caf50;
    padding: 0.125rem 0.5rem;
    border-radius: 20px;
    font-size: 1rem;
    display: inline-flex;
    align-items: center;
    margin-left: 0.5rem;
    gap: 0.25rem;

    svg {
      color: green;
    }

    @media (max-width: 599px) {
      margin-left: 0rem;
      font-size: 0.8rem;
      margin-top: 0.5rem;
    }
  }

  .verify {
    background-color: yellow;
    color: black;

    svg {
      color: green;
    }
  }

  @media (max-width: 479px) {
    font-size: 0.9rem;
  }
`;
