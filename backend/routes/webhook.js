import express from "express";
import {callWebhook} from "../controller/webhook.js"

const router = express.Router();

router.post('/', callWebhook);

export default router;
