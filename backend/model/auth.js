import { collection, addDoc, Timestamp } from "firebase/firestore";
import db from "../database/firebase.js";

async function createUser(userData) {
  const UsersCollectionRef = collection(db, "users");

  const docRef = await addDoc(UsersCollectionRef, {
    userID: null,
    role: "user",
    email: userData.email,
    password: userData.password,
    username: userData.username,
    lastLogin: userData.lastLogin || Timestamp.now(),
    isVerified: userData.isVerified || false,
    resetPasswordToken: userData.resetPasswordToken || "",
    resetPasswordExpiresAt: userData.resetPasswordExpiresAt || null,
    verificationToken: userData.verificationToken || "",
    verificationTokenExpiresAt: userData.verificationTokenExpiresAt || null,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });

  return docRef.id;
}

export async function Transaction(payment) {
  const TransactionColRef = collection(db, "transactions");

  const docRef = await addDoc(TransactionColRef, {
    ...payment,
    createdAt: Timestamp.now(),
  });

  return docRef.id;
}

export default createUser;
