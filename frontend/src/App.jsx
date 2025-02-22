import "./App.css";
import { useEffect } from "react";
import { AppRoutes } from "./routes";
import useUserID from "./hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "./store/slices/cart/cartThunks";
import { fetchAllAddresses } from "./store/slices/address/addressThunks";
import { getAllOrdersByUserId } from "./store/slices/order/orderThunks";
import Cart from "./pages/Cart/cart";
import OrderDetails from "./components/cart/orderDetail";
import CancelOrder from "./components/cart/orderCancel";
import TrackOrder from "./components/cart/orderTrack";

function App() {
  const dispatch = useDispatch();
  const { isCartOpen } = useSelector((state) => state.cart);
  const { isOrderOpen, isCancelOpen, isTrackOpen } = useSelector(
    (state) => state.order
  );
  const { productList } = useSelector((state) => state.product);

  const { userID } = useUserID();
  useEffect(() => {
    const fetchAddress = async () => {
      if (userID) {
        await dispatch(fetchAllAddresses({ userID })).unwrap();
      }
    };

    const fetchOrders = async () => {
      if (userID) {
        await dispatch(getAllOrdersByUserId({ userID })).unwrap();
      }
    };

    if (userID) {
      fetchAddress();
      fetchOrders();
    }
  }, [dispatch, userID]);

  useEffect(() => {
    const fetchItems = async () => {
      if (userID) {
        await dispatch(fetchCartItems({ userID })).unwrap();
      }
    };

    if (userID) {
      fetchItems();
    }
  }, [productList, dispatch, userID]);

  return (
    <>
      {isCartOpen && <Cart />}
      {isOrderOpen && <OrderDetails />}
      {isCancelOpen && <CancelOrder />}
      {isTrackOpen && <TrackOrder />}
      <AppRoutes />
    </>
  );
}

export default App;
