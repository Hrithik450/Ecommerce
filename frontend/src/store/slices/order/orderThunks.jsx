import axios from "axios";
import { toast } from "react-toastify";
import { AlertObject } from "../../../components/common/Config";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const createNewOrder = createAsyncThunk(
  "order/createNewOrder",
  async ({ totalAmount }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/order/createNewOrder`,
        { totalAmount },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );

      return response?.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage, AlertObject);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const capturePayment = createAsyncThunk(
  "order/capturePayment",
  async (
    { orderData, orderID, paymentID, RemainingFunds, paymentMethod },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/order/capturePayment`,
        { orderData, orderID, paymentID, RemainingFunds, paymentMethod },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
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

export const getAllOrdersByUserId = createAsyncThunk(
  "order/getAllOrdersByUserId",
  async ({ userID }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/order/getOrderByUserID/${userID}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );

      return response?.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong.";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "order/cancel",
  async ({ orderID, reason, userID }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/order/deleteOrder/${orderID}`,
        { reason, userID },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );

      toast.success(response?.data?.message, AlertObject);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      return response?.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage, AlertObject);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
