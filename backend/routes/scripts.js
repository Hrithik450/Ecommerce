import express from "express";
import { getZipFile } from "../controller/scripts.js";

const router = express.Router();

router.get("/download-zip", getZipFile);

export default router;
