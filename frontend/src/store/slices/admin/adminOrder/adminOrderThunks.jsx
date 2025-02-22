import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { AlertObject } from "../../../../components/common/Config";
const API_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchAllTrans = createAsyncThunk(
  "orders/fetch",
  async ({ filterParams, page }, thunkAPI) => {
    const query = new URLSearchParams({
      ...filterParams,
      page,
    });

    try {
      const response = await axios.get(
        `${API_URL}/api/v1/order/getAllTransactions?${query}`,
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
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const updateOrderstatus = createAsyncThunk(
  "update/status",
  async (
    { order, TrackStatus, deliveryDate, filterParams, page },
    thunkAPI
  ) => {
    const query = new URLSearchParams({
      ...filterParams,
      page,
    });

    try {
      const response = await axios.post(
        `${API_URL}/api/v1/order/updateOrderStatus?${query}`,
        { order, TrackStatus, deliveryDate },
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

export const adminCancelOrder = createAsyncThunk(
  "cancel/order",
  async ({ orderID, reason, userID, filterParams, page }, thunkAPI) => {
    const query = new URLSearchParams({
      ...filterParams,
      page,
    });

    try {
      const response = await axios.post(
        `${API_URL}/api/v1/order/deleteOrder/${orderID}?${query}`,
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
      return response?.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage, AlertObject);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
