import { Router } from "express";
import * as Controller from "./controller";

const songRouter: Router = Router();

songRouter.post("/", Controller.addSongs);
songRouter.get("/", Controller.findAllSongs);
songRouter.get("/:id", Controller.findOneSong);
songRouter.delete("/:id", Controller.deleteSongs);
songRouter.put("/:id", Controller.updateSong);

export default songRouter;
