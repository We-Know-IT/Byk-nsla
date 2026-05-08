import type { Request, Response } from "express";

export type ApiSuccess<T> = {
  success: true;
  data: T;
  meta?: Record<string, unknown>;
};

export type ApiError = {
  success: false;
  error: {
    message: string;
  };
};

export const sendSuccess = <T>(
  res: Response,
  data: T,
  meta?: Record<string, unknown>,
) => {
  const body: ApiSuccess<T> = { success: true, data, meta };
  return res.status(200).json(body);
};

export const sendError = (res: Response, message: string, status = 500) => {
  const body: ApiError = { success: false, error: { message } };
  return res.status(status).json(body);
};

export const notFoundHandler = (req: Request, res: Response) => {
  return sendError(res, `Route not found: ${req.method} ${req.path}`, 404);
};
