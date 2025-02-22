import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import AdminRoute from "./adminRoute";
import { ToastContainer } from "react-toastify";
import NotFound from "../pages/NotFound/404Error";
import Home from "../pages/Home/home";
import TermsAndConditions from "../pages/Docs/TermsAndCond";
import PrivacyPolicy from "../pages/Docs/PrivacyPolicy";
import RefundPolicy from "../pages/Docs/RefundPolicy";
import ShippingPolicy from "../pages/Docs/ShippingPolicy";
import ContactUs from "../pages/Docs/ContactUs";
import About from "../pages/About/about";
import Account from "../pages/Account/account";
import ShoppingCheckout from "../pages/Checkout/checkout";
import AuthPage from "../pages/Auth/auth";
import ForgetPassword from "../pages/Auth/forgetPassword";
import ResetPassword from "../pages/Auth/resetPassword";
import Verifyemail from "../pages/Auth/verifyEmail";
import Products from "../pages/Product/product";
import ProductPage from "../pages/Product/productDetail";
import Template from "../components/templates/template";
import AdminPanel from "../pages/Admin/admin";
import AdminOrderPage from "../pages/Admin/adminOrder";
import AdminUsersPage from "../pages/Admin/adminUsers";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/account"
          element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <ShoppingCheckout />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        <Route
          path="/verify-email"
          element={
            <PrivateRoute>
              <Verifyemail />
            </PrivateRoute>
          }
        />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productID" element={<ProductPage />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/template" element={<Template />} />

        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <PrivateRoute>
              <AdminRoute>
                <AdminOrderPage />
              </AdminRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <PrivateRoute>
              <AdminRoute>
                <AdminUsersPage />
              </AdminRoute>
            </PrivateRoute>
          }
        />

        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default AppRoutes;
