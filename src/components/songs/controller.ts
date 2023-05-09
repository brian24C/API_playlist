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
