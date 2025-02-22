import express from "express";
import passport from "passport";
import { setCookie } from "../controller/authcontroller.js";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
    session: false,
  }),
  (req, res) => {
    const user = req.user;
    res.redirect(`${process.env.FRONTEND_URL}/?tempToken=${user.userID}`);
  }
);

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
    session: false,
  }),
  (req, res) => {
    const user = req.user;
    res.redirect(`${process.env.FRONTEND_URL}/?tempToken=${user.userID}`);
  }
);

router.post("/set-cookie", setCookie);

export default router;
