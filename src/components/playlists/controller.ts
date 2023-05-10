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

export const createPlaylist = async (req: Request, res: Response) => {
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
