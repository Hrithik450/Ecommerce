import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import DotSpinner from "../../common/dotSpinner";
import {
  toggleUserBlock,
  toggleUserEdit,
} from "../../../store/slices/admin/adminAuth/adminAuthSlice";
import { updateUser } from "../../../store/slices/admin/adminAuth/adminAuthThunks";

const EditUserDetails = ({ user }) => {
  const { adminAuthLoading } = useSelector((state) => state.adminAuth);
  const [formData, setFormData] = useState({
    Admin: false,
  });
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleUserEdit());
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const res = await dispatch(
      updateUser({ userID: user?.userID, Admin: formData.Admin })
    ).unwrap();
    if (res.success) {
      handleClose();
    }
  };

  const handleUserDelete = async (e) => {
    await dispatch(toggleUserBlock());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value === "true" });
  };

  return (
    <Container>
      <Header>
        <HeadTitle>Edit User Details</HeadTitle>
        <CloseButton onClick={handleClose}>✕</CloseButton>
      </Header>
      <FormContainer>
        <FormGroup>
          <Label>Admin</Label>
          <Select name="Admin" value={formData.Admin} onChange={handleChange}>
            <option value={true}>True</option>
            <option value={false}>False</option>
          </Select>
        </FormGroup>
        <ButtonParent>
          <SubmitButton onClick={handleUpdateUser}>
            {adminAuthLoading ? <DotSpinner /> : "Update User"}
          </SubmitButton>
          <DeleteButton onClick={handleUserDelete}>Delete User</DeleteButton>
        </ButtonParent>
      </FormContainer>
    </Container>
  );
};

export default EditUserDetails;

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

const FormContainer = styled.div`
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

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  background: transparent;
  color: white;

  option {
    color: black;
  }
`;

const ButtonParent = styled.div`
  grid-template-columns: 1fr 1fr;
  display: grid;
  margin: 1rem 0;
  gap: 1rem;
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

const DeleteButton = styled.button`
  background: #dc3545;
  padding: 10px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 800;
`;
