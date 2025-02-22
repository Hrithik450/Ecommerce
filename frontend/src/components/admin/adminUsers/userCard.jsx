import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  toggleMorePanel,
  toggleUserEdit,
} from "../../../store/slices/admin/adminAuth/adminAuthSlice";

const UserCard = ({ user, handleUser }) => {
  const dispatch = useDispatch();

  const handleEdit = async () => {
    handleUser(user);
    await dispatch(toggleUserEdit());
  };

  const handleMorePanel = async () => {
    handleUser(user);
    await dispatch(toggleMorePanel());
  };

  return (
    <Card>
      <Info>
        <strong>UserID:</strong> {user?.userID}
      </Info>
      <Info>
        <strong>Username:</strong> {user?.username}
      </Info>
      <Info>
        <strong>Email:</strong> {user?.email}
      </Info>
      <Info>
        <strong>Admin:</strong> {user?.isAdmin ? "Yes" : "No"}
      </Info>
      <Info>
        <strong>Verified:</strong> {user?.isVerified ? "Yes" : "No"}
      </Info>
      <Info>
        <strong>Last Login:</strong>{" "}
        {new Date(
          user?.lastLogin?.seconds * 1000 +
            user?.lastLogin?.nanoseconds / 1000000
        ).toLocaleString()}
      </Info>
      <Info>
        <strong>Created At:</strong>{" "}
        {new Date(
          user?.createdAt?.seconds * 1000 +
            user?.createdAt?.nanoseconds / 1000000
        ).toLocaleString()}
      </Info>
      <ButtonContainer>
        <Button>Send Email</Button>
        <Button onClick={handleEdit}>Edit</Button>
        <Button onClick={handleMorePanel}>More...</Button>
      </ButtonContainer>
    </Card>
  );
};

export default UserCard;

const Card = styled.div`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);
  background-color: #2b4162;
  border: 1px solid rgba(255, 255, 255, 0.4);
  text-align: left;
  padding: 20px;
`;

const Info = styled.p`
  color: white;
  font-size: 1em;
  text-align: left;
  margin: 0.5rem 0;
  display: grid;
  grid-template-columns: 1fr 2fr;

  strong {
    color: rgba(255, 255, 255, 0.8);
  }

  @media (max-width: 479px) {
    font-size: 0.9em;
  }
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  margin-top: 20px;
  gap: 1rem;
`;

const Button = styled.button`
  background: linear-gradient(90deg, #ff00ff, #ff7300);
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1em;
  transition: 0.3s;
  font-weight: 900;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 479px) {
    font-size: 0.75em;
  }
`;
