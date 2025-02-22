import { createSlice } from "@reduxjs/toolkit";
import {
  addNewAddress,
  deleteAddress,
  editaAddress,
  fetchAllAddresses,
} from "./addressThunks";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    addressLoading: false,
    addressList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    const setLoading = (state) => {
      state.addressLoading = true;
    };

    const setError = (state) => {
      state.addressLoading = false;
    };

    const setAddress = (state, action) => {
      state.addressLoading = false;
      state.addressList = action.payload.data;
    };

    builder
      .addCase(addNewAddress.pending, setLoading)
      .addCase(addNewAddress.fulfilled, setAddress)
      .addCase(addNewAddress.rejected, setError)
      .addCase(fetchAllAddresses.pending, setLoading)
      .addCase(fetchAllAddresses.fulfilled, setAddress)
      .addCase(fetchAllAddresses.rejected, setError)
      .addCase(editaAddress.pending, setLoading)
      .addCase(editaAddress.fulfilled, setAddress)
      .addCase(editaAddress.rejected, setError)
      .addCase(deleteAddress.pending, setLoading)
      .addCase(deleteAddress.fulfilled, setAddress)
      .addCase(deleteAddress.rejected, setError);
  },
});

export default addressSlice.reducer;
