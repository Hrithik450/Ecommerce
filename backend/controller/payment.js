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
import ErrorHandler from "../utils/errorhandler.js";
import { Transaction } from "../model/auth.js";

const TransactionsRef = collection(db, "transactions");

export const Payment = async (req, res, next) => {
  const payment = req.body;
  const { email, paymentid } = payment;

  try {
    const PaymentDocRefExists = await getDocs(
      query(TransactionsRef, where("email", "==", email))
    );

    if (!PaymentDocRefExists.empty) {
      if (!paymentid) {
        return next(new ErrorHandler("Transaction failed", 400));
      }

      const user = PaymentDocRefExists.docs[0].data();
      const Doc = doc(db, "transactions", user.userID);
      await updateDoc(Doc, {
        ...payment,
      });

      return res.status(200).json({
        success: true,
        message: "Updated Successfully",
      });
    }

    const UserID = await Transaction(payment);
    const PaymentDocRef = doc(db, "transactions", UserID);
    const PaymentSnapShot = await getDoc(PaymentDocRef);
    await updateDoc(PaymentDocRef, {
      ...payment,
      userID: UserID,
    });

    return res.status(201).json({
      success: "true",
      data: PaymentSnapShot.data(),
    });
  } catch (error) {
    next(new ErrorHandler("Network Error", 500));
  }
};
