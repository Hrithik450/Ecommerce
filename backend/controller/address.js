import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import db from "../database/firebase.js";
import CreateAddressModel, { CreateAddressCart } from "../model/address.js";
import ErrorHandler from "../utils/errorhandler.js";

const AddressCartCollRef = collection(db, "addressCart");

export const createAddress = async (req, res, next) => {
  const { userID, AddressData } = req.body;
  const { username, address, city, pincode, phone, email } = AddressData;

  try {
    if (!userID || !address || !city || !pincode || !phone || !email) {
      return res
        .status(400)
        .json({ success: false, message: "All details are required!" });
    }

    const newAddress = {
      username,
      address,
      city,
      pincode,
      phone,
      email,
    };

    const AddressID = await CreateAddressModel(newAddress);
    const AddressRef = doc(db, "address", AddressID);
    await updateDoc(AddressRef, {
      AddressID: AddressID,
    });
    const updatedNewData = await getDoc(AddressRef);

    const Query = query(AddressCartCollRef, where("userID", "==", userID));
    const querySnapshot = await getDocs(Query);

    if (querySnapshot.empty) {
      const newAddressCart = {
        userID: userID,
        Address: [updatedNewData.data()],
      };

      const AddressCartID = await CreateAddressCart(newAddressCart);
      const AddressCartRef = doc(AddressCartCollRef, AddressCartID);
      await updateDoc(AddressCartRef, {
        AddressCartID: AddressCartID,
      });

      const updatedAddressData = await getDoc(AddressCartRef);
      return res.status(201).json({
        success: true,
        data: updatedAddressData.data().Address,
        message: "Address Added Successfully",
      });
    } else {
      const existingCartData = querySnapshot.docs[0].data();
      existingCartData.Address.push(updatedNewData.data());
      const AddressCartRef = doc(
        db,
        "addressCart",
        existingCartData.AddressCartID
      );

      await updateDoc(AddressCartRef, existingCartData);

      const updatedCartData = await getDoc(AddressCartRef);
      return res.status(200).json({
        success: true,
        data: updatedCartData.data().Address,
        message: "Address Added Successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const fetchAllAddress = async (req, res, next) => {
  const { userID } = req.params;
  try {
    if (!userID) {
      return res
        .status(400)
        .json({ success: false, message: "Please Login to fetch addresses" });
    }

    const Query = query(AddressCartCollRef, where("userID", "==", userID));
    const querySnapshot = await getDocs(Query);

    if (querySnapshot.empty) {
      return res.status(200).json({
        success: true,
        message: "Empty Address Cart!!",
        data: [],
      });
    }

    const addressCartData = querySnapshot.docs[0].data() || {};

    return res.status(200).json({
      success: true,
      data: addressCartData?.Address || [],
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error, try again later!" });
  }
};

export const deleteAddress = async (req, res, next) => {
  const { userID, AddressID } = req.params;

  try {
    if (!userID || !AddressID) {
      return res
        .status(400)
        .json({ success: false, message: "Provide All Details!" });
    }

    const AddressRef = doc(db, "address", AddressID);
    const addressSnapshot = await getDoc(AddressRef);

    if (!addressSnapshot.exists()) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found!" });
    }

    await deleteDoc(AddressRef);

    const Query = query(AddressCartCollRef, where("userID", "==", userID));
    const querySnapshot = await getDocs(Query);

    if (querySnapshot.empty) {
      return res
        .status(404)
        .json({ success: false, message: "User's Address Cart Not Found!" });
    } else {
      const existingCartData = querySnapshot.docs[0].data();
      const AddressCartRef = doc(
        db,
        "addressCart",
        existingCartData.AddressCartID
      );

      const updatedAddresses = existingCartData.Address.filter(
        (addr) => addr.AddressID !== AddressID
      );

      await updateDoc(AddressCartRef, { Address: updatedAddresses });

      const updatedCartData = await getDoc(AddressCartRef);
      return res.status(200).json({
        success: true,
        message: "Address deleted successfully",
        data: updatedCartData.data().Address,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error, Try again later!" });
  }
};

export const editAddress = async (req, res, next) => {
  const { userID, AddressID, UpdatedAddress } = req.body;

  try {
    if (!userID || !AddressID) {
      return res
        .status(400)
        .json({ success: false, message: "Provide All Details!" });
    }

    const AddressRef = doc(db, "address", AddressID);
    const addressSnapshot = await getDoc(AddressRef);

    if (!addressSnapshot.exists()) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found!!" });
    }

    const ExistingAddress = addressSnapshot.data();
    await updateDoc(AddressRef, {
      ...ExistingAddress,
      ...UpdatedAddress,
    });
    const updatedAddress = await getDoc(AddressRef);

    const Query = query(AddressCartCollRef, where("userID", "==", userID));
    const querySnapshot = await getDocs(Query);

    if (querySnapshot.empty) {
      return res
        .status(404)
        .json({ success: false, message: "User's Address Cart Not Found!!" });
    }

    const existingCartData = querySnapshot.docs[0].data();
    const AddressCartRef = doc(
      db,
      "addressCart",
      existingCartData.AddressCartID
    );

    const updatedAddresses = existingCartData.Address.map((addr) =>
      addr.AddressID === AddressID ? updatedAddress.data() : addr
    );
    await updateDoc(AddressCartRef, { Address: updatedAddresses });
    const updatedCartData = await getDoc(AddressCartRef);

    return res.status(200).json({
      success: true,
      message: "Address Updated Successfully",
      data: updatedCartData.data().Address,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error, try again later!" });
  }
};
