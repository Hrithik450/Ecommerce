import React from "react";
import styled, { keyframes } from "styled-components";
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import {
  setProduct,
  toggleDelete,
  toggleEdit,
} from "../../../store/slices/admin/adminProduct/adminProductSlice";

const AdminProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const calculateDiscountPercentage = (salePrice, price) => {
    if (salePrice >= price) {
      return 0;
    }
    const discountAmount = price - salePrice;
    const discountPercentage = (discountAmount / price) * 100;
    return discountPercentage.toFixed(2);
  };

  const handleOpen = async (product) => {
    dispatch(toggleEdit());
    dispatch(setProduct(product));
  };

  const handleDelete = (product) => {
    dispatch(toggleDelete());
    dispatch(setProduct(product));
  };

  return (
    <Card>
      <ImageContainer>
        <ProductImage src={product?.image} alt="Jeans Pants" />
        <QuickView href={`/products/${product.productID}`}>
          QUICK VIEW
        </QuickView>
      </ImageContainer>
      <ProductInfo>
        <Category>{product?.description}</Category>
        <ProductName>{product?.title}</ProductName>
        <Label>
          {calculateDiscountPercentage(
            Number(product?.salePrice),
            Number(product?.price)
          )}
          % OFF⚡
        </Label>
        <Price>
          <h3>₹{product?.salePrice}</h3>
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
        <AddToCartButton onClick={() => handleOpen(product)}>
          Edit
        </AddToCartButton>
        <AddToCartButton onClick={() => handleDelete(product)}>
          Delete
        </AddToCartButton>
      </Actions>
      {alert.length > 0 && alert[0].msg && (
        <AlertBox
          msg={alert[0].msg}
          color={alert[0].color}
          bgcolor={alert[0].bgcolor}
        />
      )}
    </Card>
  );
};

export default AdminProductCard;

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
  padding: 15px;
  text-align: left;
`;

const Label = styled.p`
  font-size: 0.9rem;
  font-style: italic;
  font-weight: bold;
  color: white;
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
  font-weight: bold;

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
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  align-items: center;
  padding: 0 15px 15px 15px;
  transition: all 0.3 ease-in-out;

  &:hover {
    transform: translateY(-5%);
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
  padding: 5px 10px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background-color: #2b4162;
    background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);
    border: 1px solid white;
  }

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
