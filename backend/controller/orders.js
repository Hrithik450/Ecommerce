import Razorpay from "razorpay";
import ejs from "ejs";
import db from "../database/firebase.js";
import axios from "axios";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import createOrder from "../model/orders.js";
import { DateTime } from "luxon";
import path from "path";

const OrderCollectionRef = collection(db, "orders");
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

const usersRef = collection(db, "users");

function getLiveTime(inputDate) {
  return inputDate.toFormat("yyyy-MM-dd HH:mm:ss");
}

function formatIndianTime(inputDate) {
  return inputDate.toFormat("hh:mm a");
}

function formatIndianDate(inputDate) {
  return inputDate.toFormat("dd LLL yyyy");
}

function formatTime12Hour(dateTimeString) {
  const date = new Date(dateTimeString);

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  const timeString = `${hours}:${formattedMinutes} ${ampm}`;

  return timeString;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-GB", options).replace(",", "");
}

async function fetchUserDetails(userID) {
  const userQuery = query(usersRef, where("userID", "==", userID));
  const userSnapshot = await getDocs(userQuery);
  if (userSnapshot.empty) {
    return {
      success: false,
      message: "User not found!",
    };
  }
  return userSnapshot.docs[0].data();
}

export const createNewOrder = async (req, res, next) => {
  const { totalAmount } = req.body;

  try {
    if (!totalAmount || totalAmount < 100) {
      return res
        .status(400)
        .json({ success: false, message: "Amount Should be Min Rs. 100/-" });
    }

    const options = {
      amount: totalAmount * 100,
      currency: "INR",
    };

    const order = await instance.orders.create(options);

    return res.status(200).json({
      success: true,
      orderID: order.id,
      amount: order.amount,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error, try again later!" });
  }
};

export const capturePayment = async (req, res, next) => {
  const { orderData, orderID, paymentID, RemainingFunds, paymentMethod } =
    req.body;
  const user = req.user;

  try {
    if (!user || !user.userID) {
      return res
        .status(401)
        .json({ success: false, message: "Please login, to complete order!" });
    }

    if (!orderID) {
      return res
        .status(500)
        .json({ success: false, message: "Server error, try again later!" });
    }

    const userID = user.userID;
    const UserDocRef = doc(db, "users", userID);
    const UserSnapShot = await getDoc(UserDocRef);

    if (!UserSnapShot.exists()) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    const User = UserSnapShot.data();

    let Payment = null;
    if (paymentMethod !== "COD") {
      if (!orderID || !paymentID) {
        return res
          .status(500)
          .json({ success: false, message: "Server error, try again later!" });
      }

      Payment = await instance.payments.fetch(paymentID);
      if (Payment.status !== "captured") {
        return res
          .status(400)
          .json({ success: false, message: "Payment Failed!" });
      }
    }

    const orderUpdatedData = {
      ...orderData,
      orderID: orderID,
      paymentStatus: paymentMethod === "COD" ? "Pending" : "Paid",
      orderStatus: "Confirmed",
      TrackStatus: [
        {
          title: "Order Confirmed",
          time: formatIndianTime(DateTime.now().setZone("Asia/Kolkata")),
          date: formatIndianDate(DateTime.now().setZone("Asia/Kolkata")),
          status: "done",
        },
        {
          title: "Order Dispatched",
          time: null,
          date: null,
          status: null,
        },
        {
          title: "Order Shipped",
          time: null,
          date: null,
          status: null,
        },
        {
          title: "Out For Delivery",
          time: null,
          date: null,
          status: null,
        },
        {
          title: "Order Delivered",
          time: null,
          date: formatIndianDate(
            DateTime.now().setZone("Asia/Kolkata").plus({ days: 5 })
          ),
          status: null,
        },
      ],
      paymentId: paymentMethod === "COD" ? null : paymentID,
      payerId: paymentMethod === "COD" ? null : Payment?.vpa,
      transactionID: paymentMethod === "COD" ? null : Payment?.acquirer_data,
      orderDate: formatIndianDate(DateTime.now().setZone("Asia/Kolkata")),
      deliveryDate: formatIndianDate(
        DateTime.now().setZone("Asia/Kolkata").plus({ days: 5 })
      ),
      createdAt: getLiveTime(DateTime.now().setZone("Asia/Kolkata")),
    };

    const Query = query(OrderCollectionRef, where("userID", "==", userID));
    const querySnapshot = await getDocs(Query);
    const RefundBalance = RemainingFunds;

    if (querySnapshot.empty) {
      const newOrderData = {
        userID: userID,
        orders: [orderUpdatedData],
        RefundBalance: 0,
      };

      const OrderCartID = await createOrder(newOrderData);
      const OrderRef = doc(OrderCollectionRef, OrderCartID);
      await updateDoc(OrderRef, {
        OrderCartID: OrderCartID,
      });
    } else {
      const existingData = querySnapshot.docs[0].data();
      if (!existingData.orders) {
        existingData.orders = [];
      }
      existingData?.orders?.push(orderUpdatedData);

      const OrderRef = doc(OrderCollectionRef, existingData.OrderCartID);
      await updateDoc(OrderRef, {
        ...existingData,
        RefundBalance,
        updatedAt: getLiveTime(DateTime.now().setZone("Asia/Kolkata")),
      });
    }

    const orderDetails = {
      orderNumber: orderID,
      customerName: User.username,
      orderDate: orderUpdatedData.orderDate,
      totalAmount: `₹${orderData.ToTalOrderAmout}`,
      totalPayableAmount: `₹${orderData.totalAmount}`,
      paymentMethod,
      shippingAddress: orderData.addressInfo.address || "Not Provided",
      shippingMethod: "Standard Shipping",
      estimatedDeliveryDate: orderUpdatedData.deliveryDate,
      items: orderData.cartItems?.map((item) => ({
        product: item.productName,
        quantity: item.quantity,
        price: `₹${item.salePrice}`,
      })),
    };

    const CLIENT_URL = process.env.FRONTEND_URL;
    const templatePath = path.resolve("views", "orderConf.ejs");
    const htmlcontent = await ejs.renderFile(templatePath, {
      orderDetails,
      CLIENT_URL,
    });

    res.status(200).json({
      success: true,
      message: "Order Placed Successfully, You Can View in Account Tab",
      RefundBalance,
    });

    return await axios.post(process.env.EMAIL_API_URL, {
      email: User.email,
      subject: `Order Confirmation - ${orderID}`,
      message: htmlcontent,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error, try again later!" });
  }
};

export const getOrders = async (req, res, next) => {
  const { userID } = req.params;

  try {
    if (!userID) {
      return res
        .status(400)
        .json({ success: false, message: "Login to check orders!" });
    }

    const Query = query(OrderCollectionRef, where("userID", "==", userID));
    const querySnapshot = await getDocs(Query);

    if (querySnapshot.empty) {
      return res.status(200).json({
        success: true,
        RefundBalance: 0,
        data: [],
      });
    }

    const OrdersData = querySnapshot.docs[0].data() || {};
    let allTransactions = [];

    for (const doc of querySnapshot.docs) {
      const data = doc.data();
      const orders = data.orders || [];
      const cancels = data.cancels || [];

      const user = await fetchUserDetails(data?.userID);

      const formattedOrders = orders.map((order) => ({
        ...order,
        type: "order",
        userID: user?.userID || "",
        username: user?.username || "",
      }));

      const formattedCancels = cancels.map((cancel) => ({
        ...cancel,
        type: "cancel",
        userID: user?.userID || "",
        username: user?.username || "",
      }));

      allTransactions.push(...formattedOrders, ...formattedCancels);
    }

    allTransactions.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return res.status(200).json({
      success: true,
      RefundBalance: OrdersData?.RefundBalance || 0,
      transactions: allTransactions,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error, try again later!" });
  }
};

export const fetchAllTransactions = async (req, res, next) => {
  const filters = req?.query ? req.query : req;

  const {
    date = [],
    Status = [],
    page = 1,
    Payment = [],
    search = null,
  } = filters;

  try {
    const ordersCollection = collection(db, "orders");
    const querySnapshot = await getDocs(ordersCollection);

    if (querySnapshot.empty) {
      const response = {
        success: false,
        message: "No transactions found",
        transactions: [],
        totalTransactions: 0,
      };
      return req?.query ? res.status(404).json(response) : response;
    }

    let allTransactions = [];
    for (const doc of querySnapshot.docs) {
      const data = doc.data();
      const orders = data.orders || [];
      const cancels = data.cancels || [];

      const user = await fetchUserDetails(data?.userID);

      const formattedOrders = orders.map((order) => ({
        ...order,
        type: "order",
        createdAt: order.createdAt,
        userID: user?.userID ? user?.userID : "",
        username: user?.username ? user?.username : "",
      }));

      const formattedCancels = cancels.map((cancel) => ({
        ...cancel,
        type: "cancel",
        createdAt: cancel.createdAt,
        userID: user?.userID ? user?.userID : "",
        username: user?.username ? user?.username : "",
      }));

      allTransactions.push(...formattedOrders, ...formattedCancels);
    }

    if (date && date.length > 0) {
      allTransactions = allTransactions.filter((transaction) => {
        const transactionDate = transaction.createdAt.split(" ")[0];
        return transactionDate === date;
      });
    }

    if (Status && Status.length > 0) {
      allTransactions = allTransactions.filter(
        (transaction) => transaction.orderStatus === Status
      );
    }

    if (Payment && Payment.length > 0) {
      allTransactions = allTransactions.filter(
        (transaction) => transaction.paymentMethod === Payment
      );
    }

    if (search) {
      const lowerKeyword = search.toLowerCase();
      allTransactions = allTransactions.filter((transxn) => {
        const orderID = transxn.orderID?.toLowerCase();

        return orderID.includes(lowerKeyword);
      });
    }

    allTransactions.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      if (a.status === "Confirmed" && b.status === "Confirmed") {
        return dateA - dateB;
      } else if (a.status === "Cancelled" && b.status === "Cancelled") {
        return dateB - dateA;
      } else if (a.status === "Delivered" && b.status === "Delivered") {
        return dateB - dateA;
      } else {
        return 0;
      }
    });

    const pageSize = 10;
    const startIndex = (Number(page) - 1) * pageSize;
    const paginatedTransactions = allTransactions.slice(
      startIndex,
      startIndex + pageSize
    );

    const response = {
      success: true,
      transactions: paginatedTransactions,
      totalTransactions: allTransactions.length,
    };

    return req?.query ? res.status(200).json(response) : response;
  } catch (error) {
    const response = {
      success: false,
      message: "Server error, try again later!",
      transactions: [],
      totalTransactions: 0,
    };

    return req?.query ? res.status(500).json(response) : response;
  }
};

export const updateOrderStatus = async (req, res, next) => {
  const {
    date = [],
    Status = [],
    page = 1,
    Payment = [],
    search = null,
  } = req.query;
  const { order, TrackStatus, deliveryDate } = req.body;

  try {
    if (!order?.userID || !order?.orderID) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide valid details (userID and orderID are required).",
      });
    }

    const orderCartQuery = query(
      OrderCollectionRef,
      where("userID", "==", order?.userID)
    );
    const orderCartSnap = await getDocs(orderCartQuery);

    if (orderCartSnap.empty) {
      return res.status(404).json({
        success: false,
        message: "Order cart not found",
      });
    }

    const existingData = orderCartSnap.docs[0].data();
    const orders = existingData?.orders;
    const orderIndex = orders.findIndex((o) => o.orderID === order.orderID);

    if (orderIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const Order = orders[orderIndex];
    if (TrackStatus) {
      orders[orderIndex].orderStatus =
        TrackStatus || orders[orderIndex].orderStatus;
    }

    const trackStatusArray = orders[orderIndex].TrackStatus || [
      {
        title: "Order Confirmed",
        time: formatIndianTime(DateTime.now().setZone("Asia/Kolkata")),
        date: formatIndianDate(DateTime.now().setZone("Asia/Kolkata")),
        status: "done",
      },
      {
        title: "Order Dispatched",
        time: null,
        date: null,
        status: null,
      },
      {
        title: "Order Shipped",
        time: null,
        date: null,
        status: null,
      },
      {
        title: "Out For Delivery",
        time: null,
        date: null,
        status: null,
      },
      {
        title: "Order Delivered",
        time: null,
        date: Order?.deliveryDate
          ? formatIndianDate(order?.deliveryDate)
          : null,
        status: null,
      },
    ];

    if (TrackStatus) {
      const statusMap = {
        Confirmed: "Order Confirmed",
        Dispatched: "Order Dispatched",
        Shipped: "Order Shipped",
        "Out For Delivery": "Out For Delivery",
        Delivered: "Order Delivered",
      };

      const statusTitle = statusMap[TrackStatus];
      if (statusTitle) {
        const statusIndex = trackStatusArray.findIndex(
          (ts) => ts.title === statusTitle
        );
        if (statusIndex !== -1) {
          trackStatusArray[statusIndex] = {
            ...trackStatusArray[statusIndex],
            time: formatIndianTime(DateTime.now().setZone("Asia/Kolkata")),
            date: formatIndianDate(DateTime.now().setZone("Asia/Kolkata")),
            status: "done",
          };
        }
      }
    }

    if (deliveryDate) {
      const deliveredIndex = trackStatusArray.findIndex(
        (ts) => ts.title === "Order Delivered"
      );
      if (deliveredIndex !== -1) {
        trackStatusArray[deliveredIndex].date = formatIndianDate(deliveryDate);
      }
    }

    orders[orderIndex].TrackStatus = trackStatusArray;
    orders[orderIndex].updatedAt = getLiveTime(
      DateTime.now().setZone("Asia/Kolkata")
    );

    const orderCartRef = doc(OrderCollectionRef, existingData?.OrderCartID);
    await updateDoc(orderCartRef, {
      orders: orders,
    });

    const updatedOrderCartSnap = await getDoc(orderCartRef);
    const updatedOrderCartData = updatedOrderCartSnap.data();
    const updatedOrderDetail = updatedOrderCartData.orders.find(
      (o) => o.orderID === order.orderID
    );

    const filters = { date, Status, page, Payment, search };
    const Trxns = await fetchAllTransactions(filters);

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      orderDetail: updatedOrderDetail,
      transactions: Trxns?.transactions,
      totalTransactions: Trxns?.totalTransactions,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Server error, try again later!" });
  }
};

export const cancelOrder = async (req, res, next) => {
  const {
    date = [],
    Status = [],
    page = 1,
    Payment = [],
    search = null,
  } = req.query;
  const { orderID } = req.params;
  const { reason, userID } = req.body;

  try {
    if (!userID) {
      return res
        .status(401)
        .json({ success: false, message: "Please login to cancel the order!" });
    }

    if (!orderID || !reason) {
      return res
        .status(400)
        .json({ success: false, message: "Provide all required details!" });
    }

    const UserDocRef = doc(db, "users", userID);
    const UserSnapShot = await getDoc(UserDocRef);

    if (!UserSnapShot.exists()) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    const User = UserSnapShot.data();
    const OrderQuery = query(OrderCollectionRef, where("userID", "==", userID));
    const orderSnapshot = await getDocs(OrderQuery);

    if (orderSnapshot.empty) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found!" });
    }

    const existingData = orderSnapshot.docs[0].data();
    const orderToCancel = existingData?.orders?.find(
      (order) => order.orderID === orderID
    );

    if (!orderToCancel) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found in your bucket!!" });
    }

    const prevTrackStatus = orderToCancel?.TrackStatus || [];
    const trackStatusArray = [
      prevTrackStatus.length > 0
        ? prevTrackStatus[0]
        : {
            title: "Order Confirmed",
            time: formatTime12Hour(orderToCancel.createdAt),
            date: formatDate(orderToCancel.createdAt),
            status: "done",
          },
      {
        title: "Order Cancelled",
        time: formatIndianTime(DateTime.now().setZone("Asia/Kolkata")),
        date: formatIndianDate(DateTime.now().setZone("Asia/Kolkata")),
        status: "done",
      },
    ];

    let RefundBalance = existingData?.RefundBalance || 0;
    RefundBalance += orderToCancel.ToTalOrderAmout;

    const updatedCancels = [
      ...(existingData?.cancels || []),
      {
        ...orderToCancel,
        reason: reason,
        createdAt: getLiveTime(DateTime.now().setZone("Asia/Kolkata")),
        orderStatus: "Cancelled",
        TrackStatus: trackStatusArray,
      },
    ];

    const updatedOrders = existingData?.orders?.filter(
      (order) => order.orderID !== orderID
    );

    const OrderRef = doc(OrderCollectionRef, existingData.OrderCartID);
    await updateDoc(OrderRef, {
      RefundBalance: RefundBalance,
      orders: updatedOrders,
      cancels: updatedCancels,
      updatedAt: getLiveTime(DateTime.now().setZone("Asia/Kolkata")),
    });

    const updatedData = await getDoc(OrderRef);
    const updatedTrans = [
      ...updatedData.data().orders,
      ...updatedData.data().cancels,
    ];

    const orderDetails = {
      customerName: User.username,
      orderNumber: orderID,
      orderDate: orderToCancel.orderDate,
      cancellationDate: formatIndianDate(
        DateTime.now().setZone("Asia/Kolkata")
      ),
      totalAmount: `₹${orderToCancel.ToTalOrderAmout}`,
      refundStatus: "Processed",
      shippingAddress: orderToCancel.addressInfo.address || "Not Provided",
      shippingMethod: "Standard Shipping",
      items: orderToCancel?.cartItems?.map((item) => ({
        product: item.productName,
        quantity: item.quantity,
        price: `₹${item.salePrice}`,
      })),
    };

    const CLIENT_URL = process.env.FRONTEND_URL;
    const templatePath = path.resolve("views", "orderCancel.ejs");
    const htmlcontent = await ejs.renderFile(templatePath, {
      orderDetails,
      CLIENT_URL,
    });

    const filters = { date, Status, page, Payment, search };
    const Trxns = await fetchAllTransactions(filters);

    res.status(200).json({
      success: true,
      RefundBalance: RefundBalance,
      message: "Order canceled successfully",
      transactions: updatedTrans,
      Admintransactions: Trxns?.data,
      totalTransactions: Trxns?.totalTransactions,
    });

    return await axios.post(process.env.EMAIL_API_URL, {
      email: User.email,
      subject: `Order Cancellation - ${orderID}`,
      message: htmlcontent,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error, try again later!!" });
  }
};
