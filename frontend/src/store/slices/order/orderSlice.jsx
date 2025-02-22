import { createSlice } from "@reduxjs/toolkit";
import {
  cancelOrder,
  capturePayment,
  createNewOrder,
  getAllOrdersByUserId,
} from "./orderThunks";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    RefundBalance: 0,
    approvalURL: null,
    orderLoading: false,
    orderID: null,
    orderList: [],
    orderDetails: null,
    isOrderOpen: false,
    isCancelOpen: false,
    isTrackOpen: false,
  },
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
    toggleOrder: (state) => {
      state.isOrderOpen = !state.isOrderOpen;
    },
    setOrderDetails: (state, action) => {
      state.orderDetails = action.payload;
    },
    toggleCancel: (state) => {
      state.isCancelOpen = !state.isCancelOpen;
    },
    toggleTrack: (state) => {
      state.isTrackOpen = !state.isTrackOpen;
    },
  },
  extraReducers: (builder) => {
    const setLoading = (state) => {
      state.orderLoading = true;
    };

    const setError = (state) => {
      state.orderLoading = false;
      state.cartItems = [];
    };

    const setOrder = (state, action) => {
      state.orderLoading = false;
      state.orderList = action.payload?.transactions || [];
      state.RefundBalance = action.payload?.RefundBalance;
    };

    builder
      .addCase(createNewOrder.pending, setLoading)
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.orderID = action.payload.orderID;
      })
      .addCase(createNewOrder.rejected, setError)
      .addCase(capturePayment.pending, setLoading)
      .addCase(capturePayment.fulfilled, setOrder)
      .addCase(capturePayment.rejected, setError)
      .addCase(getAllOrdersByUserId.pending, setLoading)
      .addCase(getAllOrdersByUserId.fulfilled, setOrder)
      .addCase(getAllOrdersByUserId.rejected, setError)
      .addCase(cancelOrder.pending, setLoading)
      .addCase(cancelOrder.fulfilled, setOrder)
      .addCase(cancelOrder.rejected, setError);
  },
});

export const {
  resetOrderDetails,
  toggleOrder,
  setOrderDetails,
  toggleCancel,
  toggleTrack,
} = orderSlice.actions;
export default orderSlice.reducer;
