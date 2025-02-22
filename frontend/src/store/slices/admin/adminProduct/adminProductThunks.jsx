import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { AlertObject } from "../../../../components/common/Config";
const API_URL = import.meta.env.VITE_BACKEND_URL;

export const createProduct = createAsyncThunk(
  "add/product",
  async ({ formData }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/product/createproduct`,
        { formData },
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

export const deleteProduct = createAsyncThunk(
  "delete/product",
  async ({ productID }, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/v1/product/deleteproduct/${productID}`,
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
