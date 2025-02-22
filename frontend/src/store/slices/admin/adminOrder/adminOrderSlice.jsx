import { createSlice } from "@reduxjs/toolkit";
import {
  adminCancelOrder,
  fetchAllTrans,
  updateOrderstatus,
} from "./adminOrderThunks";

export const adminOrderSlice = createSlice({
  name: "adminOrder",
  initialState: {
    adminOrderLoading: false,
    OrderPanel: false,
    CancelPanel: false,
    orderDetail: null,
    FilterPanel: false,
    TrackPanel: false,
    AdminOrderLists: [],
  },
  reducers: {
    toggleOrderPanel: (state) => {
      state.OrderPanel = !state.OrderPanel;
    },
    toggleCancelPanel: (state) => {
      state.CancelPanel = !state.CancelPanel;
    },
    toggleFilterPanel: (state) => {
      state.FilterPanel = !state.FilterPanel;
    },
    toggleTrackPanel: (state) => {
      state.TrackPanel = !state.TrackPanel;
    },
    setAdminOrders: (state, action) => {
      state.orderDetail = action.payload;
    },
  },

  extraReducers: (builder) => {
    const setLoading = (state) => {
      state.adminOrderLoading = true;
    };

    const setError = (state) => {
      state.adminOrderLoading = false;
    };

    const setOrder = (state, action) => {
      state.adminOrderLoading = false;
      state.orderDetail = action.payload?.orderDetail;
      state.AdminOrderLists = action.payload?.transactions;
    };

    builder
      .addCase(fetchAllTrans.pending, setLoading)
      .addCase(fetchAllTrans.fulfilled, setOrder)
      .addCase(fetchAllTrans.rejected, setError)
      .addCase(updateOrderstatus.pending, setLoading)
      .addCase(updateOrderstatus.fulfilled, setOrder)
      .addCase(updateOrderstatus.rejected, setError)
      .addCase(adminCancelOrder.pending, setLoading)
      .addCase(adminCancelOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetail = action.payload?.orderDetail || null;
        state.AdminOrderLists = action.payload?.Admintransactions;
      })
      .addCase(adminCancelOrder.rejected, setError);
  },
});

export const {
  toggleOrderPanel,
  toggleCancelPanel,
  setAdminOrders,
  toggleFilterPanel,
  toggleTrackPanel,
} = adminOrderSlice.actions;
export default adminOrderSlice.reducer;
