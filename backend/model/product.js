import { collection, addDoc, Timestamp } from "firebase/firestore";
import db from "../database/firebase.js";

async function createProductModel(product) {
  const ProductsCollectionRef = collection(db, "products");

  const docRef = await addDoc(ProductsCollectionRef, {
    productID: null,
    lastUpdated: Timestamp.now(),
    createdAt: Timestamp.now(),
    ...product,
  });

  return docRef.id;
}

export default createProductModel;
