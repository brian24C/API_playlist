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
