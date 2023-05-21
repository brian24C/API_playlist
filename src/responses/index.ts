import type { Response } from "express";

interface IResponse {
  res: Response;
  status?: number;
  dataTotal?: any;
  message?: any;
}

export function success({
  res,
  status = 200,
  message,
  dataTotal,
}: IResponse): Response {
  return res.status(status).json({
    ok: true,
    message,
    dataTotal,
  });
}

export function failure({ res, status = 500, message }: IResponse): Response {
  return res.status(status).json({
    ok: false,
    message,
  });
}
