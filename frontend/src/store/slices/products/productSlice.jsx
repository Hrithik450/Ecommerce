import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCartProduct,
  getFilteredProducts,
  getHeroProducts,
  getProductById,
  getRandomProducts,
  getSectionProducts,
  updateProduct,
} from "./productThunks";

const getValue = (products) => {
  let total = products.reduce(
    (sum, product) => sum + (Number(product.price) || 0),
    0
  );

  if (total >= 1_000_000) {
    return (total / 1_000_000).toFixed(2).replace(/\.00$/, "") + "M";
  } else if (total >= 1_000) {
    return (total / 1_000).toFixed(2).replace(/\.00$/, "") + "k";
  } else {
    return total.toFixed(2).replace(/\.00$/, "");
  }
};

export const productSlice = createSlice({
  name: "product",
  initialState: {
    productLoading: false,
    productList: [],
    productDetails: null,
    cartProduct: null,
    productsCount: 0,
  },
  reducers: {
    fetchCartData: (state, action) => {
      state.cartProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    const setLoading = (state) => {
      state.productLoading = true;
    };

    const setError = (state) => {
      state.productLoading = false;
    };

    const setProduct = (state, action) => {
      state.productLoading = false;
      state.productList = action.payload?.products || [];
      state.productsCount = action.payload?.totalProducts || 0;
      const dataToStore = {
        totalProducts: action.payload?.totalProducts,
        totalValue: getValue(action.payload?.products),
      };
      sessionStorage.setItem("productData", JSON.stringify(dataToStore));
    };

    builder
      .addCase(getFilteredProducts.pending, setLoading)
      .addCase(getFilteredProducts.fulfilled, setProduct)
      .addCase(getFilteredProducts.rejected, setError)
      .addCase(getSectionProducts.pending, setLoading)
      .addCase(getSectionProducts.fulfilled, setError)
      .addCase(getSectionProducts.rejected, setError)
      .addCase(getHeroProducts.pending, setLoading)
      .addCase(getHeroProducts.fulfilled, setError)
      .addCase(getHeroProducts.rejected, setError)
      .addCase(getProductById.pending, setLoading)
      .addCase(getProductById.fulfilled, (state, action) => {
        state.productLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(getProductById.rejected, (state) => {
        state.productLoading = false;
        state.productDetails = null;
      })
      .addCase(getRandomProducts.pending, setLoading)
      .addCase(getRandomProducts.fulfilled, setError)
      .addCase(getRandomProducts.rejected, setError)
      .addCase(updateProduct.pending, setLoading)
      .addCase(updateProduct.fulfilled, setError)
      .addCase(updateProduct.rejected, setError)
      .addCase(fetchCartProduct.pending, setLoading)
      .addCase(fetchCartProduct.fulfilled, (state, action) => {
        state.productLoading = false;
        state.cartProduct = action.payload.product;
      })
      .addCase(fetchCartProduct.rejected, setError);
  },
});

export const { fetchCartData } = productSlice.actions;
export default productSlice.reducer;
