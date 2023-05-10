import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { success, failure } from "../../responses";

const prisma = new PrismaClient();

export const findPlaylist = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const playlists = await prisma.playlist.findMany({
      include: {
        songs: {
          select: {
            song: {
              select: {
                id: true,
                name: true,
                link: true,
                recommendedBy: true,
              },
            },
          },
        },
      },
    });

    return success({ res, data: playlists });
  } catch (error) {
    return failure({ res, message: error });
  }
};

export const findOnePlaylist = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id: number = parseInt(req.params.id);

    const Playlist = await prisma.playlist.findFirst({ where: { id } });

    if (Playlist === null) {
      return failure({ res, message: "Playlist not found" });
    }

    return success({ res, message: "Playlist found", data: Playlist });
  } catch (error) {
    return failure({ res, message: error });
  }
};

export const createPlaylist = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { body } = req;
    const playlist = await prisma.playlist.create({
      data: {
        ...body,
      },
    });
    return success({
      status: 201,
      res,
      data: playlist,
      message: "Playlist created successfully",
    });
  } catch (error) {
    return failure({ res, message: error });
  }
};

export const deletePlaylist = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = _req.params;

    const deletePlaylist = await prisma.playlist.delete({
      where: { id: Number(id) },
    });

    return success({
      res,
      message: `Playlist with id ${id} has been deleted.`,
      data: deletePlaylist,
    });
  } catch (error) {
    return failure({
      res,
      message: error,
    });
  }
};

export const updatePlaylisst = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = Number(req.params.id);
    const { body } = req;

    const data = await prisma.playlist.update({
      where: { id },
      data: body,
    });

    return success({ res, message: "Playlist updated successfully", data });
  } catch (error) {
    return failure({ res, message: error });
  }
};

//Table SongsOnPlaylist

export const seeSongsOnPlaylist = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  console.log("llego");
  try {
    console.log("llego");
    const songOnPlaylist = await prisma.songsOnPlaylist.findMany({});

    console.log(songOnPlaylist);
    return success({ res, data: songOnPlaylist });
  } catch (error) {
    return failure({ res, message: error });
  }
};

export const addSongsOnPlaylist = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const songOnPlaylist = await prisma.songsOnPlaylist.create({
      data: {
        ...body,
      },
    });

    return success({
      status: 201,
      res,
      message: "Playlist added succesfully to the playlist",
      data: songOnPlaylist,
    });
  } catch (error) {
    return failure({
      res,
      message: error,
    });
  }
};

export const deleteSongFromPlaylist = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id_song, id_playlist } = req.params;
    const deletedSongOnPlaylist = await prisma.songsOnPlaylist.deleteMany({
      where: { id_song: Number(id_song), id_playlist: Number(id_playlist) },
    });

    if (deletedSongOnPlaylist.count > 0) {
      return success({
        res,
        message: `Song with id ${id_song} has been deleted from playlist ${id_playlist}.`,
        data: deletedSongOnPlaylist,
      });
    } else {
      return res.status(404).json({
        ok: false,
        message: `Song with id ${id_song} on playlist ${id_playlist} not found.`,
      });
    }
  } catch (error) {
    return failure({
      res,
      message: error,
    });
  }
};
