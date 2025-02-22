import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { AlertObject } from "../common/Config";
import { toast } from "react-toastify";
import DotSpinner from "../common/dotSpinner";
import { addNewAddress } from "../../store/slices/address/addressThunks";

const initialformData = {
  address: "",
  city: "",
  pincode: "",
  phone: "",
  email: "",
};

const NewAddressForm = () => {
  const [formData, setFormData] = useState(initialformData);
  const { addressList, addressLoading } = useSelector((state) => state.address);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (addressList.length >= 2) {
      return toast.error("You can add max 2 Address", AlertObject);
    }

    if (user !== null) {
      await dispatch(
        addNewAddress({
          userID: user?.userID,
          AddressData: { ...formData, username: user?.username },
        })
      ).unwrap();
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>Add New Address</h2>
      <FormLabel htmlFor="address">Address:</FormLabel>
      <FormInput
        type="text"
        id="address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address...."
        required
      />

      <FormLabel htmlFor="city">City:</FormLabel>
      <FormInput
        type="text"
        id="city"
        name="city"
        value={formData.city}
        onChange={handleChange}
        placeholder="City"
        required
      />

      <FormLabel htmlFor="pincode">Pincode:</FormLabel>
      <FormInput
        type="text"
        id="pincode"
        name="pincode"
        value={formData.pincode}
        onChange={handleChange}
        placeholder="Pincode"
        required
      />

      <FormLabel htmlFor="phone">Phone:</FormLabel>
      <FormInput
        type="tel"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Mobile Number"
        required
      />

      <FormLabel htmlFor="email">Email:</FormLabel>
      <FormInput
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />

      <FormButton type="submit">
        {addressLoading ? <DotSpinner /> : "Add Address"}
      </FormButton>
    </FormContainer>
  );
};

export default NewAddressForm;

const FormContainer = styled.form`
  max-width: 100%;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin: 2rem 0;
  color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  h2 {
    font-size: 1.75rem;
  }
`;

const FormLabel = styled.label`
  font-weight: bold;
`;

const FormInput = styled.input`
  border: 1px solid rgba(255, 255, 255, 0.25);
  background-color: transparent;
  border-radius: 4px;
  padding: 0.5rem;
  color: white;
`;

const FormButton = styled.button`
  background: linear-gradient(90deg, #ff00ff, #ff7300);
  color: #fff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 900;
  font-size: 1.1rem;
  margin: 1rem 0 0.5rem 0;
`;
