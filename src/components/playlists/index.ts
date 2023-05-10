import { Router } from "express";
import * as Controller from "./controller";

const playlistRouter: Router = Router();

playlistRouter.get("/", Controller.findPlaylist);
playlistRouter.get("/:id", Controller.findOnePlaylist);
playlistRouter.post("/", Controller.createPlaylist);
playlistRouter.delete("/:id", Controller.deletePlaylist);
playlistRouter.put("/:id", Controller.updatePlaylisst);

playlistRouter.get("/SongsOnPlaylist", Controller.seeSongsOnPlaylist);
playlistRouter.post("/SongsOnPlaylist", Controller.addSongsOnPlaylist);
playlistRouter.delete(
  "/SongsOnPlaylist/:id_playlist/song/:id_song",
  Controller.deleteSongFromPlaylist
);

export default playlistRouter;
