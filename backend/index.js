import path from "path";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import { facebookAuth, googleAuth } from "./controller/authcontroller.js";
import errorMiddleware from "./middleware/error.js";
import oauthRoutes from "./routes/oauth.js";
import productRoutes from "./routes/products.js";
import passport from "passport";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/orders.js";
import addressRoutes from "./routes/address.js";
import webhookRoutes from "./routes/webhook.js";
import simpleGit from "simple-git";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "config/config.env") });

const app = express();
const git = simpleGit();
const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(
  cors({
    origin: `${process.env.FRONTEND_URL}`,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/docs", express.static(path.resolve(__dirname, "public/docs")));
googleAuth();
facebookAuth();
app.use(passport.initialize());

app.use("/webhook", webhookRoutes);
app.use("/api/v1/oauth", oauthRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/address", addressRoutes);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server Started at port ${PORT}`);
});
