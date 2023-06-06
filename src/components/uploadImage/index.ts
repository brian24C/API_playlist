import { Router } from "express";
import { uploadImage } from "./controller";

const imageRouter: Router = Router();
imageRouter.post("/", uploadImage);

export default imageRouter;
