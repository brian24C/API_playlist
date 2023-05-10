import type { Request, Response } from "express";
import { supabase } from "../../services/supabase";
import { success, failure } from "../../responses";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const findAllSongs = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    //const Songs = await supabase.from("songs").select("*");
    const Songs = await prisma.song.findMany({});

    return success({ res, data: Songs });
  } catch (error) {
    return failure({ res, message: error });
  }
};

export const findOneSong = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id: number = parseInt(req.params.id);
    //const Song = await supabase.from("Songs").select("*").eq("id", id);
    const Song = await prisma.song.findFirst({ where: { id } });

    if (Song === null) {
      return failure({ res, message: "Song not found" });
    }

    return success({ res, message: "Song found", data: Song });
  } catch (error) {
    return failure({ res, message: error });
  }
};

export const updateSong = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = Number(req.params.id);
    const { body } = req;

    // const { data } = await supabase
    //   .from("Songs")
    //   .update({ ...body })
    //   .match({ id })
    //   .select();

    const data = await prisma.song.update({
      where: { id },
      data: body,
    });

    //No necessary because when data is not founded then the throw an error.
    // if (data === null) {
    //   return failure({ res, message: "Song not exist" });
    // }
    return success({ res, message: "Song updated successfully", data });
  } catch (error) {
    return failure({ res, message: error });
  }
};

export const addSongs = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    //const addSong = await supabase.from("songs").insert(body).select();
    const data = await prisma.song.create({
      data: body,
    });

    return success({
      status: 201,
      res,
      message: "Song added succesfully",
      data: data,
    });
  } catch (error) {
    return failure({
      res,
      message: error,
    });
  }
};

export const deleteSongs = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    //const deleteSong = await supabase.from("Songs").delete().match({ id: id });
    const deleteSong = await prisma.song.delete({
      where: {
        id,
      },
    });

    return success({
      res,
      message: "Song deleted succesfully",
      data: deleteSong,
    });
  } catch (error) {
    return failure({
      res,
      message: error,
    });
  }
};
