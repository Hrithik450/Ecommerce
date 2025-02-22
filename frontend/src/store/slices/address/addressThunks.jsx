import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { AlertObject } from "../../../components/common/Config";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const addNewAddress = createAsyncThunk(
  "addresses/addNewAddress",
  async ({ userID, AddressData }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/address/createAddress`,
        { userID, AddressData },
        { withCredentials: true }
      );

      toast.success(response?.data?.message, AlertObject);
      return response?.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage, AlertObject);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const fetchAllAddresses = createAsyncThunk(
  "addresses/fetchAllAddresses",
  async ({ userID }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/address/fetchAllAdress/${userID}`
      );

      return response?.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong.";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const editaAddress = createAsyncThunk(
  "addresses/editaAddress",
  async ({ userID, AddressID, UpdatedAddress }, thunkAPI) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/v1/address/editAddress/${userID}/${AddressID}`,
        UpdatedAddress
      );

      toast.success(response?.data?.message, AlertObject);
      return response?.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage, AlertObject);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "addresses/deleteAddress",
  async ({ userID, AddressID }, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/v1/address/deleteAddress/${userID}/${AddressID}`
      );

      toast.success(response?.data?.message, AlertObject);
      return response?.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage, AlertObject);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
