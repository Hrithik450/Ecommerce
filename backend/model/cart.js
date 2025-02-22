import { addDoc, collection, Timestamp } from "firebase/firestore";
import db from "../database/firebase.js";

async function createCart(modelData) {
  const CartCollectionRef = collection(db, "cart");

  const docRef = await addDoc(CartCollectionRef, {
    ...modelData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });

  return docRef.id;
}

export default createCart;
