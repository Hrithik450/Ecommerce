import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaBagShopping } from "react-icons/fa6";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DotSpinner from "../common/dotSpinner";
import { addToCart } from "../../store/slices/cart/cartThunks";
import { toggleCart } from "../../store/slices/cart/cartSlice";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [cartLoading, setcartLoading] = useState(false);
  const dispatch = useDispatch();

  const isInCart = cartItems.some(
    (item) => item.productID === product.productID
  );

  const calculateDiscountPercentage = (salePrice, price) => {
    if (salePrice >= price) {
      return 0;
    }
    const discountAmount = price - salePrice;
    const discountPercentage = (discountAmount / price) * 100;
    return discountPercentage.toFixed(2);
  };

  const handleCart = async () => {
    if (!isAuthenticated) {
      return navigate("/login");
    }

    if (!user) return;

    try {
      setcartLoading(true);
      await dispatch(
        addToCart({
          userID: user?.userID,
          productID: product?.productID,
          cartData: { quantity: 1 },
        })
      ).unwrap();
    } catch (error) {
      console.error("Failed to add product:", error);
    } finally {
      setcartLoading(false);
    }
  };

  return (
    <CardParent>
      <Card className={product?.type.includes("Special") ? "SpecialCard" : ""}>
        <ImageContainer>
          <ProductImage src={product?.image} alt="Jeans Pants" />
          <QuickView href={`/products/${product.productID}`}>
            QUICK VIEW
          </QuickView>
        </ImageContainer>
        <ProductInfo>
          <Category
            className={product?.type.includes("Special") ? "SpecialDesc" : ""}
          >
            {product?.description}
          </Category>
          <ProductName
            className={product?.type.includes("Special") ? "SpecialTitle" : ""}
          >
            {product?.title}
          </ProductName>
          <Label
            className={product?.type.includes("Special") ? "SpecialDisc" : ""}
          >
            {calculateDiscountPercentage(
              Number(product?.salePrice),
              Number(product?.price)
            )}
            % OFF⚡
          </Label>
          <Price>
            <h3
              className={
                product?.type.includes("Special") ? "SpecialPrice" : ""
              }
            >
              ₹{product?.salePrice}
            </h3>
            <h5>₹{product?.price}</h5>
          </Price>
          <Rating>
            <ReactStars
              count={5}
              value={product?.rating}
              size={window.innerWidth < 479 ? 12 : 20}
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
              edit={false}
            />
            <p>
              <span>({product?.reviews})</span> reviews
            </p>
          </Rating>
        </ProductInfo>
        <Actions>
          {isInCart ? (
            <AddToCartButton
              onClick={() => dispatch(toggleCart())}
              className={
                product?.type.includes("Special") ? "SpecialAction" : ""
              }
            >
              <FaBagShopping />
              GO TO BAG
            </AddToCartButton>
          ) : (
            <AddToCartButton
              onClick={handleCart}
              className={
                product?.type.includes("Special") ? "SpecialAction" : ""
              }
            >
              {cartLoading ? (
                <DotSpinner />
              ) : (
                <>
                  <FaBagShopping />
                  ADD TO BAG
                </>
              )}
            </AddToCartButton>
          )}
        </Actions>
      </Card>
    </CardParent>
  );
};

export default ProductCard;

const Animation = keyframes`
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const CardParent = styled.div`
  .SpecialCard {
    background: linear-gradient(135deg, #000, #ff0000);
  }
`;

const Card = styled.div`
  animation: ${Animation} linear;
  animation-timeline: view();
  animation-range: entry 0% cover 30%;
  display: grid;
  grid-template-rows: auto auto auto;
  background-color: #2b4162;
  background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
  border: 1px solid rgba(2552, 255, 255, 0.4);
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-2%);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  &:hover a {
    opacity: 1;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
`;

const QuickView = styled.a`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #5e7582;
  color: #fff;
  padding: 10px 0;
  font-weight: bold;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  text-decoration: none;

  @media (max-width: 479px) {
    font-size: 0.7rem;
  }
`;

const ProductInfo = styled.div`
  padding: 15px 10px 5px 10px;
  text-align: left;
  max-width: 100%;

  .SpecialDesc {
    color: #e0e0e0;
  }

  .SpecialDisc {
    color: #ffd700;
  }
`;

const Label = styled.p`
  font-size: 0.9rem;
  font-style: italic;
  font-weight: 900;
  color: #ffd700;
`;

const Category = styled.p`
  margin: 0;
  font-size: 12px;
  color: #aaa;
  text-transform: uppercase;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 479px) {
    font-size: 10px;
  }
`;

const ProductName = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 5px 0;
  color: white;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 479px) {
    font-size: 14px;
  }
`;

const Price = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  font-size: 20px;
  font-weight: 900;

  h3 {
    background-color: #f7accf;
    background-image: linear-gradient(147deg, #f7accf 0%, #ff1053 74%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  h5 {
    padding-bottom: 2px;
    position: relative;
    color: #aaa;

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0%;
      transform: translateY(-50%);
      width: 100%;
      height: 1px;
      background: #aaa;
    }
  }

  @media (max-width: 479px) {
    font-size: 15px;
  }
`;

const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 5px;
  align-items: center;
  padding: 0 10px 15px 10px;
  transition: all 0.3 ease-in-out;

  &:hover {
    transform: translateY(-5%);
  }

  .SpecialAction {
    background: #32cd32;
  }
`;

const AddToCartButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: linear-gradient(90deg, #ff00ff, #ff7300);
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;

  svg {
    font-size: 1rem;
    margin-bottom: 2px;
  }

  @media (max-width: 470px) {
    font-size: 12px;

    svg {
      font-size: 12px;
    }
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 0.25rem 0;
  color: white;

  p {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 5px;
    font-size: 0.9rem;

    span {
      font-size: 1rem;
    }

    @media (max-width: 479px) {
      font-size: 0.6rem;
      gap: 2px;

      span {
        margin-top: 0;
        font-size: 0.7rem;
      }
    }
  }
`;
