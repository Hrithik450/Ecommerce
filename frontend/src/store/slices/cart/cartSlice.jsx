import { createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteCartItem,
  fetchCartItems,
  updateQty,
} from "./cartThunks";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    cartLoading: false,
    cartID: null,
    isCartOpen: false,
  },
  reducers: {
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
  extraReducers: (builder) => {
    const setLoading = (state) => {
      state.cartLoading = true;
    };

    const setError = (state) => {
      state.cartLoading = false;
      state.cartItems = [];
    };

    const setCart = (state, action) => {
      state.cartLoading = false;
      state.cartItems = action.payload.data;
      state.cartID = action.payload.cartID;
    };

    builder
      .addCase(addToCart.pending, setLoading)
      .addCase(addToCart.fulfilled, setCart)
      .addCase(addToCart.rejected, setError)
      .addCase(fetchCartItems.pending, setLoading)
      .addCase(fetchCartItems.fulfilled, setCart)
      .addCase(fetchCartItems.rejected, setError)
      .addCase(deleteCartItem.pending, setLoading)
      .addCase(deleteCartItem.fulfilled, setCart)
      .addCase(deleteCartItem.rejected, setError)
      .addCase(updateQty.pending, setLoading)
      .addCase(updateQty.fulfilled, setCart)
      .addCase(updateQty.rejected, setError);
  },
});

export const { toggleCart } = cartSlice.actions;
export default cartSlice.reducer;
