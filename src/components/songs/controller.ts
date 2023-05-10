import type { Request, Response } from "express";
import { supabase } from "../../services/supabase";
import { success, failure } from "../../responses";

export const findAllSongs = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const Songs = await supabase.from("Songs").select("*");

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
    const Song = await supabase.from("Songs").select("*").eq("id", id);

    if (Song && Song.data && Song.data.length === 0) {
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

    const { data } = await supabase
      .from("Songs")
      .update({ ...body })
      .match({ id })
      .select();

    if (data?.length === 0) {
      return failure({ res, message: "Song not exist" });
    }
    return success({ res, message: "Song updated successfully", data });
  } catch (error) {
    return failure({ res, message: error });
  }
};

export const addSongs = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const addSong = await supabase.from("songs").insert(body).select();
    console.log(addSong);
    return success({
      res,
      message: "Song added succesfully",
      data: addSong.data,
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
    const { id } = req.params;
    const deleteSong = await supabase.from("Songs").delete().match({ id: id });
    return success({
      res,
      message: "Song deleted succesfully",
      data: deleteSong.data,
    });
  } catch (error) {
    return failure({
      res,
      message: error,
    });
  }
};
