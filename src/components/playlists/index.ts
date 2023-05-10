import { Router } from "express";
import * as Controller from "./controller";

const playlistRouter: Router = Router();

playlistRouter.get("/", Controller.findPlaylist);
playlistRouter.post("/", Controller.createPlaylist);
playlistRouter.delete("/:id", Controller.deletePlaylist);
playlistRouter.put("/:id", Controller.updatePlaylisst);

playlistRouter.get("/SongsOnPlaylist", Controller.seeSongsOnPlaylist);
playlistRouter.post("/SongsOnPlaylist", Controller.addSongsOnPlaylist);
playlistRouter.delete("/SongsOnPlaylist", Controller.deleteSongFromPlaylist);

export default playlistRouter;
