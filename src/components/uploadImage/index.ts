import { Router } from "express";
import * as controller from "./controller";

const imageRouter: Router = Router();
imageRouter.post("/upload", controller.uploadImage);
imageRouter.get("/load", controller.getImage);
imageRouter.delete("/:publicId", controller.deleteImage);

export default imageRouter;
