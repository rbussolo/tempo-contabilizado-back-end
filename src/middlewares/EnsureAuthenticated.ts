import { AppError } from './../errors/AppError';
import { NextFunction, Request, Response } from "express";
import { Auth } from "../modules/auth/Auth";

export async function ensuredAuthenticad(request: Request, response: Response, next: NextFunction){
  const authHeader = request.headers.authorization;
  
  if (!authHeader) {
    return response.status(401).json({ message: "Token missing" });
  }

  const [, token] = authHeader.split(" ");

  const result = Auth.validAccessToken(token);
  
  if (result instanceof AppError) {
    return response.status(result.statusCode).json({ code: result.code, message: result.message });
  }

  request.user = {
    id: result.user.id,
    name: result.user.name,
    email: result.user.email,
    type: result.user.type
  }

  next();
}
