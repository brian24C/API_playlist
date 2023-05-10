import { Router } from "express";
import * as Controller from "./controller";

const playlistRouter: Router = Router();

playlistRouter.get("/", Controller.findPlaylist);

export default playlistRouter;
