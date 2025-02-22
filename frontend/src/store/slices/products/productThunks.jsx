import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { AlertObject } from "../../../components/common/Config";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getFilteredProducts = createAsyncThunk(
  "filter/products",
  async ({ filterParams, page }, thunkAPI) => {
    const query = new URLSearchParams({
      ...filterParams,
      page,
    });

    try {
      const response = await axios.get(
        `${API_URL}/api/v1/product/get?${query}`,
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

export const getSectionProducts = createAsyncThunk(
  "section/products",
  async ({ sectionName }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/product/get/sectionproducts`,
        { sectionName },
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

export const getHeroProducts = createAsyncThunk(
  "hero/products",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/product/get/getheroproducts`,
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

export const getProductById = createAsyncThunk(
  "get/product",
  async ({ productID }, thunkAPI) => {
    try {
      const res = await axios.get(
        `${API_URL}/api/v1/product/get/${productID}`,
        { productID },
        { withCredentials: true }
      );

      return res?.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong.";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getRandomProducts = createAsyncThunk(
  "random/products",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        `${API_URL}/api/v1/product/get/randomProducts`,
        { withCredentials: true }
      );
      return res?.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong.";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "update/product",
  async ({ updatedData, productID }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/product/updateproduct/${productID}`,
        { updatedData },
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

export const fetchCartProduct = createAsyncThunk(
  "fetch/product",
  async ({ userID, productID }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/cart/fetchUserCart/${userID}/${productID}`,
        { withCredentials: true }
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
