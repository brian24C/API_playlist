import type { Application, Router } from "express";
import * as ROUTES from "../components";

const _routes: [string, Router][] = [
  ["song", ROUTES.SongRouter],
  ["playlist", ROUTES.playlistRouter],
  ["upload", ROUTES.imageRouter],
];

const routes = (app: Application): void => {
  _routes.forEach(([path, controller]) => {
    app.use(`/api/v1/${path}`, controller);
  });
};

export default routes;
