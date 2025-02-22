import { addDoc, collection, Timestamp } from "firebase/firestore";
import db from "../database/firebase.js";

async function CreateAddressModel(addressData) {
  const AdrressCollRef = collection(db, "address");

  const docRef = await addDoc(AdrressCollRef, {
    ...addressData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });

  return docRef.id;
}

export async function CreateAddressCart(addressData) {
  const AdrressCollRef = collection(db, "addressCart");

  const docRef = await addDoc(AdrressCollRef, {
    ...addressData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });

  return docRef.id;
}

export default CreateAddressModel;
