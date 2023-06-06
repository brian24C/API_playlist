import express, { type Application } from "express";
import { config } from "dotenv";
import cors from "cors";
import routes from "./routes";
import { v2 as cloudinary } from "cloudinary";

config();
const app: Application = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,PUT,POST,DELETE",
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

routes(app);

export default app;
