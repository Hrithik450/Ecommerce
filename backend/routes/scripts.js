import express from "express";
import { bashScript } from "../controller/scripts.js";

const router = express.Router();

router.get("/mern-script", bashScript);

export default router;
