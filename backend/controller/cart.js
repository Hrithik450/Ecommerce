import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import db from "../database/firebase.js";
import createCart from "../model/cart.js";

const CartCollectionRef = collection(db, "cart");
const OrderCollectionRef = collection(db, "orders");
const ProductRef = collection(db, "products");

async function spreadProducts(items) {
  let cartItems = [];
  for (const item of items) {
    const productDoc = doc(ProductRef, item.productID);
    const productSnap = await getDoc(productDoc);

    if (productSnap.exists()) {
      const productData = productSnap.data();
      cartItems.push({
        ...item,
        ...Object.fromEntries(
          Object.entries(productData).filter(
            ([_, v]) => v !== null && v !== undefined
          )
        ),
      });
    }
  }
  return cartItems;
}

export const addToCart = async (req, res, next) => {
  const { userID, productID, cartData } = req.body;

  try {
    if (!userID || !cartData) {
      return res
        .status(400)
        .json({ success: false, message: "Provide All Details!" });
    }

    const productRef = doc(ProductRef, productID);
    const productSnapShot = await getDoc(productRef);

    if (!productSnapShot.exists()) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found!" });
    }

    const productData = productSnapShot.data();
    const isRestrictedProduct = productData.type.includes("Special");

    const cartQuery = query(CartCollectionRef, where("userID", "==", userID));
    const cartSnapshot = await getDocs(cartQuery);

    let prevCartData = cartSnapshot.empty ? null : cartSnapshot.docs[0].data();
    let cartID = cartSnapshot.empty ? null : cartSnapshot.docs[0].data().cartID;

    if (isRestrictedProduct) {
      const ordersQuery = query(
        OrderCollectionRef,
        where("userID", "==", userID)
      );

      let minCompletePurchase = 0;

      const ordersSnapshot = await getDocs(ordersQuery);

      let newProductIndex = null;
      if (!ordersSnapshot.empty) {
        const orderData = ordersSnapshot.docs.map((doc) => doc.data());

        const DeliveredOrders = orderData.flatMap(
          (order) =>
            order.orders?.filter((o) => o.orderStatus === "Delivered") || []
        );

        minCompletePurchase = DeliveredOrders.reduce(
          (total, order) => total + (order?.cartItems?.length || 0),
          0
        );

        const cartRef = doc(db, "cart", cartID);

        const newProduct = await getDoc(cartRef);
        const newProductData = newProduct.data();

        newProductIndex = newProductData.items.find(
          (item) => item.productID === productID
        );
      }

      if (minCompletePurchase < 2) {
        return res.status(200).json({
          success: false,
          message:
            "To add this product, complete at least 2 successful purchases.",
          data: prevCartData?.items || [],
          cartID: prevCartData?.cartID || null,
          product: newProductIndex,
        });
      }
    }

    const cartItemData = {
      productName: productData.title,
      productID: productID,
      image: productData.image,
      description: productData.description,
      price: productData.price,
      salePrice: productData.salePrice,
      shippingFee: productData.shippingFee || 45,
      sizes: productData.sizes,
      colors: productData.colors,
      color: cartData.color || null,
      size: cartData.size || null,
      quantity: cartData.quantity,
    };

    let updatedData = null;
    if (!prevCartData) {
      const modelData = {
        userID: userID,
        items: [{ ...cartItemData }],
      };

      const cartID = await createCart(modelData);
      const cartRef = doc(db, "cart", cartID);

      await updateDoc(cartRef, {
        cartID: cartID,
      });
      updatedData = await getDoc(cartRef);
    } else {
      const existingItemIndex = prevCartData.items.findIndex(
        (item) => item.productID === productID
      );

      if (existingItemIndex !== -1) {
        prevCartData.items[existingItemIndex] = {
          ...cartItemData,
          quantity:
            prevCartData.items[existingItemIndex].quantity + cartData.quantity,
          color: cartData.color || prevCartData.items[existingItemIndex].color,
          size: cartData.size || prevCartData.items[existingItemIndex].size,
        };
      } else {
        prevCartData.items.push(cartItemData);
      }

      const cartRef = doc(CartCollectionRef, cartID);
      await updateDoc(cartRef, { items: prevCartData.items });
      updatedData = await getDoc(cartRef);
    }

    const cartRef = doc(db, "cart", updatedData.data().cartID);

    const newProduct = await getDoc(cartRef);
    const newProductData = newProduct.data();

    const newProductIndex = newProductData.items.find(
      (item) => item.productID === productID
    );

    let cartItems = await spreadProducts(updatedData.data().items);

    return res.status(200).json({
      success: true,
      data: cartItems,
      product: newProductIndex,
      message: "Product Added Successfully",
      cartID: updatedData.data().cartID,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error, try again later!" });
  }
};

export const fetchCart = async (req, res, next) => {
  const { userID } = req.params;

  try {
    if (!userID) {
      return res
        .status(400)
        .json({ success: false, message: "Provide Valid Details!" });
    }

    const Query = query(CartCollectionRef, where("userID", "==", userID));
    const querySnapshot = await getDocs(Query);

    if (querySnapshot.empty) {
      return res.status(200).json({
        success: true,
        message: "Empty Cart!!",
        cartID: null,
        data: [],
      });
    }

    const cartData = querySnapshot.docs[0].data();
    const cartRef = querySnapshot.docs[0].ref;

    const updatedItems = [];
    let isCartUpdated = false;

    for (const item of cartData.items) {
      const productDoc = doc(ProductRef, item.productID);
      const productSnap = await getDoc(productDoc);

      if (productSnap.exists()) {
        const productData = productSnap.data();
        updatedItems.push({
          ...item,
          ...Object.fromEntries(
            Object.entries(productData).filter(
              ([_, v]) => v !== null && v !== undefined
            )
          ),
        });
      } else {
        isCartUpdated = true;
      }
    }

    if (isCartUpdated) {
      await updateDoc(cartRef, {
        items: updatedItems,
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedItems,
      cartID: cartData.cartID,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error, try again later!!" });
  }
};

export const updateCart = async (req, res, next) => {
  const { userID, productID, UpdatedCartData } = req.body;

  try {
    if (!userID || !productID) {
      return res
        .status(400)
        .json({ success: false, message: "Provide Valid Details!" });
    }

    const cartQuery = query(CartCollectionRef, where("userID", "==", userID));
    const querySnapshot = await getDocs(cartQuery);

    if (querySnapshot.empty) {
      return res
        .status(404)
        .json({ success: false, message: "Cart Not Found!!" });
    }

    const cartData = querySnapshot.docs[0].data();
    const findProductIndex = cartData.items.findIndex(
      (item) => item.productID === productID
    );

    if (findProductIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found in Cart!!!" });
    }

    const productDoc = doc(db, "products", productID);
    const productSnap = await getDoc(productDoc);

    if (!productSnap.exists()) {
      return res
        .status(404)
        .json({ success: false, message: "Product Does Not Exist!!" });
    }

    const latestProductData = productSnap.data();

    cartData.items[findProductIndex] = {
      ...cartData.items[findProductIndex],
      ...Object.fromEntries(
        Object.entries(latestProductData).filter(
          ([_, v]) => v !== null && v !== undefined
        )
      ),
      ...UpdatedCartData,
    };

    const cartRef = doc(db, "cart", cartData.cartID);
    await updateDoc(cartRef, { items: cartData.items });

    const newProduct = await getDoc(cartRef);
    const newProductData = newProduct.data();

    const newProductIndex = newProductData.items.find(
      (item) => item.productID === productID
    );

    const updatedData = await getDoc(cartRef);
    const cartItems = await spreadProducts(updatedData.data().items);

    return res.status(200).json({
      success: true,
      data: cartItems,
      product: newProductIndex,
      cartID: updatedData.data().cartID,
      message: "Product Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Server error, try again later!!" });
  }
};

export const deleteItem = async (req, res, next) => {
  const { userID, productID } = req.params;

  try {
    if (!userID || !productID) {
      return res
        .status(400)
        .json({ success: false, message: "Provide Valid Details!" });
    }

    const Query = query(CartCollectionRef, where("userID", "==", userID));
    const querySnapshot = await getDocs(Query);

    if (querySnapshot.empty) {
      return res
        .status(404)
        .json({ success: false, message: "Cart Not Found!!" });
    }

    const cartDoc = querySnapshot.docs[0];
    const cartData = cartDoc.data();

    const productIndex = cartData.items.find(
      (item) => item.productID === productID
    );

    productIndex.quantity = 0;
    productIndex.color = null;
    productIndex.size = null;

    if (productIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Product is not present in cart!!" });
    }

    const newCartData = cartData.items.filter(
      (item) => item.productID !== productID
    );

    const cartRef = doc(db, "cart", cartData.cartID);
    await updateDoc(cartRef, { items: newCartData });

    const updatedData = await getDoc(cartRef);
    const cartItems = await spreadProducts(updatedData.data().items);

    return res.status(200).json({
      success: true,
      data: cartItems,
      product: productIndex,
      cartID: updatedData.data().cartID,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error, try again later!!" });
  }
};

export const fetchUserCart = async (req, res, next) => {
  const { userID, productID } = req.params;

  try {
    const Query = query(CartCollectionRef, where("userID", "==", userID));
    const querySnapshot = await getDocs(Query);

    if (querySnapshot.empty) {
      return res
        .status(404)
        .json({ success: false, message: "Cart Not Found!!" });
    }

    const cartDoc = querySnapshot.docs[0];
    const cartData = cartDoc.data();

    const productIndex = cartData.items.find(
      (item) => item.productID === productID
    );

    return res.status(200).json({
      success: true,
      product: productIndex || null,
      message: "Product Fetched Successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Server error, try again later!!" });
  }
};
