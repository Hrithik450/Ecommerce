import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AlertObject } from "../../../components/common/Config";
import { toast } from "react-toastify";
import { fetchCartData } from "../products/productSlice";
const API_URL = import.meta.env.VITE_BACKEND_URL;

export const addToCart = createAsyncThunk(
  "cart/addItem",
  async ({ userID, productID, cartData }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/cart/addToCart`,
        {
          userID,
          productID,
          cartData,
        },
        {
          withCredentials: true,
        }
      );

      thunkAPI.dispatch(fetchCartData(response.data.product));
      if (!response.data.success) {
        toast.error(response?.data?.message, AlertObject);
      } else toast.success(response?.data?.message, AlertObject);
      return response?.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage, AlertObject);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const fetchCartItems = createAsyncThunk(
  "cart/fetchItems",
  async ({ userID }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/cart/fetchCart/${userID}`,
        { withCredentials: true }
      );

      return response?.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong.";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteItem",
  async ({ userID, productID }, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/v1/cart/deleteItem/${userID}/${productID}`,
        { withCredentials: true }
      );

      thunkAPI.dispatch(fetchCartData(response.data.product));
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

export const updateQty = createAsyncThunk(
  "cart/updateQty",
  async ({ userID, productID, UpdatedCartData }, thunkAPI) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/v1/cart/updateCart`,
        {
          userID,
          productID,
          UpdatedCartData,
        },
        { withCredentials: true }
      );

      thunkAPI.dispatch(fetchCartData(response.data.product));
      toast.success(response?.data?.message, AlertObject);
      return response?.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage, AlertObject);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);
