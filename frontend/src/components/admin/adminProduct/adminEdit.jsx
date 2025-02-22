import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { toggleEdit } from "../../../store/slices/admin/adminProduct/adminProductSlice";
import DotSpinner from "../../common/dotSpinner";
import { updateProduct } from "../../../store/slices/products/productThunks";

const AdminEditDetails = () => {
  const [formData, setFormData] = useState({
    category: "",
    type: [],
    collection: "",
    description: "",
    HeroOrder: 0,
    stock: 0,
    colors: [],
    image: "",
    salePrice: 0,
    price: 0,
    heroimg: "",
    sizes: [],
    title: "",
    saleDiscount: 0,
    typeName: "",
  });
  const dispatch = useDispatch();
  const { productDetail } = useSelector((state) => state.adminProduct);
  const { productLoading } = useSelector((state) => state.product);

  const excludedFields = [
    "productID",
    "createdAt",
    "lastUpdated",
    "comments",
    "reviews",
    "rating",
    "size",
    "color",
  ];
  useEffect(() => {
    if (productDetail) {
      const filteredData = Object.keys(productDetail)
        .filter((key) => !excludedFields.includes(key))
        .reduce((obj, key) => {
          obj[key] = productDetail[key];
          return obj;
        }, {});

      setFormData((prevFormData) => ({
        ...prevFormData,
        ...filteredData,
      }));
    }
  }, [productDetail]);

  const handleClose = () => {
    dispatch(toggleEdit());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value.split(",").map((item) => item.trim()),
    });
  };

  const handleRemoveItem = (name, index) => {
    setFormData({
      ...formData,
      [name]: formData[name].filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (productDetail?.productID) {
      const res = await dispatch(
        updateProduct({
          updatedData: {
            ...formData,
            price: Number(formData.price),
            salePrice: Number(formData.salePrice),
            saleDiscount: Number(formData.saleDiscount),
            HeroOrder: Number(formData.HeroOrder),
            stock: Number(formData.stock),
          },
          productID: productDetail?.productID,
        })
      ).unwrap();
      if (res?.success) {
        handleClose();
      }
    }
  };

  return (
    <Container>
      <Header>
        <HeadTitle>Edit Product-</HeadTitle>
        <CloseButton onClick={handleClose}>✕</CloseButton>
      </Header>

      <FormContainer onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <FormGroup key={key}>
            <Label>{key}</Label>
            {["type", "colors", "sizes"].includes(key) ? (
              <>
                <Input
                  type="text"
                  name={key}
                  placeholder="Add items separated by commas"
                  value={formData[key].join(", ")}
                  onChange={(e) => handleArrayChange(key, e.target.value)}
                />
                <TagContainer>
                  {formData[key].map((item, index) => (
                    <Tag key={index}>
                      {item}{" "}
                      <RemoveButton
                        onClick={() => handleRemoveItem(key, index)}
                      >
                        ✕
                      </RemoveButton>
                    </Tag>
                  ))}
                </TagContainer>
              </>
            ) : (
              <Input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                placeholder={key}
              />
            )}
          </FormGroup>
        ))}
        <SubmitButton type="submit">
          {productLoading ? <DotSpinner /> : "Update"}
        </SubmitButton>
      </FormContainer>
    </Container>
  );
};

export default AdminEditDetails;

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
    width: 100%;
    padding: 10px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 1rem 0;

  @media (max-width: 479px) {
    padding: 0 1rem;
  }
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

const FormContainer = styled.form`
  display: grid;
  gap: 16px;
  width: 100%;
  padding: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  background: transparent;
  color: white;
  font-size: 1.1rem;

  @media (max-width: 479px) {
    font-size: 0.9rem;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(90deg, #ff00ff, #ff7300);
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 800;
  &:hover {
    background-color: #0056b3;
  }
`;

const TagContainer = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  margin-top: 5px;
`;

const Tag = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: transparent;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  display: flex;
  align-items: center;
`;

const RemoveButton = styled.span`
  margin-left: 5px;
  cursor: pointer;
  color: red;
  font-weight: bold;
`;
