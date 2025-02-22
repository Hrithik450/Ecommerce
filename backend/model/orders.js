import { addDoc, collection, Timestamp } from "firebase/firestore";
import db from "../database/firebase.js";

async function createOrder(orderData) {
  const OrderCollectionRef = collection(db, "orders");

  const docRef = await addDoc(OrderCollectionRef, {
    ...orderData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });

  return docRef.id;
}

export default createOrder;
