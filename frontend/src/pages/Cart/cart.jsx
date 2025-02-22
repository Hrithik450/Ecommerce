import React, { useEffect, useMemo } from "react";
import styled, { keyframes } from "styled-components";
import CartCard from "../../components/cart/cartCard";
import DotSpinner from "../../components/common/dotSpinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleCart } from "../../store/slices/cart/cartSlice";

const Cart = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { cartItems, cartLoading } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleToggle = async () => {
    dispatch(toggleCart());
  };

  const calculateCartTotals = (cartItems) => {
    if (!cartItems || cartItems.length === 0) {
      return { subTotal: 0, discount: 0, shippingFee: 0 };
    }

    const subTotal = cartItems.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );

    const discount = cartItems.reduce(
      (acc, item) =>
        acc + (item.price - item.salePrice || 0) * (item.quantity || 1),
      0
    );

    const shippingFee = subTotal >= 1000 ? 0 : 48;

    return { subTotal, discount, shippingFee };
  };

  const Totals =
    isAuthenticated && cartItems?.length > 0
      ? calculateCartTotals(cartItems)
      : null;

  const TotalFee = Totals
    ? Totals.subTotal - Totals.discount + Totals.shippingFee
    : 0;

  return (
    <CartContainer>
      <Header>
        <Title>My Cart-</Title>
        <CloseButton onClick={handleToggle}>✕</CloseButton>
      </Header>

      {!isAuthenticated && <h2>Login to check cart!</h2>}
      {isAuthenticated && cartItems.length === 0 && (
        <h2>Your cart is empty!</h2>
      )}

      {cartLoading ? (
        <DotSpinner />
      ) : (
        <>
          {isAuthenticated &&
            cartItems.length > 0 &&
            cartItems.map((item, cidx) => (
              <CartCard item={item} key={`card-${cidx}`} />
            ))}

          {isAuthenticated && cartItems.length > 0 && (
            <div className="bottom-nav">
              <ProductDetailsSection>
                <ProductDetailsInfo>
                  <ProductDetailsRow>
                    <ProductDetailsType>Sub Total</ProductDetailsType>
                    <ProductDetailsTime>₹{Totals.subTotal}</ProductDetailsTime>
                  </ProductDetailsRow>
                  <ProductDetailsRow>
                    <ProductDetailsType>Discount</ProductDetailsType>
                    <ProductDetailsTime>₹{Totals.discount}</ProductDetailsTime>
                  </ProductDetailsRow>
                  <ProductDetailsRow>
                    <ProductDetailsType>Shipping Fee</ProductDetailsType>
                    <ProductDetailsTime>
                      ₹{Totals.shippingFee}
                    </ProductDetailsTime>
                  </ProductDetailsRow>
                </ProductDetailsInfo>
              </ProductDetailsSection>

              <Total>
                <TotalLabel>Total</TotalLabel>
                <TotalPrice>₹{TotalFee}</TotalPrice>
              </Total>

              <CheckoutButton href="/checkout">Checkout</CheckoutButton>
            </div>
          )}
        </>
      )}
    </CartContainer>
  );
};

const Animation = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  } 
  to {
    opacity: 1;
    transform: translateY(0%);
  }
`;

const CartContainer = styled.div`
  scrollbar-width: none;
  animation: ${Animation} 0.3s ease-in-out;
  position: fixed;
  right: 0%;
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  gap: 1rem;
  padding: 1rem;
  min-width: 400px;
  max-width: 400px;
  margin: 0 auto;
  border: 1px solid white;
  color: black;
  z-index: 99;
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  overflow-y: auto;
  background-color: #2b4162;
  background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);
  color: white;

  .bottom-nav {
    padding: 0 1rem;
  }

  @media (max-width: 479px) {
    min-width: 100%;
    max-width: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 1rem 0;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: white;
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 1rem 0;
`;

const TotalLabel = styled.p`
  margin: 0;
`;

const TotalPrice = styled.p`
  margin: 0;
`;

const ProductDetailsSection = styled.div`
  margin: 1rem 0;
`;

const ProductDetailsHeading = styled.h2`
  font-size: 1.7rem;
  margin: 1rem 0 1.5rem 0;
`;

const ProductDetailsInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProductDetailsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const ProductDetailsType = styled.span`
  font-size: 1rem;

  @media (max-width: 479px) {
    font-size: 0.9rem;
  }
`;

const ProductDetailsTime = styled.span`
  font-size: 1rem;
  color: #888;
  justify-self: end;

  @media (max-width: 479px) {
    font-size: 0.9rem;
  }
`;

const CheckoutButton = styled.a`
  text-decoration: none;
  display: block;
  padding: 1rem;
  font-size: 1.2rem;
  background: linear-gradient(90deg, #ff00ff, #ff7300);
  color: #fff;
  border: none;
  cursor: pointer;
  text-align: center;
  width: 100%;
  font-weight: 800;

  &:hover {
    background-color: #444;
  }
`;

export default Cart;
