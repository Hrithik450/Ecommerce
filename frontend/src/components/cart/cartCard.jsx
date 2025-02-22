import React from "react";
import styled from "styled-components";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateQty } from "../../store/slices/cart/cartThunks";

const CartCard = ({ item }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const calculateDiscount = (price, salePrice) => {
    if (
      !price ||
      !salePrice ||
      isNaN(price) ||
      isNaN(salePrice) ||
      price <= salePrice
    ) {
      return 0;
    }
    const discount = ((price - salePrice) / price) * 100;
    return Math.ceil(discount);
  };

  const handleChange = async (name, value) => {
    if (!name || value === undefined) return;
    if (user !== null) {
      await dispatch(
        updateQty({
          userID: user?.userID,
          productID: item?.productID,
          UpdatedCartData: {
            [name]: value,
          },
        })
      ).unwrap();
    }
  };

  const handleDelete = async () => {
    if (user !== null) {
      await dispatch(
        deleteCartItem({
          userID: user?.userID,
          productID: item?.productID,
        })
      ).unwrap();
    }
  };

  return (
    <CartItem>
      <div className="item-details">
        <Image src={item?.image} alt="Product image" />
        <Details>
          <ProductName>{item?.productName}</ProductName>
          <Price>
            <span>
              {calculateDiscount(Number(item?.price), Number(item?.salePrice))}%
              OFF
            </span>
            <h2>₹{item?.salePrice}</h2>
          </Price>
          <Options>
            <Label>Color:</Label>
            <ColorOptions>
              {item?.colors?.map((color, cidx) => (
                <ColorCircle
                  name="color"
                  color={color}
                  key={`color-${cidx}`}
                  onClick={() => handleChange("color", color)}
                  className={item?.color === color ? "activeColor" : ""}
                />
              ))}
            </ColorOptions>
            <Label>Size:</Label>
            <Select
              name="size"
              className="select"
              value={item?.size || ""}
              onChange={(e) => handleChange("size", e.target.value)}
            >
              <option value="">Select Size</option>
              {item?.sizes?.map((size, sidx) => (
                <option key={`size-${sidx}`} value={size}>
                  {size}
                </option>
              ))}
            </Select>
          </Options>
        </Details>
      </div>

      <div className="actions">
        <QtyBtn>
          <Select
            name="quantity"
            value={item?.quantity || 1}
            onChange={(e) => handleChange("quantity", Number(e.target.value))}
          >
            {item?.type?.includes("Special") ? (
              <option value="1">Qty 1</option>
            ) : (
              <>
                <option value="1">Qty 1</option>
                <option value="2">Qty 2</option>
                <option value="3">Qty 3</option>
                <option value="4">Qty 4</option>
                <option value="5">Qty 5</option>
              </>
            )}
          </Select>
        </QtyBtn>

        <DeleteButton onClick={handleDelete}>
          <MdDelete />
          Delete
        </DeleteButton>
      </div>
    </CartItem>
  );
};

export default CartCard;

const CartItem = styled.div`
  box-shadow: 0 0 1px 2px rgba(255, 255, 255, 0.1);
  padding: 1rem;
  color: white;

  .item-details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
    gap: 1rem;
  }

  .actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 1rem 0 0 0;
    border: 1px solid gray;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
  border: 1px solid white;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.25rem;
`;

const ProductName = styled.p`
  font-size: 1.1rem;
  margin: 0;
  font-weight: bold;
`;

const Options = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-content: center;
  align-items: center;
  row-gap: 0.75rem;

  .select {
    border: 1px solid rgba(255, 255, 255, 0.5);
    max-width: max-content;
  }
`;

const ColorOptions = styled.div`
  display: flex;
  gap: 1rem;

  .activeColor {
    border: 2px solid blue;
  }
`;

const ColorCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 1px solid #ccc;
  cursor: pointer;
`;

const QtyBtn = styled.button`
  background: transparent;
  font-size: 1rem;
`;

const DeleteButton = styled.button`
  padding: 0.5rem 0;
  width: 100%;
  background-color: #dc3545;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: white;
`;

const Price = styled.div`
  h2 {
    display: inline-flex;
    font-size: 1rem;
    font-weight: bold;
    padding-left: 0.5rem;
    background-color: #f7accf;
    background-image: linear-gradient(147deg, #f7accf 0%, #ff1053 74%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  span {
    font-size: 1.2rem;
    color: #28a745;
    font-weight: bold;
  }
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
`;

const Select = styled.select`
  padding: 0.25rem;
  font-size: 1rem;
  color: white;
  outline: none;
  border: none;
  background: transparent;
  width: 100%;

  option {
    color: black;
  }
`;
