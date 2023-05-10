import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findplaylist = async (
  _req: Request,
  res: Response
): Promise<void> => {};
