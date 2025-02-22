import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import db from "../database/firebase.js";
import createUser from "../model/auth.js";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  setDoc,
  Timestamp,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { generateTokenandSetcookie } from "../utils/generateToken.js";
import axios from "axios";
import path from "path";
import ejs from "ejs";

const usersRef = collection(db, "users");
const CartCollectionRef = collection(db, "cart");
const OrderCollectionRef = collection(db, "orders");

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!email || !username || !password)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });

    const userSnapshot = await getDocs(
      query(usersRef, where("email", "==", email))
    );

    if (!userSnapshot.empty)
      return res.status(400).json({
        success: false,
        message: "User already exists. Try logging in.",
      });

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = {
      username: username,
      email: email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 10 * 60 * 1000,
      isVerified: false,
      isAdmin: false,
    };

    const userID = await createUser(user);
    const userDocRef = doc(db, "users", userID);
    await updateDoc(userDocRef, {
      userID: userID,
    });

    const token = generateTokenandSetcookie(res, userID, username);

    const CLIENT_URL = process.env.FRONTEND_URL;
    const templatePath = path.resolve("views", "verifyEmail.ejs");
    const htmlcontent = await ejs.renderFile(templatePath, {
      verificationToken,
      CLIENT_URL,
    });

    await axios.post(process.env.EMAIL_API_URL, {
      email: email,
      subject: "Your Email Verification Code for Hruthik M",
      message: htmlcontent,
    });

    res.status(201).json({
      success: true,
      message: "Successfully Registered!",
      user: { ...user, password: null, token },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const verifyemail = async (req, res, next) => {
  const { code } = req.body;

  try {
    const UserId = req.user.userID;
    const UserDocRef = doc(db, "users", UserId);
    const UserSnapShot = await getDoc(UserDocRef);

    if (!UserSnapShot.exists()) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    const user = UserSnapShot.data();
    if (!user.verificationToken || user.verificationToken !== code) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid verification code." });
    }
    if (Date.now() > user.verificationTokenExpiresAt) {
      return res.status(400).json({
        success: false,
        message: "Verification code has expired. Please request a new one.",
      });
    }

    await updateDoc(UserDocRef, {
      isVerified: true,
      verificationToken: null,
      verificationTokenExpiresAt: null,
      updatedAt: Timestamp.now(),
    });

    const updatedDoc = await getDoc(UserDocRef);
    const updatedData = updatedDoc.data();

    const CLIENT_URL = process.env.FRONTEND_URL;
    const templatePath = path.resolve("views", "welcome.ejs");
    const htmlcontent = await ejs.renderFile(templatePath, { CLIENT_URL });

    await axios.post(process.env.EMAIL_API_URL, {
      email: user.email,
      subject: "WELCOME TO ANOX!",
      message: htmlcontent,
    });

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...updatedData,
        password: null,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const resendEmail = async (req, res, next) => {
  try {
    const UserID = req.user.userID;
    const UserDocRef = doc(db, "users", UserID);
    const UserSnapShot = await getDoc(UserDocRef);

    if (!UserSnapShot.exists()) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    const user = UserSnapShot.data();

    if (user.isVerified) {
      return res
        .status(400)
        .json({ success: false, message: "User is already verified." });
    }

    const newVerificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    await updateDoc(UserDocRef, {
      verificationToken: newVerificationToken,
      verificationTokenExpiresAt: Date.now() + 10 * 60 * 1000,
    });

    const CLIENT_URL = process.env.FRONTEND_URL;
    const templatePath = path.resolve("views", "verifyEmail.ejs");
    const htmlcontent = await ejs.renderFile(templatePath, {
      verificationToken: newVerificationToken,
      CLIENT_URL,
    });

    await axios.post(process.env.EMAIL_API_URL, {
      email: user.email,
      subject: "Your Email Verification Code for ANOX",
      message: htmlcontent,
    });

    res.status(200).json({
      success: true,
      message: "Verification email has been sent successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required." });

    const userQuery = query(usersRef, where("email", "==", email));
    const userSnapshot = await getDocs(userQuery);

    if (userSnapshot.empty)
      return res.status(401).json({
        success: false,
        message: "Invalid credentials. Please try again.",
      });

    const user = userSnapshot.docs[0].data();

    if (!user.password) {
      return res.status(400).json({
        success: false,
        message:
          "Password not found. This account may be linked to Google or Facebook.",
      });
    }

    const isPasswordMatch = await bcryptjs.compare(password, user.password);
    if (!isPasswordMatch)
      return res.status(401).json({
        success: false,
        message: "Invalid credentials. Please try again.",
      });

    const token = generateTokenandSetcookie(res, user.userID, user.username);
    const UserDocRef = doc(db, "users", user.userID);
    await updateDoc(UserDocRef, {
      lastLogin: Timestamp.now(),
    });

    res.status(200).json({
      success: true,
      message: "Login successful!",
      user: {
        userID: user.userID,
        email: user.email,
        username: user.username,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const logout = async (req, res, next) => {
  res.clearCookie("ANOXID", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
  });
  res.status(200).json({
    success: true,
    message: "Successfully logged out!",
  });
};

export const forgetPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter your email." });
    }

    const Userquery = query(usersRef, where("email", "==", email));
    const UserSnapShot = await getDocs(Userquery);

    if (UserSnapShot.empty) {
      return res.status(404).json({
        success: false,
        message: "User not found! Please check your email and try again.",
      });
    }

    const user = UserSnapShot.docs[0].data();
    const userId = user.userID;

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenhash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const resetTokenExpiresAt = Date.now() + 15 * 60 * 1000;

    const UserDocRef = doc(db, "users", userId);
    await updateDoc(UserDocRef, {
      resetPasswordToken: resetTokenhash,
      resetPasswordExpiresAt: resetTokenExpiresAt,
    });

    const resetlink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const CLIENT_URL = process.env.FRONTEND_URL;
    const templatePath = path.resolve("views", "PassresetEmail.ejs");
    const htmlcontent = await ejs.renderFile(templatePath, {
      resetlink,
      CLIENT_URL,
    });

    await axios.post(process.env.EMAIL_API_URL, {
      email: email,
      subject: "Security Alert",
      message: htmlcontent,
    });

    res.status(200).json({
      success: true,
      message: "Password reset link has been sent to your email successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const resetPassword = async (req, res, next) => {
  const { resetToken } = req.params;
  const { NewPassword, ConfirmPassword } = req.body;

  try {
    if (!resetToken) {
      return res
        .status(400)
        .json({ success: false, message: "Reset link is invalid or expired." });
    }

    if (NewPassword !== ConfirmPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Passwords do not match." });
    }

    const resetTokenhash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const Query = query(
      usersRef,
      where("resetPasswordToken", "==", resetTokenhash),
      where("resetPasswordExpiresAt", ">", Date.now())
    );

    const userSnapshot = await getDocs(Query);
    if (userSnapshot.empty) {
      return res
        .status(404)
        .json({ success: false, message: "Reset link expired. Try again." });
    }

    const user = userSnapshot.docs[0].data();
    const userId = user.userID;

    const hashedPassword = await bcryptjs.hash(NewPassword, 10);

    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpiresAt: null,
      updatedAt: Timestamp.now(),
    });

    const resetlink = `${process.env.FRONTEND_URL}/forget-password`;

    const CLIENT_URL = process.env.FRONTEND_URL;
    const templatePath = path.resolve("views", "PassSuccessful.ejs");
    const htmlcontent = await ejs.renderFile(templatePath, {
      resetlink,
      CLIENT_URL,
    });

    await axios.post(process.env.EMAIL_API_URL, {
      email: user.email,
      subject: "Security Alert",
      message: htmlcontent,
    });

    res.status(200).json({
      success: true,
      message: "password reset successful, you can now login with new password",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const checkUserByEmail = async (email) => {
  try {
    const q = query(usersRef, where("email", "==", email));
    const emailSnapshot = await getDocs(q);

    if (!emailSnapshot.empty) {
      return emailSnapshot.docs[0].data();
    }
    return null;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const googleAuth = (req, res, next) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_URL}/api/v1/oauth/google/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const GoogleID = profile.id;

          const userDocRef = doc(usersRef, GoogleID);
          const userDoc = await getDoc(userDocRef);

          if (!userDoc.exists()) {
            const newUser = {
              userID: GoogleID,
              username: profile.displayName,
              email: profile.emails[0].value,
              image: profile.photos[0].value,
              createdAt: Timestamp.now(),
              lastLogin: Timestamp.now(),
              isVerified: true,
              isAdmin: false,
            };

            const userExists = await checkUserByEmail(newUser.email);
            if (userExists) {
              const existingUserDocRef = doc(db, "users", userExists.userID);
              await updateDoc(existingUserDocRef, {
                lastLogin: Timestamp.now(),
              });

              return done(null, { userID: userExists.userID });
            }

            await setDoc(userDocRef, newUser);

            const CLIENT_URL = process.env.FRONTEND_URL;
            const templatePath = path.resolve("views", "welcome.ejs");
            const htmlcontent = await ejs.renderFile(templatePath, {
              CLIENT_URL,
            });

            await axios.post(process.env.EMAIL_API_URL, {
              email: newUser.email,
              subject: "WELCOME TO ANOX!",
              message: htmlcontent,
            });

            return done(null, { userID: newUser.userID });
          } else {
            await updateDoc(userDocRef, {
              lastLogin: Timestamp.now(),
            });
            return done(null, { userID: GoogleID });
          }
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
};

export const facebookAuth = (req, res, next) => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_URL}/api/v1/oauth/facebook/callback`,
        profileFields: ["id", "emails", "name", "picture.type(large)"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const FacebookID = profile.id;

          const userDocRef = doc(usersRef, FacebookID);
          const UserDoc = await getDoc(userDocRef);

          if (!UserDoc.exists()) {
            const newUser = {
              userID: FacebookID,
              username: `${profile.name.givenName} ${profile.name.familyName}`,
              email: profile.emails ? profile.emails[0].value : null,
              image: profile.photos ? profile.photos[0].value : null,
              createdAt: Timestamp.now(),
              lastLogin: Timestamp.now(),
              isVerified: profile.emails ? true : false,
              isAdmin: false,
            };

            if (!newUser.email) {
              return done(
                new Error("Your Facebook account does not provide an email"),
                null
              );
            }

            const userExists = await checkUserByEmail(newUser.email);

            if (userExists) {
              const existingUserDocRef = doc(db, "users", userExists.userID);
              await updateDoc(existingUserDocRef, {
                lastLogin: Timestamp.now(),
              });

              return done(null, { userID: userExists.userID });
            }

            await setDoc(userDocRef, newUser);

            const CLIENT_URL = process.env.FRONTEND_URL;
            const templatePath = path.resolve("views", "welcome.ejs");
            const htmlcontent = await ejs.renderFile(templatePath, {
              CLIENT_URL,
            });

            await axios.post(process.env.EMAIL_API_URL, {
              email: newUser.email,
              subject: "WELCOME TO ANOX!",
              message: htmlcontent,
            });

            return done(null, { userID: newUser.userID });
          } else {
            await updateDoc(userDocRef, {
              lastLogin: Timestamp.now(),
            });

            return done(null, { userID: FacebookID });
          }
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );
};

export const setCookie = async (req, res, next) => {
  try {
    const { userID } = req.body;

    if (!userID) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required." });
    }

    const UserDocRef = doc(db, "users", userID);
    const userDoc = await getDoc(UserDocRef);

    if (!userDoc.exists()) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid User ID." });
    }
    const userData = userDoc.data();
    const token = generateTokenandSetcookie(res, userID, userData.username);

    return res.status(200).json({
      success: true,
      user: { ...userDoc.data(), token },
      message: "Login successful!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const Profile = async (req, res, next) => {
  try {
    const UserId = req.user.userID;

    if (!UserId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required." });
    }

    const UserDocRef = doc(db, "users", UserId);
    const UserSnapShot = await getDoc(UserDocRef);

    if (!UserSnapShot.exists()) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const user = UserSnapShot.data();
    return res.status(200).json({
      success: true,
      user: {
        ...user,
        password: null,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// Admin Control
export const getFilteredUsers = async (req, res, next) => {
  try {
    const {
      Admin = null,
      Verified = null,
      search = null,
      page = 1,
    } = req.query;

    let queryConstraints = [];
    const pageSize = 6;

    if (Admin) {
      const adminStatus = Admin.toLowerCase() === "true";
      queryConstraints.push(where("isAdmin", "==", adminStatus));
    }

    if (Verified) {
      const verifiedStatus = Verified.toLowerCase() === "true";
      queryConstraints.push(where("isVerified", "==", verifiedStatus));
    }

    queryConstraints.push(orderBy("createdAt", "desc"));

    const usersRef = collection(db, "users");
    const userQuery = query(usersRef, ...queryConstraints);
    const snapShot = await getDocs(userQuery);

    let users = [];
    snapShot.forEach((doc) => {
      users.push({ ...doc.data() });
    });

    if (search) {
      const lowerKeyword = search.toLowerCase();
      users = users.filter((user) => {
        const username = user.username?.toLowerCase() || "";
        const userID = user.userID?.toLowerCase() || "";
        return username.includes(lowerKeyword) || userID.includes(lowerKeyword);
      });
    }

    const length = users.length;
    const startIndex = (Number(page) - 1) * pageSize;
    users = users.slice(startIndex, startIndex + pageSize);

    return res.status(200).json({
      success: true,
      users: users.map((user) => ({
        userID: user.userID,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin || false,
        isVerified: user.isVerified || false,
        lastLogin: user.lastLogin || null,
        createdAt: user.createdAt || null,
        updatedAt: user.updatedAt || null,
      })),
      totalUsers: length,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserData = async (req, res, next) => {
  const { userID } = req.params;

  try {
    if (!userID) {
      return res
        .status(400)
        .json({ success: false, message: "Provide Valid Details!" });
    }

    const cartQuery = query(CartCollectionRef, where("userID", "==", userID));
    const cartQuerySnapshot = await getDocs(cartQuery);

    let cartItems = [];
    if (!cartQuerySnapshot.empty) {
      const cartDoc = cartQuerySnapshot.docs[0];
      cartItems = cartDoc.data().items;
    }

    const orderQuery = query(OrderCollectionRef, where("userID", "==", userID));
    const orderQuerySnapshot = await getDocs(orderQuery);

    let ordersData = { RefundBalance: 0, orders: [], cancels: [] };
    if (!orderQuerySnapshot.empty) {
      ordersData = orderQuerySnapshot.docs[0].data();
    }

    const orders = Array.isArray(ordersData.orders) ? ordersData.orders : [];
    const cancels = Array.isArray(ordersData.cancels) ? ordersData.cancels : [];

    const sortedData = [...orders, ...cancels].sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return timeB - timeA;
    });

    return res.status(200).json({
      success: true,
      data: {
        cartItems: cartItems,
        orders: sortedData,
        RefundBalance: ordersData?.RefundBalance,
      },
    });
  } catch (error) {
    next(error);
    // return res
    //   .status(500)
    //   .json({ success: false, message: "Server error, try again later!" });
  }
};

export const updateAdminRole = async (req, res, next) => {
  const { userID } = req.params;
  const { Admin } = req.body;

  try {
    if (!userID || typeof Admin !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "User ID and isAdmin flag are required.",
      });
    }

    const userDocRef = doc(db, "users", userID);
    const userSnapshot = await getDocs(
      query(usersRef, where("userID", "==", userID))
    );

    if (userSnapshot.empty) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    await updateDoc(userDocRef, {
      isAdmin: Admin,
    });

    const userQuery = query(usersRef, orderBy("createdAt", "desc"));
    const snapShot = await getDocs(userQuery);

    let users = [];
    snapShot.forEach((doc) => {
      users.push({ ...doc.data() });
    });

    res.status(200).json({
      success: true,
      message: "Admin role updated successfully.",
      users: users.map((user) => ({
        userID: user.userID,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin || false,
        isVerified: user.isVerified || false,
        lastLogin: user.lastLogin || null,
        createdAt: user.createdAt || null,
        updatedAt: user.updatedAt || null,
      })),
      totalUsers: users.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const deleteUser = async (req, res, next) => {
  const { userID } = req.params;

  try {
    if (!userID) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    const userDocRef = doc(db, "users", userID);
    const userSnapshot = await getDocs(
      query(usersRef, where("userID", "==", userID))
    );

    if (userSnapshot.empty) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    await deleteDoc(userDocRef);

    const userQuery = query(usersRef, orderBy("createdAt", "desc"));
    const snapShot = await getDocs(userQuery);

    let users = [];
    snapShot.forEach((doc) => {
      users.push({ ...doc.data() });
    });

    res.status(200).json({
      success: true,
      message: "User deleted successfully.",
      users: users.map((user) => ({
        userID: user.userID,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin || false,
        isVerified: user.isVerified || false,
        lastLogin: user.lastLogin || null,
        createdAt: user.createdAt || null,
        updatedAt: user.updatedAt || null,
      })),
      totalUsers: users.length,
    });
  } catch (error) {
    next(error);
    // res.status(500).json({
    //   success: false,
    //   message: "Server error. Please try again later.",
    // });
  }
};
