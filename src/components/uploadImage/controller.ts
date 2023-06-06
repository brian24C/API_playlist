import type { Request, Response } from "express";
import { success, failure } from "../../responses";
import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";

export const uploadImage = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { src, height, width } = req.body;

    const folder = `/playlist-uploader`;
    const imageConfig = {
      width,
      height,
      folder,
      crop: "fit",
      quality: 80,
    };
    const uploadRes = await cloudinary.uploader.upload(src, imageConfig);

    return success({ res, dataTotal: uploadRes });
  } catch (error) {
    return failure({ res, message: error });
  }
};

export const getImage = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { resources } = await cloudinary.search
      .expression("folder:playlist-uploader")
      .sort_by("created_at", "desc")
      .max_results(1)
      .execute();

    return success({ res, dataTotal: resources });
  } catch (error) {
    return failure({ res, message: error });
  }
};
