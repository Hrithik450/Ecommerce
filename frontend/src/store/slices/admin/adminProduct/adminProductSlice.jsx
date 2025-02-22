import { createSlice } from "@reduxjs/toolkit";
import { createProduct, deleteProduct } from "./adminProductThunks";

export const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState: {
    adminProductLoading: false,
    addProduct: false,
    editProduct: false,
    deleteProduct: false,
    productDetail: null,
  },
  reducers: {
    toggleAdd: (state) => {
      state.addProduct = !state.addProduct;
    },
    toggleEdit: (state) => {
      state.editProduct = !state.editProduct;
    },
    toggleDelete: (state) => {
      state.deleteProduct = !state.deleteProduct;
    },
    setProduct: (state, action) => {
      state.productDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    const setLoading = (state) => {
      state.adminProductLoading = true;
    };

    const setError = (state) => {
      state.adminProductLoading = false;
    };

    builder
      .addCase(createProduct.pending, setLoading)
      .addCase(createProduct.fulfilled, setError)
      .addCase(createProduct.rejected, setError)
      .addCase(deleteProduct.pending, setLoading)
      .addCase(deleteProduct.fulfilled, setError)
      .addCase(deleteProduct.rejected, setError);
  },
});

export const { toggleAdd, toggleEdit, setProduct, toggleDelete } =
  adminProductSlice.actions;
export default adminProductSlice.reducer;
