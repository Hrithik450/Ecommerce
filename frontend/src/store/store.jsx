import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import productReducer from "./slices/products/productSlice";
import orderReducer from "./slices/order/orderSlice";
import cartReducer from "./slices/cart/cartSlice";
import addressReducer from "./slices/address/addressSlice";
import adminAuthReducer from "./slices/admin/adminAuth/adminAuthSlice";
import adminOrderReducer from "./slices/admin/adminOrder/adminOrderSlice";
import adminProductReducer from "./slices/admin/adminProduct/adminProductSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    address: addressReducer,
    order: orderReducer,
    adminAuth: adminAuthReducer,
    adminOrder: adminOrderReducer,
    adminProduct: adminProductReducer,
  },
});

export default store;
