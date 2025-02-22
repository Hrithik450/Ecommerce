import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_BACKEND_URL;
import { AlertObject } from "../../../../components/common/Config";

export const fetchUsersList = createAsyncThunk(
  "admin/fetchusers",
  async ({ filterParams, page }, thunkAPI) => {
    const query = new URLSearchParams({
      ...filterParams,
      page,
    });

    try {
      const response = await axios.get(
        `${API_URL}/api/v1/auth/fetchusers?${query}`,
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

export const fetchUserData = createAsyncThunk(
  "admin/fetchUserData",
  async ({ userID }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/auth/getUserdata/${userID}`,
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

export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ({ userID, Admin }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/auth/updateRole/${userID}`,
        { Admin: Admin },
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

export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async ({ userID }, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/v1/auth/deleteUser/${userID}`,
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
